import { LoanV2, RenewedLoanV2, ReservationDetailsV2 } from "../../fbs/model";
import { FaustId } from "../types/ids";
import { GetMaterialManifestationQuery } from "../../dbc-gateway/generated/graphql";
import { BasicDetailsType } from "../types/basic-details-type";
import { Product, Loan, Reservation } from "../../publizon/model";
import { LoanType } from "../types/loan-type";
import { UseTextFunction } from "../text";
import { ReservationType } from "../types/reservation-type";

// Creates a "by author, author and author"-string
// String interpolation todo?
export const getContributors = (t: UseTextFunction, creators: string[]) => {
  let returnContentString = "";
  if (creators && creators.length > 0) {
    if (creators.length === 1) {
      returnContentString = `${t("materialByAuthorText")} ${creators.join(
        ", "
      )}`;
    } else {
      returnContentString = `${t("materialByAuthorText")} ${creators
        .slice(0, -1)
        .join(", ")} ${t("materialAndAuthorText")} ${creators.slice(-1)}`;
    }
  }
  return returnContentString;
};

//
function getYearFromDataString(date: string) {
  return new Date(date).getFullYear();
}

// Loan is a loan from Publizon, and is the equivalent
// to the LoanV2 type in FBS. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapPublizonLoanToLoanType = (list: Loan[]): LoanType[] => {
  return list.map(({ loanExpireDateUtc, orderDateUtc, libraryBook }) => {
    return {
      dueDate: loanExpireDateUtc,
      loanDate: orderDateUtc,
      isRenewable: false,
      materialItemNumber: libraryBook?.identifier || "",
      renewalStatusList: [],
      loanType: null,
      identifier: libraryBook?.identifier || null,
      faust: null
    };
  });
};

// LoanV2 is a loan from FBS, and is the equivalent
// to the Loan type in Publizon. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapFBSLoanToLoanType = (list: LoanV2[]): LoanType[] => {
  return list.map(({ loanDetails, isRenewable, renewalStatusList }) => {
    return {
      dueDate: loanDetails.dueDate,
      loanDate: loanDetails.loanDate,
      renewalStatusList,
      isRenewable,
      materialItemNumber: loanDetails.materialItemNumber,
      loanType: loanDetails.loanType,
      identifier: null,
      faust: (loanDetails.recordId as FaustId) || null
    };
  });
};

// RenewedLoanV2 is a renewed loan from FBS, and for the moment has no
// equivalent in publizon. It is mapped to loan type, because the only
// thing relevant in the UI is that the loan has been renewed, and is
// Not renewable any longer.
export const mapFBSRenewedLoanToLoanType = (
  list: RenewedLoanV2[]
): LoanType[] => {
  return list.map(({ loanDetails }) => {
    return {
      dueDate: loanDetails.dueDate,
      loanDate: loanDetails.loanDate,
      renewalStatusList: [],
      isRenewable: false,
      materialItemNumber: loanDetails.materialItemNumber,
      loanType: loanDetails.loanType,
      identifier: null,
      faust: (loanDetails.recordId as FaustId) || null
    };
  });
};

// Product is a material from Publizon, and is the equivalent
// to a manifestation from FBI. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapProductToBasicDetailsType = (
  t: UseTextFunction,
  material: Product
) => {
  const {
    publicationDate,
    title,
    description,
    productType,
    contributors,
    externalProductId
  } = material;

  const digitalProductType: { [key: number]: string } = {
    1: t("publizonEbookText"),
    2: t("publizonAudioBookText"),
    4: t("publizonAudioBookText")
  };

  return {
    title,
    year: publicationDate ? getYearFromDataString(publicationDate) : "",
    description,
    materialType: productType ? digitalProductType[productType] : "",
    externalProductId: externalProductId?.id,
    authors: contributors
      ? getContributors(
          t,
          contributors?.map(
            ({ firstName, lastName }) => `${firstName} ${lastName}`
          )
        )
      : ""
  } as BasicDetailsType;
};

// Manifestation is a material manifestation from FBI, and is the equivalent
// to the Product type in Publizon. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapManifestationToBasicDetailsType = (
  t: UseTextFunction,
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
    authors: creators
      ? getContributors(
          t,
          creators?.map(({ display }) => display)
        )
      : "",
    pid,
    title: mainText,
    year,
    description,
    materialType: materialTypes ? materialTypes[0].specific : undefined
  } as BasicDetailsType;
};

// Reservation is a reservation from Publizon, and is the equivalent
// to the ReservationDetailsV2 type in FBS. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapPublizonReservationToReservationType = (
  list: Reservation[]
): ReservationType[] => {
  return list.map(
    ({
      identifier,
      createdDateUtc,
      status,
      expectedRedeemDateUtc,
      expireDateUtc,
    }) => {
      const publizonReservationState: { [key: number]: string } = {
        1: "reserved", // in publizon Queued
        2: "readyForPickup", // in publizon Redeemable
        3: "redeemed", // in publizon Redeemed
        4: "cancelled", // in publizon Cancelled
        5: "expired" // in publizon Expired
      };

      return {
        identifier,
        faust: null,
        dateOfReservation: createdDateUtc,
        expiryDate: expireDateUtc,
        state: status ? publizonReservationState[status] : "",
        pickupDeadline: expectedRedeemDateUtc,
      };
    }
  );
};

// ReservationDetailsV2 is a reservation from FBS, and is the equivalent
// to the Reservation type in Publizon. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapFBSReservationToReservationType = (
  list: ReservationDetailsV2[]
): ReservationType[] => {
  return list.map(
    ({
      recordId,
      dateOfReservation,
      expiryDate,
      numberInQueue,
      state,
      pickupBranch,
      pickupDeadline,
      pickupNumber,
      reservationId
    }) => {
      return {
        identifier: null,
        faust: recordId as FaustId,
        dateOfReservation,
        expiryDate,
        numberInQueue,
        state,
        pickupBranch,
        pickupDeadline,
        pickupNumber,
        reservationId
      };
    }
  );
};

export default {};
