import dayjs from "dayjs";
import { LoanV2 } from "../../../core/fbs/model/loanV2";
import { RenewedLoanV2 } from "../../../core/fbs/model/renewedLoanV2";
import { ListView } from "../../../core/utils/types/list-view";
import { Loan } from "../../../core/publizon/model";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { GetMaterialManifestationQuery } from "../../../core/dbc-gateway/generated/graphql";
import type { ReservationDetailsV2 } from "../../../core/fbs/model/reservationDetailsV2";
import { ReservationMetaDataType } from "../../../core/utils/types/reservation-meta-data-type";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";
import { FaustId } from "../../../core/utils/types/ids";

export const removeLoansWithDuplicateDueDate = (
  date: string | null,
  list: MetaDataType<LoanMetaDataType>[]
) => {
  return list.filter(({ loanSpecific }) => loanSpecific?.dueDate === date);
};

export const formatDate = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const getRenewedIds = (list: RenewedLoanV2[]) => {
  return list.map(({ loanDetails }) => loanDetails.recordId);
};

export const removeLoansWithIds = (
  list: MetaDataType<LoanMetaDataType>[],
  ids: string[]
) => {
  return list.filter(({ id }) => {
    return ids.indexOf(id) === -1;
  });
};

export const materialIsOverdue = (date: string | undefined) => {
  if (date) {
    return dayjs().isAfter(dayjs(date));
  }
  return false;
};

// Create a string of authors with commas and a conjunction
export const getAuthorNames = (
  creators: {
    display: string;
  }[],
  by: string,
  and: string
) => {
  const names = creators.map(({ display }) => display);
  let returnContentString = "";
  if (names.length === 1) {
    returnContentString = `${by} ${names.join(", ")}`;
  } else {
    returnContentString = `${by} ${names
      .slice(0, -1)
      .join(", ")} ${and} ${names.slice(-1)}`;
  }
  return returnContentString;
};

// Simple faust match for modals
export const queryMatchesFaust = (query: string | null) => {
  // regex for finding date string from modal query param
  const regex = /^\d{8}$/;
  const faustFound = query ? query.toString().match(regex) : null;
  const returnValue =
    faustFound && faustFound.length > 0 ? faustFound[0] : null;
  return returnValue;
};

export const getStackedItems = (
  view: ListView,
  list: MetaDataType<LoanMetaDataType>[],
  itemsShown: number,
  dueDates: string[] | undefined | null[]
) => {
  let returnLoans: MetaDataType<LoanMetaDataType>[] = [];
  if (view === "stacked" && dueDates) {
    // I mean... this...
    // If the due date is null, the stacked item still has to be shown
    let dueDatesCopy = [...dueDates, null];
    dueDatesCopy = dueDatesCopy.slice(0, itemsShown);
    dueDatesCopy.forEach((uniqueDueDate) => {
      returnLoans = returnLoans.concat(
        list.filter(
          ({ loanSpecific }) => loanSpecific?.dueDate === uniqueDueDate
        )
      );
    });
  }
  return returnLoans;
};

export const getListItems = (
  list: MetaDataType<LoanMetaDataType>[],
  itemsShown: number
) => {
  return [...list].splice(0, itemsShown);
};

export const mapPublizonLoanToLoanMetaDataType = (
  list: Loan[]
): MetaDataType<LoanMetaDataType>[] => {
  return list.map(({ loanExpireDateUtc, orderDateUtc, libraryBook }) => {
    return {
      id: libraryBook?.identifier as FaustId,
      loanSpecific: {
        dueDate: loanExpireDateUtc,
        loanDate: orderDateUtc,
        isRenewable: false,
        materialItemNumber: libraryBook?.identifier || "",
        renewalStatusList: [],
        loanType: null
      }
    };
  });
};

export const mapFBSLoanToLoanMetaDataType = (
  list: LoanV2[]
): MetaDataType<LoanMetaDataType>[] => {
  return list.map(({ loanDetails, isRenewable, renewalStatusList }) => {
    return {
      id: loanDetails.recordId as FaustId,
      loanSpecific: {
        dueDate: loanDetails.dueDate,
        loanDate: loanDetails.loanDate,
        renewalStatusList,
        id: loanDetails.recordId,
        isRenewable,
        materialItemNumber: loanDetails.materialItemNumber,
        loanType: loanDetails.loanType
      }
    };
  });
};

export const mapFBSRenewedLoanToLoanMetaDataType = (
  list: RenewedLoanV2[]
): MetaDataType<LoanMetaDataType>[] => {
  return list.map(({ loanDetails }) => {
    return {
      id: loanDetails.recordId as FaustId,
      loanSpecific: {
        dueDate: loanDetails.dueDate,
        loanDate: loanDetails.loanDate,
        renewalStatusList: [],
        id: loanDetails.recordId,
        isRenewable: false,
        materialItemNumber: loanDetails.materialItemNumber,
        loanType: loanDetails.loanType
      }
    };
  });
};

export const mapFBSReservationToLoanMetaDataType = (
  list: ReservationDetailsV2[]
): MetaDataType<ReservationMetaDataType>[] => {
  return list.map(
    ({ recordId, dateOfReservation, expiryDate, numberInQueue }) => {
      return {
        id: recordId as FaustId,
        reservationSpecific: {
          dateOfReservation,
          expiryDate,
          numberInQueue
        }
      };
    }
  );
};

export const getMaterialInfo = (
  material: GetMaterialManifestationQuery | undefined | null,
  loanMetaData: MetaDataType<LoanMetaDataType | ReservationMetaDataType>
) => {
  const {
    materialItemNumber,
    dueDate,
    loanType,
    loanDate,
    renewalStatusList,
    isRenewable
  } = loanMetaData.loanSpecific || {};

  const { id } = loanMetaData;
  const { hostPublication, materialTypes, titles, creators, pid, abstract } =
    material?.manifestation || {};

  const description = abstract ? abstract[0] : "";

  const { year: yearObject } = hostPublication || {};
  const { year } = yearObject || {};

  const [{ specific: materialType }] = materialTypes || [];
  const {
    main: [mainText]
  } = titles || { main: [] };

  const materialTitle = mainText;

  return {
    isRenewable,
    materialItemNumber,
    dueDate,
    creators,
    id,
    loanType,
    renewalStatusList,
    year,
    titles,
    materialType,
    materialTitle,
    pid,
    description,
    loanDate
  };
};

export default {};
