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

/**
 * Sorts reservations alphanumerically by pickup number (0-9, then a-z).
 * With fallback to sort by pickup deadline.
 */
export const sortByPickupNumber = (list: ReservationType[]) => {
  return [...list].sort((a, b) => {
    const pickupA = a.pickupNumber || "";
    const pickupB = b.pickupNumber || "";

    // First, compare by pickup number (alphanumeric)
    const numberComparison = pickupA.localeCompare(pickupB, undefined, {
      numeric: true,
      sensitivity: "base"
    });

    // If pickup numbers are different, use that ordering
    if (numberComparison !== 0) {
      return numberComparison;
    }

    // If pickup numbers are the same (or both empty), fall back to pickup deadline
    const deadlineA = a.pickupDeadline
      ? new Date(a.pickupDeadline).getTime()
      : 0;
    const deadlineB = b.pickupDeadline
      ? new Date(b.pickupDeadline).getTime()
      : 0;

    return deadlineA - deadlineB;
  });
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
    it("should filter and return only reservations that are ready for pickup", () => {
      const mockList: ReservationType[] = [
        { state: "readyForPickup", pickupNumber: "123" },
        { state: "notReady", pickupNumber: "456" },
        { state: "readyForPickup", pickupNumber: "789" }
      ];

      const result = getReadyForPickup(mockList);

      expect(result).toEqual([
        { state: "readyForPickup", pickupNumber: "123" },
        { state: "readyForPickup", pickupNumber: "789" }
      ]);
    });
  });

  describe("sortByPickupNumber", () => {
    it("should sort reservations by pickup number alphanumerically", () => {
      const mockList: ReservationType[] = [
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 20",
          pickupDeadline: "2023-02-01"
        },
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 3",
          pickupDeadline: "2023-02-02"
        },
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 100",
          pickupDeadline: "2023-02-03"
        },
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 5",
          pickupDeadline: "2023-02-04"
        }
      ];

      const result = sortByPickupNumber(mockList);

      expect(result).toEqual([
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 3",
          pickupDeadline: "2023-02-02"
        },
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 5",
          pickupDeadline: "2023-02-04"
        },
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 20",
          pickupDeadline: "2023-02-01"
        },
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 100",
          pickupDeadline: "2023-02-03"
        }
      ]);
    });

    it("should handle mixed alphanumeric pickup numbers correctly", () => {
      const mockList: ReservationType[] = [
        { state: "readyForPickup", pickupNumber: "B10" },
        { state: "readyForPickup", pickupNumber: "A2" },
        { state: "readyForPickup", pickupNumber: "10" },
        { state: "readyForPickup", pickupNumber: "2" },
        { state: "readyForPickup", pickupNumber: "A10" }
      ];

      const result = sortByPickupNumber(mockList);

      expect(result).toEqual([
        { state: "readyForPickup", pickupNumber: "2" },
        { state: "readyForPickup", pickupNumber: "10" },
        { state: "readyForPickup", pickupNumber: "A2" },
        { state: "readyForPickup", pickupNumber: "A10" },
        { state: "readyForPickup", pickupNumber: "B10" }
      ]);
    });

    it("should handle empty or missing pickup numbers and sort by date", () => {
      const mockList: ReservationType[] = [
        {
          state: "readyForPickup",
          pickupNumber: "5",
          pickupDeadline: "2023-02-05"
        },
        {
          state: "readyForPickup",
          pickupNumber: "",
          pickupDeadline: "2023-02-03"
        },
        { state: "readyForPickup", pickupDeadline: "2023-02-01" },
        {
          state: "readyForPickup",
          pickupNumber: "3",
          pickupDeadline: "2023-02-04"
        }
      ];

      const result = sortByPickupNumber(mockList);

      // Empty and undefined should come first (sorted by date), then sorted numbers
      expect(result[0].pickupNumber).toBeUndefined();
      expect(result[0].pickupDeadline).toBe("2023-02-01");
      expect(result[1].pickupNumber).toBe("");
      expect(result[1].pickupDeadline).toBe("2023-02-03");
      expect(result[2].pickupNumber).toBe("3");
      expect(result[3].pickupNumber).toBe("5");
    });

    it("should sort by pickup deadline when pickup numbers are the same", () => {
      const mockList: ReservationType[] = [
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 10",
          pickupDeadline: "2023-02-05"
        },
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 10",
          pickupDeadline: "2023-02-03"
        },
        {
          state: "readyForPickup",
          pickupNumber: "Reserveringshylde 10",
          pickupDeadline: "2023-02-04"
        }
      ];

      const result = sortByPickupNumber(mockList);

      // Same pickup number, so should sort by deadline
      expect(result[0].pickupDeadline).toBe("2023-02-03");
      expect(result[1].pickupDeadline).toBe("2023-02-04");
      expect(result[2].pickupDeadline).toBe("2023-02-05");
    });

    it("should not mutate the original array", () => {
      const mockList: ReservationType[] = [
        { state: "readyForPickup", pickupNumber: "B" },
        { state: "readyForPickup", pickupNumber: "A" }
      ];

      const originalOrder = [...mockList];
      sortByPickupNumber(mockList);

      // Original array should remain unchanged
      expect(mockList).toEqual(originalOrder);
    });
  });
}
