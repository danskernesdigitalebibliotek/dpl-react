import React, { FC, useState } from "react";
import ReservationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import LoansIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Loans.svg";
import EbookIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Ebook.svg";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import { useText } from "../../../core/utils/text";
import { isDigital } from "../utils/helpers";
import { materialIsOverdue } from "../../../core/utils/helpers/general";
import StatusBadge from "../materials/utils/status-badge";
import WarningBar from "../materials/utils/warning-bar";
import { LoanType } from "../../../core/utils/types/loan-type";
import fetchMaterial, {
  MaterialProps
} from "../materials/utils/material-fetch-hoc";
import fetchDigitalMaterial from "../materials/utils/digital-material-fetch-hoc";
import ListDetails from "../../../components/list-details/list-details";
import ModalDetailsHeader from "../../../components/modal-details-header/modal-details-header";
import RenewButton from "./renew-button";
import Link from "../../../components/atoms/links/Link";
import { useUrls } from "../../../core/utils/url";
import { RequestStatus } from "../../../core/utils/types/request";
import { RenewedLoanV2 } from "../../../core/fbs/model";
import RenewalModalMessage from "../../../components/renewal/RenewalModalMessage";
import { formatDate } from "../../../core/utils/helpers/date";
import useGetWorkUrlFromIdentifier from "../../../core/utils/useGetWorkUrlFromIdentifier";
import isVisible from "../../../core/utils/featureFlag";

interface MaterialDetailsProps {
  loan: LoanType | null;
  modalId: string;
}

