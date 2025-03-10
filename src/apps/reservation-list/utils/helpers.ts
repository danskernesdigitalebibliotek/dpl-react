import { ReservationDetailsV2 } from "../../../core/fbs/model";
import {
  calculateRoundedUpDaysUntil,
  formatDateDependingOnDigitalMaterial
} from "../../../core/utils/helpers/date";
import { UseTextFunction } from "../../../core/utils/text";
import { ReservationType } from "../../../core/utils/types/reservation-type";

export const sortByOldestPickupDeadline = (
  list: ReservationType[] | ReservationDetailsV2[]
) => {
  return list.sort(
    (objA, objB) =>
      new Date(objA.pickupDeadline || new Date()).getTime() -
      new Date(objB.pickupDeadline || new Date()).getTime()
  );
};

export const sortByNumberInQueue = (
  reservations: ReservationType[]
): ReservationType[] => {
  return [...reservations].sort(
    (a, b) => (a.numberInQueue || 0) - (b.numberInQueue || 0)
  );
};

export const getReadyForPickup = (list: ReservationType[]) => {
  return list.filter(({ state }) => {
    return state === "readyForPickup";
  });
};

export const infoLabelTextType = {
  pickUpLatest: "reservationPickUpLatestText",
  loanBefore: "reservationListLoanBeforeText"
} as const;

export const getReservationStatusInfoLabel = ({
  pickupBranch,
  date,
  isDigital,
  t
}: {
  pickupBranch: string | null | undefined;
  date: string;
  isDigital: boolean;
  t: UseTextFunction;
}) => {
  const textKey = pickupBranch
    ? infoLabelTextType.pickUpLatest
    : infoLabelTextType.loanBefore;

  return t(textKey, {
    placeholders: {
      "@date": formatDateDependingOnDigitalMaterial({
        date,
        isDigital
      })
    }
  });
};

/**
 * Generates a status text based on reservation details.
 */
export const getStatusText = (
  { identifier, state, pickupDeadline, faust, numberInQueue }: ReservationType,
  t: UseTextFunction
): string => {
  if (identifier && state === "reserved") {
    if (!pickupDeadline) {
      return t("reservationListYouAreInQueueText");
    }

    return t("reservationListAvailableInText", {
      placeholders: {
        "@count": calculateRoundedUpDaysUntil(pickupDeadline)
      }
    });
  }

  if (faust && numberInQueue) {
    return t("dashboardNumberInLineText", {
      count: numberInQueue,
      placeholders: { "@count": numberInQueue }
    });
  }

  return "";
};

export default {};

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("getReservationStatusInfoLabel", () => {
    it("Should deliver correct label for a DIGITAL material when providing a branch", () => {
      const output = getReservationStatusInfoLabel({
        pickupBranch: "SOME-BRANCH",
        date: "12-12-2012 12:12",
        isDigital: true,
        t: (key, options) =>
          JSON.stringify({
            key,
            options
          })
      });

      expect(output).toBe(
        `{"key":"reservationPickUpLatestText","options":{"placeholders":{"@date":"12-12-2012 12:12"}}}`
      );
    });
    it("Should deliver correct label for a DIGITAL material when NOT providing a branch", () => {
      const output = getReservationStatusInfoLabel({
        pickupBranch: null,
        date: "12-12-2012 12:12",
        isDigital: true,
        t: (key, options) =>
          JSON.stringify({
            key,
            options
          })
      });

      expect(output).toBe(
        `{"key":"reservationListLoanBeforeText","options":{"placeholders":{"@date":"12-12-2012 12:12"}}}`
      );
    });
    it("Should deliver correct label for a NON DIGITAL material when providing a branch", () => {
      const output = getReservationStatusInfoLabel({
        pickupBranch: "SOME-BRANCH",
        date: "12-12-2012 12:12",
        isDigital: false,
        t: (key, options) =>
          JSON.stringify({
            key,
            options
          })
      });

      expect(output).toBe(
        `{"key":"reservationPickUpLatestText","options":{"placeholders":{"@date":"12-12-2012"}}}`
      );
    });
    it("Should deliver correct label for a NON DIGITAL material when NOT providing a branch", () => {
      const output = getReservationStatusInfoLabel({
        pickupBranch: null,
        date: "12-12-2012 12:12",
        isDigital: false,
        t: (key, options) =>
          JSON.stringify({
            key,
            options
          })
      });

      expect(output).toBe(
        `{"key":"reservationListLoanBeforeText","options":{"placeholders":{"@date":"12-12-2012"}}}`
      );
    });
  });

  describe("sortByOldestPickupDeadline", () => {
    // Mock dates for testing
    const date1 = "2022-01-01";
    const date2 = "2022-02-01";
    const date3 = "2022-03-01";
    // Mock ReservationType data
    const mockReservationTypeData: ReservationType[] = [
      { pickupDeadline: date1 },
      { pickupDeadline: date3 },
      { pickupDeadline: date2 }
    ];
    // Test if the function sorts an array of reservation data correctly
    it("should sort date array by oldest pickupDeadline", () => {
      const sorted = sortByOldestPickupDeadline(mockReservationTypeData);
      expect(sorted).toEqual([
        { pickupDeadline: date1 },
        { pickupDeadline: date2 },
        { pickupDeadline: date3 }
      ]);
    });
  });

  describe("sortByNumberInQueue function", () => {
    it("should sort items by numberInQueue", () => {
      // Define a mock array of reservation types
      const reservations: ReservationType[] = [
        { state: "reserved", numberInQueue: 2 },
        { state: "reserved", numberInQueue: 3 },
        { state: "reserved", numberInQueue: 1 }
      ];

      // Call the function with the mock data
      const result = sortByNumberInQueue(reservations);

      // Define what we expect the result to be
      const expectedResult: ReservationType[] = [
        { state: "reserved", numberInQueue: 1 },
        { state: "reserved", numberInQueue: 2 },
        { state: "reserved", numberInQueue: 3 }
      ];

      // The result should be equal to the expected result
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getReadyForPickup", () => {
    // Test to check if the function correctly filters out the reservations that are "readyForPickup"
    it("should return the list of reservations that are ready for pickup", () => {
      // Mock data for testing
      const mockList: ReservationType[] = [
        { state: "readyForPickup" },
        { state: "notReady" },
        { state: "readyForPickup" }
      ];

      const result = getReadyForPickup(mockList);

      // We expect the result to be a list of reservations that are "readyForPickup"
      expect(result).toEqual([
        { state: "readyForPickup" },
        { state: "readyForPickup" }
      ]);
    });
  });
}
