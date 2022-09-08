import React, { useEffect, useCallback, FC, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  formatDate,
  materialIsOverdue,
  getAuthorNames,
  getMaterialInfo
} from "../utils/helpers";
import { openModal } from "../../../core/modal.slice";
import { Cover } from "../../../components/cover/cover";
import StatusCircle from "./utils/status-circle";
import StatusBadge from "./utils/status-badge";
import { useText } from "../../../core/utils/text";
import { Pid } from "../../../core/utils/types/ids";
import {
  FetchMaterial,
  StackableMaterialProps,
  MaterialProps
} from "./utils/material-fetch-hoc";

const StackableMaterial: FC<StackableMaterialProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  material,
  selectDueDate,
  selectMaterial,
  loanMetaData,
  dueDateLabel
}) => {
  const t = useText();
  const dispatch = useDispatch();

  const {
    dueDate,
    loanDate,
    id,
    creators,
    year,
    materialType,
    materialTitle,
    description,
    pid
  } = getMaterialInfo(loanMetaData, material);

  const [additionalMaterials] = useState(
    amountOfMaterialsWithDueDate ? amountOfMaterialsWithDueDate - 1 : 0
  );

  function stopPropagationFunction(e: Event | MouseEvent) {
    e.stopPropagation();
  }
  useEffect(() => {
    document
      .querySelector(".list-reservation a")
      ?.addEventListener("click", stopPropagationFunction, true);

    return () => {
      document
        .querySelector(".list-reservation a")
        ?.removeEventListener("click", stopPropagationFunction, true);
    };
  }, []);

  const openDueDateModal = useCallback(
    (e: MouseEvent) => {
      stopPropagationFunction(e);
      if (selectDueDate && dueDate) {
        selectDueDate(id, dueDate);
        dispatch(openModal({ modalId: dueDate }));
      }
    },
    [dispatch, dueDate, id, selectDueDate]
  );

  const selectListMaterial = useCallback(
    (e: MouseEvent) => {
      stopPropagationFunction(e);
      if (selectMaterial) {
        selectMaterial({
          material,
          loanMetaData
        });
      }
      dispatch(openModal({ modalId: id }));
    },
    [dispatch, loanMetaData, material, id, selectMaterial]
  );

  return (
    <button
      type="button"
      onClick={(e) => selectListMaterial(e)}
      className={`list-reservation my-32 ${
        additionalMaterials > 0 ? "list-reservation--stacked" : ""
      }`}
    >
      <div className="list-reservation__material">
        <div>
          <Cover
            pid={pid as Pid}
            size="small"
            animate={false}
            description={description}
          />
        </div>
        <div className="list-reservation__information">
          <div>
            <div className="status-label status-label--outline">{materialType}</div>
          </div>
          <div className="list-reservation__about">
            <h3 className="text-header-h4">{materialTitle}</h3>
            <p className="text-small-caption color-secondary-gray">
              {creators &&
                getAuthorNames(
                  creators,
                  t("loanListMaterialByAuthorText"),
                  t("loanListMaterialAndAuthorText")
                )}
              {year?.year && <> ({year.year})</>}
            </p>
          </div>
          {additionalMaterials > 0 && (
            <>
              <div
                className="list-reservation__hidden-explanation"
                id="materials-modal-desktop-text"
              >
                {t("loanListMaterialsModalDesktopText")}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  openDueDateModal(e);
                }}
                aria-describedby="materials-modal-desktop-text"
                id="test-more-materials"
                className="list-reservation__note-desktop text-small-caption color-secondary-gray"
              >
                + {additionalMaterials} {t("LoanListMaterialsDesktopText")}
              </button>
            </>
          )}
          {dueDate && materialIsOverdue(dueDate) && (
            <a
              href="todo"
              className="list-reservation__note-desktop text-small-caption color-signal-alert"
            >
              {t("loanListLateFeeDesktopText")}
            </a>
          )}
        </div>
      </div>
      <div>
        {dueDate && loanDate && (
          <div className="list-reservation__status">
            <StatusCircle loanDate={loanDate} dueDate={dueDate} />
            <div>
              <div className="list-reservation__deadline">
                <StatusBadge
                  dueDate={dueDate}
                  dangerText={t("loanListStatusBadgeDangerText")}
                  warningText={t("loanListStatusBadgeWarningText")}
                />
                <p className="text-small-caption" id="due-date">
                  {dueDateLabel} {formatDate(dueDate)}
                </p>
                {additionalMaterials > 0 && (
                  <>
                    <div
                      className="list-reservation__hidden-explanation"
                      id="materials-modal-text"
                    >
                      {t("loanListMaterialsModalMobileText")}
                    </div>
                    <button
                      type="button"
                      aria-describedby="materials-modal-text"
                      className="list-reservation__note-mobile text-small-caption color-secondary-gray"
                    >
                      + {additionalMaterials} {t("LoanListMaterialsMobileText")}
                    </button>
                  </>
                )}
                {materialIsOverdue(dueDate) && (
                  <a
                    href="todo"
                    className="list-reservation__note-mobile text-small-caption color-signal-alert"
                  >
                    {t("loanListLateFeeMobileText")}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

export default FetchMaterial(StackableMaterial);
