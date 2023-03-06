import React, { FC } from "react";
import ReservationIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Reservations.svg";
import LoansIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Loans.svg";
import EbookIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Ebook.svg";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import { useText } from "../../../core/utils/text";
import { formatDate, isDigital } from "../utils/helpers";
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
import { Link } from "../../../components/atoms/link";
import { useUrls } from "../../../core/utils/url";

interface MaterialDetailsProps {
  loan: LoanType | null;
}

const MaterialDetails: FC<MaterialDetailsProps & MaterialProps> = ({
  loan,
  material
}) => {
  const t = useText();
  const { loanListEreolenUrl } = useUrls();
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
    periodical
  } = loan;
  const { authors, materialType, year, title, pid, description, series } =
    material || {};

  return (
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
            dueDate={dueDate}
            dangerText={t("materialDetailsOverdueText")}
          />
        )}
      </ModalDetailsHeader>
      {!isDigital(loan) && faust && loanId && (
        <RenewButton
          classNames="modal-details__buttons--hide-on-mobile"
          faust={faust}
          loanId={loanId}
          renewable={isRenewable}
        />
      )}
      {isDigital(loan) && (
        <div className="modal-details__buttons modal-details__buttons--hide-on-mobile">
          <Link
            href={loanListEreolenUrl}
            className="btn-primary btn-filled btn-small arrow__hover--right-small"
          >
            {t("materialDetailsGoToEreolenText")}
            <img src={ExternalLinkIcon} className="btn-icon invert" alt="" />
          </Link>
        </div>
      )}
      {dueDate && materialIsOverdue(dueDate) && (
        <div className="modal-details__warning">
          <WarningBar
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
      {!isDigital(loan) && faust && loanId && (
        <RenewButton
          classNames="modal-details__buttons__full-width"
          faust={faust}
          loanId={loanId}
          renewable={isRenewable}
        />
      )}
      {isDigital(loan) && (
        <div className="modal-details__buttons">
          <Link
            href={loanListEreolenUrl}
            className="btn-primary btn-filled btn-small arrow__hover--right-small modal-details__buttons__full-width"
          >
            {t("materialDetailsGoToEreolenText")}
            <img src={ExternalLinkIcon} className="btn-icon invert" alt="" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default fetchDigitalMaterial(fetchMaterial(MaterialDetails));
