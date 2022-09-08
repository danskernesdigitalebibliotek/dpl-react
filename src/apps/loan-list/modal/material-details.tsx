import React, { useEffect, useState, useCallback, FC } from "react";
import ReservationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import LoansIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Loans.svg";
import EbookIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Ebook.svg";
import { RenewedLoanV2 } from "../../../core/fbs/model";
import { Cover } from "../../../components/cover/cover";
import { useText } from "../../../core/utils/text";
import { formatDate, getAuthorNames, materialIsOverdue } from "../helpers";
import { useRenewLoansV2 } from "../../../core/fbs/fbs";
import { Pid } from "../../../core/utils/types/ids";
import StatusBadge from "../materials/utils/status-badge";
import IconCheckmark from "../../../components/icon-checkmark/icon-checkmark";
import {
  FetchMaterial,
  MaterialDetailsProps,
  MaterialProps
} from "../materials/utils/material-fetch-hoc";
import WarningBar from "../materials/utils/warning-bar";

interface RenewStatusType {
  statusText?: string;
  buttonText: string;
}

const MaterialDetails: FC<MaterialDetailsProps & MaterialProps> = ({
  loanDetails,
  material
}) => {
  const t = useText();

  const [renewStatus, setRenewStatus] = useState<RenewStatusType | null>(null);

  const { creators, hostPublication, materialTypes, titles, pid } =
    material?.manifestation || {};
  const {
    main: [mainText]
  } = titles || { main: [] };

  const { loanId, loanDate, dueDate, materialItemNumber } = loanDetails || {};

  const [dueDateUpdatable, setDueDateUpdatable] = useState<string | undefined>(
    dueDate
  );
  const [renewed, setRenewed] = useState<boolean>(false);
  const { mutate } = useRenewLoansV2();

  const determineRenewedStatus = useCallback(
    ({ renewalStatus }: RenewedLoanV2) => {
      // todo this will be changed, everything with these statusses will be revised
      //  renewed deniedReserved deniedMaxRenewalsReached deniedLoanerIsBlocked deniedMaterialIsNotLoanable deniedMaterialIsNotFound deniedLoanerNotFound deniedLoaningProfileNotFound deniedOtherReason;
      if (renewalStatus[0] === "deniedMaxRenewalsReached") {
        setRenewStatus({
          statusText: t("loanListDeniedOtherReasonText"),
          buttonText: "kan ikke fornyes"
        });
        return;
      }
      if (renewalStatus[0] === ("deniedOtherReason" || "deniedReserved")) {
        setRenewStatus({
          statusText: t("loanListDeniedOtherReasonText"),
          buttonText: "kan ikke fornyes"
        });
        return;
      }
      if (renewalStatus[0] === "renewed") {
        setRenewed(true);
        setRenewStatus({ buttonText: "fornyet" });
        return;
      }
      setRenewStatus({
        statusText: t("loanListDeniedOtherReasonText"),
        buttonText: "kan ikke fornyes"
      });
    },
    [t]
  );

  const renew = useCallback(
    (renewId: number) => {
      mutate(
        {
          data: [renewId]
        },
        {
          onSuccess: (result) => {
            if (result) {
              setDueDateUpdatable(result[0].loanDetails.dueDate);
              determineRenewedStatus(result[0]);
            }
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    },
    [determineRenewedStatus, mutate]
  );

  useEffect(() => {
    if (dueDate) {
      setDueDateUpdatable(dueDate);
    }
  }, [dueDate]);

  return (
    <div className="modal-details__container">
      <div className="modal-details__header">
        <div className="modal-details__cover">
          <div className="material-container">
            <span className="material material--large bg-identity-tint-120 material__animate">
              <Cover pid={pid as Pid} size="large" animate={false} />
            </span>
          </div>
        </div>
        <div className="modal-details__material">
          {materialIsOverdue(dueDateUpdatable) && (
            <div className="modal-details__tags">
              {materialTypes && (
                <div className="status-label status-label--outline ">
                  {materialTypes[0].specific}
                </div>
              )}
              {dueDateUpdatable && (
                <StatusBadge
                  dueDate={dueDateUpdatable}
                  dangerText={t("materialDetailsOverdueText")}
                />
              )}
            </div>
          )}
          <h2 className="modal-details__title text-header-h2">{mainText}</h2>
          <p className="text-body-medium-regular">
            {creators &&
              getAuthorNames(
                creators,
                t("materialDetailsByAuthorText"),
                t("materialDetailsAndAuthorText")
              )}
            {hostPublication?.year && <> ({hostPublication.year.year})</>}
          </p>
        </div>
      </div>
      <div className="modal-details__buttons">
        {renewStatus === null && (
          <button
            type="button"
            onClick={() => renew(loanId)}
            className="btn-primary btn-filled btn-small arrow__hover--right-small"
          >
            {t("materialDetailsRenewLoanButtonText")}
          </button>
        )}
        {renewStatus !== null && (
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
              {renewStatus?.buttonText}
              {renewed && (
                <div className="btn-icon">
                  <IconCheckmark />
                </div>
              )}
            </button>
          </>
        )}
      </div>
      {materialIsOverdue(dueDateUpdatable) && (
        <div className="modal-details__warning">
          <WarningBar
            linkText={t("materialDetailsLinkToPageWithFeesText")}
            overdueText={t("materialDetailsWarningLoanOverdueText")}
          />
        </div>
      )}
      <div className="modal-details__list">
        <div className="list-details">
          <div className="list-details__icon">
            <img src={LoansIcon} alt="" />
          </div>
          <div className="list-details__container">
            <div className="list-details__content">
              <p className="text-header-h5">
                {t("materialDetailsHandInLabelText")}
              </p>
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
              <p className="text-header-h5">
                {t("materialDetailsLoanDateLabelText")}
              </p>
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
              <p className="text-header-h5">
                {t("materialDetailsMaterialNumberLabelText")}
              </p>
              <p className="text-small-caption">{materialItemNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchMaterial(MaterialDetails);
