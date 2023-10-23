import { head, keys, values } from "lodash";
import { LoanV2, ReservationDetailsV2 } from "../../fbs/model";
import { FaustId } from "../types/ids";
import { GetManifestationViaMaterialByFaustQuery } from "../../dbc-gateway/generated/graphql";
import { BasicDetailsType } from "../types/basic-details-type";
import { Product, Loan, Reservation } from "../../publizon/model";
import { LoanType } from "../types/loan-type";
import { store } from "../../store";
import { ReservationType } from "../types/reservation-type";
import { getContributors } from "./general";
import { ReservationGroupDetails } from "../useGetReservationGroups";

function getYearFromDataString(date: string) {
  return new Date(date).getFullYear();
}

function getSeriesString(
  series: {
    title: string;
    numberInSeries?: {
      number?: Array<number> | null;
    } | null;
  }[]
) {
  return series
    .map(({ title, numberInSeries }) => {
      if (numberInSeries && numberInSeries.number) {
        return `${title} ${numberInSeries.number?.[0]}`;
      }
      return title;
    })
    .join(", ");
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
      faust: null,
      loanId: null
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
      periodical: loanDetails.periodical?.displayText || "",
      renewalStatusList,
      isRenewable,
      materialItemNumber: loanDetails.materialItemNumber,
      loanType: loanDetails.loanType,
      identifier: null,
      faust: (loanDetails.recordId as FaustId) || null,
      loanId: loanDetails.loanId
    };
  });
};

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
    externalProductId,
    languageCode
  } = material;
  // Todo this is sortof a hack, but using t: UseTextFunction as argument
  // makes the components re-render.
  const {
    text: { data: texts }
  } = store.getState();

  const digitalProductType: { [key: number]: string } = {
    1: texts.publizonEbookText,
    2: texts.publizonAudioBookText,
    4: texts.publizonPodcastText
  };

  const authors =
    contributors?.map(
      ({ firstName, lastName }) => `${firstName} ${lastName}`
    ) || [];

  return {
    title,
    lang: languageCode,
    periodical: null,
    year: publicationDate ? getYearFromDataString(publicationDate) : "",
    description,
    materialType: productType ? digitalProductType[productType] : "",
    externalProductId: externalProductId?.id,
    authors: contributors ? getContributors(false, authors) : "",
    authorsShort: contributors ? getContributors(true, authors) : ""
  } as BasicDetailsType;
};

// Manifestation is a material manifestation from FBI, and is the equivalent
// to the Product type in Publizon. These are mapped to the same
// so digital/physical loans/reservations can use the same components,
// as their UI is often quite similar
export const mapManifestationToBasicDetailsType = (
  material: GetManifestationViaMaterialByFaustQuery
) => {
  const {
    edition,
    abstract,
    titles,
    pid,
    materialTypes,
    creators,
    series,
    languages
  } = material?.manifestation || {};
  const isoCode = languages?.main?.[0]?.isoCode ?? "";
  const description = abstract ? abstract[0] : "";
  const {
    full: [fullText]
  } = titles || { full: [] };
  const { publicationYear } = edition || {};
  const { display: year } = publicationYear || {};

  const inputContributorsArray = creators?.map(({ display }) => display) || [];
  const firstAuthor = creators && creators.length ? creators[0].display : "";

  return {
    lang: isoCode,
    authors: getContributors(false, inputContributorsArray),
    authorsShort: getContributors(true, inputContributorsArray),
    firstAuthor,
    pid,
    title: fullText,
    year,
    description,
    series: series && series.length > 0 ? getSeriesString(series) : "",
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
      productTitle,
      expireDateUtc
    }) => {
      const publizonReservationState: { [key: number]: string } = {
        1: "reserved", // in publizon Queued
        2: "readyForPickup", // in publizon Redeemable
        3: "redeemed", // in publizon Redeemed
        4: "cancelled", // in publizon Cancelled
        5: "expired" // in publizon Expired
      };

      const state = status ? publizonReservationState[status] : null;

      return {
        identifier,
        faust: null,
        dateOfReservation: createdDateUtc,
        expiryDate: expireDateUtc,
        state,
        title: productTitle,
        pickupDeadline: expectedRedeemDateUtc
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
      reservationId,
      periodical
    }) => {
      return {
        periodical: periodical?.displayText || "",
        faust: recordId as FaustId,
        dateOfReservation,
        expiryDate,
        numberInQueue,
        state: state === "readyForPickup" ? "readyForPickup" : "reserved",
        pickupBranch,
        pickupDeadline,
        pickupNumber,
        reservationId,
        reservationIds: [reservationId]
      };
    }
  );
};

export const mapFBSReservationGroupToReservationType = (
  list: ReservationGroupDetails[]
): ReservationType[] => {
  return list.map(
    ({
      dateOfReservation,
      expiryDate,
      numberInQueue,
      state,
      pickupBranch,
      pickupDeadline,
      pickupNumber,
      periodical,
      records
    }) => {
      return {
        periodical: periodical?.displayText || "",
        faust: head(keys(records)) as FaustId,
        dateOfReservation,
        expiryDate,
        numberInQueue,
        state: state === "readyForPickup" ? "readyForPickup" : "reserved",
        pickupBranch,
        pickupDeadline,
        pickupNumber,
        reservationIds: values(records)
      };
    }
  );
};

export default {};
