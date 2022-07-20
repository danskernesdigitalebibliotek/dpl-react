import React, { useEffect, useState } from "react";
import ReservationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import LoansIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Loans.svg";
import EbookIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Ebook.svg";
import IconWarning from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import { RenewedLoanV2 } from "../../../core/fbs/model";
import { Cover } from "../../../components/cover/cover";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { formatDate, getAuthorNames, materialIsOverdue } from "../helpers";
import { useRenewLoansV2 } from "../../../core/fbs/fbs";
import StatusBadge from "../materials/utils/status-badge";
import IconCheckmark from "../../../components/icon-checkmark/icon-checkmark";

interface MaterialDetailsModalProps {
  pid: string;
  dueDate: string;
  fullTitle: string;
  materialType: string;
  loanId: number;
  creators:
    | (
        | { __typename?: "Corporation" | undefined; display: string }
        | { __typename?: "Person" | undefined; display: string }
      )[]
    | undefined;
  loanDate: string | undefined;
}

interface RenewStatusType {
  statusText?: string;
  buttonText: string;
}

const MaterialDetailsModal: React.FC<MaterialDetailsModalProps> = ({
  pid,
  dueDate,
  fullTitle,
  materialType,
  creators,
  loanDate,
  loanId
}) => {
  const t = useText();
  const [renewStatus, setRenewStatus] = useState<RenewStatusType | null>(null);
  const [renewId, setRenewId] = useState<number | null>(null);

  const [dueDateUpdatable, setDueDateUpdatable] = useState<string | undefined>(
    dueDate
  );
  const [renewed, setRenewed] = useState<boolean>(false);
  const { mutate } = useRenewLoansV2();

  useEffect(() => {
    function determineRenewedStatus({ renewalStatus }: RenewedLoanV2) {
      //  renewed deniedReserved deniedMaxRenewalsReached deniedLoanerIsBlocked deniedMaterialIsNotLoanable deniedMaterialIsNotFound deniedLoanerNotFound deniedLoaningProfileNotFound deniedOtherReason;
      if (renewalStatus[0] === "deniedMaxRenewalsReached") {
        setRenewStatus({
          statusText: t("LoanListDeniedOtherReasonText"),
          buttonText: "kan ikke fornyes"
        });
        return;
      }
      if (renewalStatus[0] === ("deniedOtherReason" || "deniedReserved")) {
        setRenewStatus({
          statusText: t("LoanListDeniedOtherReasonText"),
          buttonText: "kan ikke fornyes"
        });
        return;
      }
      if (renewalStatus[0] === "renewed") {
        setRenewStatus({ buttonText: "fornyet" });
        return;
      }
      setRenewStatus({
        statusText: t("LoanListDeniedOtherReasonText"),
        buttonText: "kan ikke fornyes"
      });
    }
    if (renewId) {
      mutate(
        {
          data: [renewId]
        },
        {
          onSuccess: (result) => {
            if (result) {
              setDueDateUpdatable(result[0].loanDetails.dueDate);
              determineRenewedStatus(result[0]);
              setRenewed(true);
              setRenewId(null);
            }
          },
          onError: () => {
            setRenewId(null);
          }
        }
      );
    }
  }, [mutate, renewId, t]);

  const { recordId: faust } = loanDetails || {};

  return (
    <Modal
      modalId={faust}
      additionalClasses="modal-details"
      closeModalAriaLabelText={t("materialDetailsCloseModalText")}
      screenReaderModalDescriptionText={t(
        "materialDetailsModalDescriptionText"
      )}
    >
      <div className="modal-details__container" style={{ overflow: "scroll" }}>
        <div className="modal-details__header">
          <div className="modal-details__cover">
            <div className="material-container">
              <span className="material material--large bg-identity-tint-120 material__animate">
                <Cover size="large" animate tint="120" materialId={pid || ""} />
              </span>
            </div>
          </div>
          <div className="modal-details__material">
            {dueDateUpdatable && materialIsOverdue(dueDateUpdatable) && (
              <div className="modal-details__tags">
                <div className="status-label status-label--outline ">
                  {materialType}
                </div>
                <StatusBadge
                  dueDate={dueDateUpdatable}
                  dangerText={t("MaterialDetailsModalOverdueText")}
                />
              </div>
            )}
            <h2 className="modal-details__title text-header-h2">{fullTitle}</h2>
            <p className="text-body-medium-regular">
              {creators &&
                getAuthorNames(
                  creators,
                  t("loanListMaterialByAuthorText"),
                  t("loanListMaterialAndAuthorText")
                )}
            </p>
          </div>
        </div>
        <div className="modal-details__buttons">
          {!renewed && (
            <button
              type="button"
              onClick={() => setRenewId(loanId)}
              className="btn-primary btn-filled btn-small arrow__hover--right-small"
            >
              forny dit lån
            </button>
          )}
          {renewed && renewStatus !== null && (
            <>
              {renewStatus?.statusText && (
                <span className="modal-details__buttons__status-text">
                  {renewStatus?.statusText}
                </span>
              )}
              <button
                type="button"
                disabled
                className="btn-primary btn-outline btn-small arrow__hover--right-small"
              >
                {renewStatus.buttonText}
                <div className="btn-icon">
                  <IconCheckmark />
                </div>
              </button>
            </>
          )}
        </div>
        {dueDateUpdatable && materialIsOverdue(dueDateUpdatable) && (
          <div className="modal-details__warning">
            <div className="warning-bar bg-global-secondary">
              <div className="warning-bar__left">
                <img className="warning-bar__icon" src={IconWarning} alt="" />
                <div>
                  <p className="text-body-medium-regular color-primary-black">
                    Afleveringsdatoen for lånet er overskredet, derfor pålægges
                    du et gebyr, når materialet afleveres{" "}
                    <a href="/" className="link-tag color-secondary-gray ml-8">
                      {/* todo link til gebyrer */}
                      Læs mere
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="modal-details__list">
          <div className="list-details">
            <div className="list-details__icon">
              <img src={LoansIcon} alt="" />
            </div>
            <div className="list-details__container">
              <div className="list-details__content">
                <p className="text-header-h5">Afleveres</p>
                <p className="text-small-caption">{formatDate(dueDate)}</p>
              </div>
            </div>
          </div>
          <div className="list-details">
            <div className="list-details__icon">
              <img src={ReservationIcon} alt="" />
            </div>
            <div className="list-details__container">
              <div className="list-details__content">
                <p className="text-header-h5">Udlånsdato</p>
                <p className="text-small-caption">
                  {loanDate && formatDate(loanDate)}
                </p>
              </div>
            </div>
          </div>
          <div className="list-details">
            <div className="list-details__icon">
              <img src={EbookIcon} alt="" />
            </div>
            <div className="list-details__container">
              <div className="list-details__content">
                {/* todo what is materialenummer */}
                <p className="text-header-h5">Materialenummer</p>
                <p className="text-small-caption">{pid}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MaterialDetailsModal;
