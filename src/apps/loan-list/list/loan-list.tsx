import React, { useEffect, useState, FC } from "react";
import { useSelector } from "react-redux";
import { useGetLoansV2 } from "../../../core/fbs/fbs";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import {
  getDueDatesLoan,
  sortByLoanDate
} from "../../../core/utils/helpers/general";
import { getUrlQueryParam } from "../../../core/utils/helpers/url";
import { useText } from "../../../core/utils/text";
import {
  ModalIdsProps,
  useModalButtonHandler
} from "../../../core/utils/modal";
import MaterialDetailsModal from "../modal/material-details-modal";
import modalIdsConf from "../../../core/configuration/modal-ids.json";
import List from "./list";
import { useGetV1UserLoans } from "../../../core/publizon/publizon";
import { LoanMetaDataType } from "../../../core/utils/helpers/LoanMetaDataType";
import { ListView } from "../../../core/utils/types/list-view";
import {
  mapPBSLoanToLoanMetaDataType,
  queryMatchesFaust,
  mapPublizonLoanToLoanMetaDataType
} from "../utils/helpers";

const LoanList: FC = () => {
  const { open } = useModalButtonHandler();
  const t = useText();
  const [view, setView] = useState<string>("list");
  const [physicalLoans, setPhysicalLoans] = useState<LoanMetaDataType[]>();
  const [digitalLoans, setDigitalLoans] = useState<LoanMetaDataType[]>();
  const [physicalLoansDueDates, setPhysicalLoansDueDates] = useState<string[]>(
    []
  );
  const [digitalLoansDueDates, setDigitalLoansDueDates] = useState<string[]>(
    []
  );
  const [modalMaterial, setModalMaterial] = useState<
    GetMaterialManifestationQuery | null | undefined
  >(null);
  const [modalLoanDetails, setModalLoanDetails] =
    useState<LoanMetaDataType | null>(null);
  const { isSuccess, data, refetch } = useGetLoansV2();
  const { data: publizonData } = useGetV1UserLoans();
  const { modalIds } = useSelector((s: ModalIdsProps) => s.modal);

  useEffect(() => {
    if (isSuccess && data) {
      const mapToLoanMetaDataType = mapPBSLoanToLoanMetaDataType(data);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setPhysicalLoansDueDates(getDueDatesLoan(mapToLoanMetaDataType));

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanMetaDataType);

      setPhysicalLoans(sortedByLoanDate);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (publizonData?.loans) {
      const mapToLoanMetaDataType = mapPublizonLoanToLoanMetaDataType(
        publizonData.loans
      );

      // Loans are sorted by loan date
      const sortedByLoanDate = sortByLoanDate(mapToLoanMetaDataType);

      setDigitalLoans(sortedByLoanDate);

      // The due dates are used for the stacked materials
      // The stacked materials view shows materials stacked by
      // due date, and for this we need a unique list of due dates
      setDigitalLoansDueDates(getDueDatesLoan(sortedByLoanDate));
    }
  }, [publizonData]);

  const selectModalMaterial = ({
    material,
    loanMetaData
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanMetaData: LoanMetaDataType;
  }) => {
    setModalMaterial(material);
    setModalLoanDetails(loanMetaData);
  };

  useEffect(() => {
    refetch();
  }, [modalIds?.length, refetch]);

  useEffect(() => {
    const modalString = getUrlQueryParam("modal");

    // modal query param: details modal faust
    const faustFound = queryMatchesFaust(modalString);

    if (modalString && faustFound && physicalLoans) {
      const loanDetailsForModal = physicalLoans.filter(
        ({ id }) => id === faustFound
      );
      setModalLoanDetails(loanDetailsForModal[0]);
      open(faustFound);
      return;
    }
    // modal query param: modal loans all
    if (modalString === modalIdsConf.allLoansId) {
      open(modalIdsConf.allLoansId);
    }
  }, [physicalLoans, open]);

  return (
    <>
      <h1 className="text-header-h1 m-32">{t("loanListTitleText")}</h1>
      {physicalLoans && (
        <List
          header={t("loanListPhysicalLoansTitleText")}
          selectModalMaterial={selectModalMaterial}
          dueDateLabel={t("loanListToBeDeliveredText")}
          loans={physicalLoans}
          dueDates={physicalLoansDueDates}
          setView={setView}
          view={view as ListView}
          viewToggleable
        />
      )}
      {digitalLoans && (
        <List
          header={t("loanListDigitalLoansTitleText")}
          dueDateLabel={t("loanListToBeDeliveredDigitalMaterialText")}
          selectModalMaterial={selectModalMaterial}
          loans={digitalLoans}
          dueDates={digitalLoansDueDates}
          setView={setView}
          view={view as ListView}
          viewToggleable={false}
        />
      )}
      {modalLoanDetails && (
        <MaterialDetailsModal
          loanMetaData={modalLoanDetails}
          material={modalMaterial}
        />
      )}
    </>
  );
};

export default LoanList;
