import React, { useEffect, useCallback, FC, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { formatDate, materialIsOverdue, getAuthorNames } from "../helpers";
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
  loanDetails,
  amountOfMaterialsWithDueDate,
  material,
  selectDueDate,
  selectMaterial
}) => {
  const t = useText();
  const dispatch = useDispatch();

  const { creators, hostPublication, materialTypes, titles, pid, abstract } =
    material.manifestation || {};
  const { year } = hostPublication || {};
  const [{ specific }] = materialTypes || [];
  const {
    main: [mainText]
  } = titles || { main: [] };
  const { loanDate, dueDate, recordId: faust } = loanDetails || {};

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
        dispatch(openModal({ modalId: dueDate }));
      }
    },
    [dispatch, dueDate, selectDueDate]
  );

  const selectListMaterial = useCallback(
    (e: MouseEvent) => {
      stopPropagationFunction(e);
      if (selectMaterial) {
        selectMaterial({
          material,
          loanDetails
        });
      }
      dispatch(openModal({ modalId: faust }));
    },
    [dispatch, faust, loanDetails, material, selectMaterial]
  );

  return (
    <button
      type="button"
      onClick={(e) => selectListMaterial(e)}
      className={`list-reservation my-32 ${
        amountOfMaterialsWithDueDate && amountOfMaterialsWithDueDate > 1
          ? "list-reservation--stacked"
          : ""
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
            <h3 className="text-header-h4">{mainText}</h3>
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
          {amountOfMaterialsWithDueDate &&
            amountOfMaterialsWithDueDate > 1 &&
            selectDueDate && (
              <button
                type="button"
                onClick={(e) => {
                  openDueDateModal(e);
                }}
                aria-describedby={t("loanListMaterialsModalDesktopText")}
                id="test-more-materials"
                className="list-reservation__note-desktop text-small-caption color-secondary-gray"
              >
                + {amountOfMaterialsWithDueDate}{" "}
                {t("loanListMaterialsDesktopText")}
              </button>
            )}
          {materialIsOverdue(dueDate) && (
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
                {t("loanListToBeDeliveredText")} {formatDate(dueDate)}
              </p>
              {amountOfMaterialsWithDueDate &&
                amountOfMaterialsWithDueDate > 1 && (
                  <button
                    type="button"
                    aria-describedby={t("loanListMaterialsModalMobileText")}
                    className="list-reservation__note-mobile text-small-caption color-secondary-gray"
                  >
                    + {amountOfMaterialsWithDueDate}{" "}
                    {t("loanListMaterialsMobileText")}
                  </button>
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
      </div>
    </button>
  );
};

export default FetchMaterial(StackableMaterial);