const MaterialDetails: FC<MaterialDetailsProps & MaterialProps> = ({
  loan,
  material,
  modalId
}) => {
  const { workUrl } = useGetWorkUrlFromIdentifier(loan?.identifier);
  const [renewingStatus, setRenewingStatus] = useState<RequestStatus>("idle");
  const [renewingResponse, setRenewingResponse] = useState<
    RenewedLoanV2[] | null
  >(null);

  const t = useText();
  const u = useUrls();
  const viewFeesAndCompensationRatesUrl = u("viewFeesAndCompensationRatesUrl");

  if (!loan) {
    return null;
  }

  const {
    dueDate,
    faust,
    loanId,
    identifier,
    isRenewable,
    materialItemNumber,
    loanDate,
    loanType,
    periodical,
    renewalStatusList
  } = loan;
  const { authors, materialType, year, title, pid, description, series } =
    material || {};

  return (
    <>
      {!["idle", "pending"].includes(renewingStatus) && (
        <RenewalModalMessage
          messageType={renewingStatus === "success" ? "success" : "error"}
          renewingResponse={renewingResponse}
          modalId={modalId as string}
          setRenewingStatus={setRenewingStatus}
          texts={{
            successTitleText: t("renewMaterialLoanSuccessTitleText"),
            successStatusText: t("renewMaterialLoanSuccessStatusText"),
            noRenewalsPossibleErrorTitleText: t(
              "renewMaterialLoanNoRenewalsPossibleErrorTitleText"
            ),
            noRenewalsPossibleErrorStatusText: t(
              "renewMaterialLoanNoRenewalsPossibleErrorStatusText"
            ),
            errorTitleText: t("renewMaterialLoanErrorTitleText"),
            errorStatusText: t("renewMaterialLoanErrorStatusText"),
            buttonText: t("renewMaterialLoanButtonText")
          }}
        />
      )}
      {["idle", "pending"].includes(renewingStatus) && (
        <div className="modal-details__container">
          <ModalDetailsHeader
            year={year}
            authors={authors}
            title={title}
            periodical={periodical}
            series={series}
            pid={pid}
            description={description}
            materialType={materialType}
            isbnForCover={identifier || ""}
          >
            {dueDate && (
              <StatusBadge
                showBadgeWithDueDate
                badgeDate={dueDate}
                dangerText={t("materialDetailsOverdueText")}
              />
            )}
          </ModalDetailsHeader>
          {!isDigital(loan) && !!faust && !!loanId && (
            <RenewButton
              classNames="modal-details__buttons modal-details__buttons--hide-on-mobile"
              loanId={loanId}
              renewable={isRenewable}
              hideOnMobile
              renewingStatus={renewingStatus}
              loanType={loanType || ""}
              setRenewingStatus={setRenewingStatus}
              setRenewingResponse={setRenewingResponse}
              renewalStatusList={renewalStatusList}
            />
          )}
          {isVisible("readerPlayer") && isDigital(loan) && workUrl ? (
            <div className="modal-details__buttons modal-details__buttons--hide-on-mobile">
              <Link
                href={workUrl}
                className="btn-primary btn-filled btn-small arrow__hover--right-small"
              >
                {t("materialDetailsGoToMaterialText")}
              </Link>
            </div>
          ) : (
            // Todo: Delete this else block after the readerPlayer feature flag is removed
            isDigital(loan) && (
              <div className="modal-details__buttons modal-details__buttons--hide-on-mobile">
                <Link
                  href={new URL("https://ereolen.dk/user/me")}
                  className="btn-primary btn-filled btn-small arrow__hover--right-small"
                >
                  Gå til eReolen
                  <img
                    src={ExternalLinkIcon}
                    className="btn-icon invert"
                    alt=""
                  />
                </Link>
              </div>
            )
          )}
          {dueDate && materialIsOverdue(dueDate) && (
            <div className="modal-details__warning">
              <WarningBar
                leftLink={viewFeesAndCompensationRatesUrl}
                linkText={t("materialDetailsLinkToPageWithFeesText")}
                overdueText={t("materialDetailsWarningLoanOverdueText")}
              />
            </div>
          )}
          <div className="modal-details__list">
            {dueDate && !isDigital(loan) && (
              <ListDetails
                icon={LoansIcon}
                labels={formatDate(dueDate)}
                title={t("materialDetailsPhysicalDueDateLabelText")}
              />
            )}
            {dueDate && isDigital(loan) && (
              <ListDetails
                icon={LoansIcon}
                labels={formatDate(dueDate)}
                title={t("materialDetailsDigitalDueDateLabelText")}
              />
            )}
            {loanDate && (
              <ListDetails
                icon={ReservationIcon}
                labels={formatDate(loanDate)}
                title={t("materialDetailsLoanDateLabelText")}
              />
            )}
            {materialItemNumber && (
              <ListDetails
                icon={EbookIcon}
                labels={materialItemNumber}
                title={t("materialDetailsMaterialNumberLabelText")}
              />
            )}
          </div>
          {!isDigital(loan) && !!faust && !!loanId && (
            <RenewButton
              classNames="modal-details__buttons__full-width"
              loanId={loanId}
              renewable={isRenewable}
              hideOnMobile={false}
              loanType={loanType || ""}
              renewingStatus={renewingStatus}
              setRenewingStatus={setRenewingStatus}
              setRenewingResponse={setRenewingResponse}
              renewalStatusList={renewalStatusList}
            />
          )}
          {isVisible("readerPlayer") && isDigital(loan) && workUrl ? (
            <div className="modal-details__buttons">
              <Link
                href={workUrl}
                className="btn-primary btn-filled btn-small arrow__hover--right-small modal-details__buttons__full-width"
              >
                {t("materialDetailsGoToMaterialText")}
              </Link>
            </div>
          ) : (
            // Todo: Delete this else block after the readerPlayer feature flag is removed
            isDigital(loan) && (
              <div className="modal-details__buttons">
                <Link
                  href={new URL("https://ereolen.dk/user/me")}
                  className="btn-primary btn-filled btn-small arrow__hover--right-small modal-details__buttons__full-width"
                >
                  Gå til eReolen test
                  <img
                    src={ExternalLinkIcon}
                    className="btn-icon invert"
                    alt=""
                  />
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default fetchDigitalMaterial(fetchMaterial(MaterialDetails));
