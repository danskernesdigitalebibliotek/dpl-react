import type { ReservationDetailsV2 } from "../../fbs/model/reservationDetailsV2";
import { ReservationMetaDataType } from "../types/reservation-meta-data-type";
import { FaustId } from "../types/ids";
import { MetaDataType } from "../types/meta-data-type";
import type { Reservation } from "../../publizon/model/reservation";
import { store } from "../../store";
import { GetMaterialManifestationQuery } from "../../dbc-gateway/generated/graphql";
import { BasicDetailsType } from "../types/basic-details-type";
import { Product, Loan } from "../../publizon/model";
import { LoanV2 } from "../../fbs/model/loanV2";
import { RenewedLoanV2 } from "../../fbs/model/renewedLoanV2";
import { LoanMetaDataType } from "../types/loan-meta-data-type";

// Creates a "by author, author and author"-string
// String interpolation todo?
export const getContributors = (creators: string[] | undefined) => {
  const {
    text: { data: texts }
  } = store.getState();

  let returnContentString = "";
  if (creators && creators.length > 0) {
    if (creators.length === 1) {
      returnContentString = `${texts.materialByAuthorText} ${creators.join(
        ", "
      )}`;
    } else {
      returnContentString = `${texts.materialByAuthorText} ${creators
        .slice(0, -1)
        .join(", ")} ${texts.materialAndAuthorText} ${creators.slice(-1)}`;
    }
  }
  return returnContentString;
};

//
function getYearFromDataString(date?: string) {
  if (date) {
    return new Date(date).getFullYear();
  }
  return "";
}

// Product is a material from Publizon, and is the equivalent
// to a manifestation from FBI. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapProductToBasicDetailsType = (material: Product) => {
  const {
    publicationDate,
    title,
    description,
    productType,
    contributors,
    externalProductId
  } = material;

  const {
    text: { data: texts }
  } = store.getState();

  const digitalProductType: { [key: number]: string } = {
    1: texts.publizonEbookText,
    2: texts.publizonAudioBookText,
    4: texts.publizonAudioBookText
  };

  return {
    title,
    year: getYearFromDataString(publicationDate),
    description,
    materialType: productType ? digitalProductType[productType] : "",
    pid: externalProductId?.id,
    authors: getContributors(
      contributors?.map(({ firstName, lastName }) => `${firstName} ${lastName}`)
    )
  } as BasicDetailsType;
};

// Manifestation is a material manifestation from FBI, and is the equivalent
// to the Product type in Publizon. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapManifestationToBasicDetailsType = (
  material: GetMaterialManifestationQuery
) => {
  const { hostPublication, abstract, titles, pid, materialTypes, creators } =
    material?.manifestation || {};

  const description = abstract ? abstract[0] : "";
  const {
    main: [mainText]
  } = titles || { main: [] };
  const { year: yearObject } = hostPublication || {};
  const { year } = yearObject || {};

  return {
    authors: getContributors(creators?.map(({ display }) => display)),
    pid,
    title: mainText,
    year,
    description,
    materialType: materialTypes ? materialTypes[0].specific : undefined
  } as BasicDetailsType;
};

// ReservationDetailsV2 is a reservation from FBS, and is the equivalent
// to the Reservation type in Publizon. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapFBSReservationToLoanMetaDataType = (
  list: ReservationDetailsV2[]
): MetaDataType<ReservationMetaDataType>[] => {
  return list.map(
    ({
      recordId,
      dateOfReservation,
      expiryDate,
      numberInQueue,
      state,
      pickupBranch,
      pickupDeadline
    }) => {
      return {
        id: recordId as FaustId,
        type: "physical",
        reservationSpecific: {
          dateOfReservation,
          expiryDate,
          numberInQueue,
          state,
          pickupBranch,
          pickupDeadline
        }
      };
    }
  );
};

// Reservation is a reservation from Publizon, and is the equivalent
// to the ReservationDetailsV2 type in FBS. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapPublizonReservationToLoanMetaDataType = (
  list: Reservation[]
): MetaDataType<ReservationMetaDataType>[] => {
  return list.map(
    ({
      identifier,
      createdDateUtc,
      status,
      expectedRedeemDateUtc,
      expireDateUtc
    }) => {
      const publizonReservationState: { [key: number]: string } = {
        1: "reserved", // in publizon Queued
        2: "readyForPickup", // in publizon Redeemable
        3: "redeemed", // in publizon Redeemed
        4: "cancelled", // in publizon Cancelled
        5: "expired" // in publizon Expired
      };

      return {
        id: identifier as FaustId, // or identifier ?
        type: "digital",
        reservationSpecific: {
          dateOfReservation: createdDateUtc,
          expiryDate: expireDateUtc,
          state: status ? publizonReservationState[status] : "",
          pickupDeadline: expectedRedeemDateUtc
        }
      };
    }
  );
};

// Loan is a loan from Publizon, and is the equivalent
// to the LoanV2 type in FBS. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapPublizonLoanToLoanMetaDataType = (
  list: Loan[]
): MetaDataType<LoanMetaDataType>[] => {
  return list.map(({ loanExpireDateUtc, orderDateUtc, libraryBook }) => {
    return {
      type: "digital",
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

// LoanV2 is a loan from FBS, and is the equivalent
// to the Loan type in Publizon. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapFBSLoanToLoanMetaDataType = (
  list: LoanV2[]
): MetaDataType<LoanMetaDataType>[] => {
  return list.map(({ loanDetails, isRenewable, renewalStatusList }) => {
    return {
      type: "physical",
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

// RenewedLoanV2 is a renewed loan from FBS, and for the moment has no
// equivalent in publizon. It is mapped to loan type, because the only
// thing relevant in the UI is that the loan has been renewed, and is
// Not renewable any longer.
export const mapFBSRenewedLoanToLoanMetaDataType = (
  list: RenewedLoanV2[]
): MetaDataType<LoanMetaDataType>[] => {
  return list.map(({ loanDetails }) => {
    return {
      type: "physical",
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
