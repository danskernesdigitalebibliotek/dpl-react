import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openModal } from "../../../core/modal.slice";
import { Cover } from "../../../components/cover/cover";
import StatusCircle from "./utils/status-circle";
import StatusBadge from "./utils/status-badge";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import { useText } from "../../../core/utils/text";

interface StackableMaterialProps {
  dueDate: string;
  loanDate: string | undefined;
  amountOfMaterialsWithDueDate?: number;
  selectDueDate?: () => void;
  authorString: string;
  material: GetMaterialManifestationQuery;
}

const StackableMaterial: React.FC<StackableMaterialProps> = ({
  dueDate,
  loanDate,
  amountOfMaterialsWithDueDate,
  selectDueDate,
  material,
  authorString
}) => {
  const t = useText();

  const { hostPublication, materialTypes, titles, pid, abstract } =
    material?.manifestation || {};
  const { year } = hostPublication || {};
  const [{ specific }] = materialTypes || [];
  const {
    main: [mainText]
  } = titles || { main: [] };

  const dispatch = useDispatch();
  return (
    <div
      className={`list-reservation m-32 ${
        amountOfMaterialsWithDueDate && amountOfMaterialsWithDueDate > 1
          ? "list-reservation--stacked"
          : ""
      }`}
    >
      <div className="list-reservation__material">
        <div>
          <Cover
            size="small"
            animate
            tint="120"
            materialId={pid || ""}
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
              {authorString}
              {year?.year && <> ({year.year})</>}
            </p>
          </div>
          {amountOfMaterialsWithDueDate &&
            amountOfMaterialsWithDueDate > 1 &&
            selectDueDate && (
              // todo style this button as a link
              <button
                type="button"
                onClick={() => {
                  selectDueDate();
                  dispatch(openModal({ modalId: dueDate }));
                }}
                aria-describedby={t("loanListMaterialsModalDesktopText")}
                className="list-reservation__note-desktop text-small-caption color-secondary-gray"
              >
                + {amountOfMaterialsWithDueDate}{" "}
                {t("LoanListMaterialsDesktopText")}
              </button>
            )}
          {dayjs().isAfter(dayjs(dueDate)) && (
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
              <p className="text-small-caption">
                {t("LoanListToBeDeliveredText")}{" "}
                {dayjs(dueDate).format("DD-MM-YYYY")}
              </p>
              {amountOfMaterialsWithDueDate &&
                amountOfMaterialsWithDueDate > 1 && (
                  // todo style this button as a link
                  <button
                    type="button"
                    aria-describedby={t("loanListMaterialsModalMobileText")}
                    className="list-reservation__note-mobile text-small-caption color-secondary-gray"
                  >
                    + {amountOfMaterialsWithDueDate}{" "}
                    {t("LoanListMaterialsMobileText")}
                  </button>
                )}
              <a
                href="todo"
                className="list-reservation__note-mobile text-small-caption color-signal-alert"
              >
                {t("loanListLateFeeMobileText")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackableMaterial;
