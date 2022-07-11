import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openModal } from "../../../core/modal.slice";
import { Cover } from "../../../components/cover/cover";
import StatusCircle from "./utils/status-circle";
import StatusBadge from "./utils/status-badge";
import { useText } from "../../../core/utils/text";

interface StackableMaterialProps {
  dueDate: string;
  loanDate: string | undefined;
  amountOfMaterialsWithDueDate?: number;
  selectDueDate?: Function;
  getAuthorName: Function;
  materialId: string;
  material: {
    description: string;
    fullTitle: string;
    datePublished: string;
    materialType: string;
    creators: {
      __typename?: "Creator" | undefined;
      name: string;
    }[];
  };
}

const StackableMaterial: React.FC<StackableMaterialProps> = ({
  dueDate,
  loanDate,
  amountOfMaterialsWithDueDate,
  selectDueDate,
  material,
  materialId,
  getAuthorName
}) => {
  const t = useText();

  const dispatch = useDispatch();
  return (
    <>
      {material && (
        <div
          className={`list-reservation m-32 ${
            amountOfMaterialsWithDueDate > 1 ? "list-reservation--stacked" : ""
          }`}
        >
          <>
            <div className="list-reservation__material">
              <div>
                <Cover
                  size="small"
                  animate={false}
                  tint="120"
                  materialId={materialId}
                  description={material.description}
                />
              </div>
              <div className="list-reservation__information">
                <div>
                  <div className="status-label status-label--outline">
                    {material.materialType}
                  </div>
                </div>
                <div className="list-reservation__about">
                  <h3 className="text-header-h4">{material.fullTitle}</h3>
                  <p className="text-small-caption color-secondary-gray">
                    {material.creators.length > 0 &&
                      getAuthorName(material.creators)}
                    {material.datePublished && <> ({material.datePublished})</>}
                  </p>
                </div>
                {amountOfMaterialsWithDueDate > 1 && (
                  // todo style this button as a link
                  <a
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
                  </a>
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
                    <StatusBadge dueDate={dueDate} />
                    <p className="text-small-caption">
                      {t("LoanListToBeDeliveredText")}{" "}
                      {dayjs(dueDate).format("DD-MM-YYYY")}
                    </p>
                    {amountOfMaterialsWithDueDate > 1 && (
                      <a
                        href=""
                        aria-describedby={t("loanListMaterialsModalMobileText")}
                        className="list-reservation__note-mobile text-small-caption color-secondary-gray"
                      >
                        + {amountOfMaterialsWithDueDate}{" "}
                        {t("LoanListMaterialsMobileText")}
                      </a>
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
          </>
        </div>
      )}
    </>
  );
};

export default StackableMaterial;
