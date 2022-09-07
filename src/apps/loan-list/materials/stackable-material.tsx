import React, { useEffect, useCallback, FC, MouseEvent, useState } from "react";
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
import { useModalButtonHandler } from "../../../core/utils/modal";
import {
  formatDate,
  getAuthorNames,
  materialIsOverdue
} from "../utils/helpers";

const StackableMaterial: FC<StackableMaterialProps & MaterialProps> = ({
  amountOfMaterialsWithDueDate,
  material,
  selectDueDate,
  selectMaterial,
  loanMetaData
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const [additionalMaterials] = useState(
    amountOfMaterialsWithDueDate ? amountOfMaterialsWithDueDate - 1 : 0
  );

  const { creators, hostPublication, materialTypes, titles, pid, abstract } =
    material.manifestation || {};
  const { year } = hostPublication || {};
  const [{ specific }] = materialTypes || [];
  const {
    main: [mainText]
  } = titles || { main: [] };

  const { dueDate, loanDate, id } = loanMetaData;

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
      if (selectDueDate) {
        selectDueDate();
        open(dueDate);
      }
    },
    [dueDate, open, selectDueDate]
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
      open(faust);
    },
    [faust, loanDetails, material, open, selectMaterial]
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
            description={abstract && abstract[0]}
          />
        </div>
        <div className="list-reservation__information">
          <div>
            <div className="status-label status-label--outline">{specific}</div>
          </div>
          <div className="list-reservation__about">
            <h3 className="text-header-h4">{mainText} {dueDate}</h3>
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
                + {additionalMaterials} {t("loanListMaterialsDesktopText")}
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
                  {t("LoanListToBeDeliveredText")} {formatDate(dueDate)}
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
