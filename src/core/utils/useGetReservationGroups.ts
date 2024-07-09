import { groupBy, map, min, reduce } from "lodash";
import { useGetReservationsV2 } from "../fbs/fbs";
import { ReservationDetailsV2 } from "../fbs/model";

/**
 * Custom reservation details type which covers parallel reservations.
 *
 * Normally a reservation only covers a single record but we want to treat
 * parallel reservations the same way as we do single reservations regarding
 * both presentation and handling. Thus we group reservation details for
 * individual records into a single object.
 *
 * We still need the individual reservations and their related records for
 * further handling so we store these in a new map.
 *
 * All other values are for intent and purposes expected to the same for all
 * reservations in the group.
 */
export type ReservationGroupDetails = Omit<
  ReservationDetailsV2,
  "reservationId" | "recordId"
> & {
  records: {
    // Record id to reservation id map.
    [key: string]: number;
  };
};

function groupReservations(data: ReservationDetailsV2[]) {
  const reservationGroups = groupBy(data, (reservation) => {
    if (reservation.reservationType === "parallel") {
      return reservation.transactionId;
    }
    return reservation.reservationId;
  });

  const processedReserations = map(
    reservationGroups,
    (reservationGroup: ReservationDetailsV2[]): ReservationGroupDetails => {
      return {
        // Use the first reservation in the group as the base.
        ...reservationGroup[0],
        // The queue number for the group is the lowest individual queue number
        numberInQueue: min(map(reservationGroup, "numberInQueue")),
        records: reduce(
          reservationGroup,
          (result, reservation) => {
            return {
              ...result,
              [reservation.recordId]: reservation.reservationId
            };
          },
          {}
        )
      };
    }
  );
  return processedReserations;
}

/**
 * Custom version of the generated useGetReservations hook which returns our
 * custom reservation details type.
 */
type UseGetReservationGroupsResult = Omit<
  ReturnType<typeof useGetReservationsV2>,
  "data"
> & {
  data: ReservationGroupDetails[] | null;
};
const useGetReservationGroups = (): UseGetReservationGroupsResult => {
  const result = useGetReservationsV2();
  const resultWithGroups = {
    ...result,
    data:
      result.data && Array.isArray(result.data)
        ? groupReservations(result.data)
        : null
  };
  return resultWithGroups;
};

export default useGetReservationGroups;

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("Reservation grouping", () => {
    // Generator for setting up mock data with sensible defaults.
    function generateReservation(
      data: Partial<ReservationDetailsV2>
    ): ReservationDetailsV2 {
      return {
        reservationId: 123,
        transactionId: "transaction",
        recordId: "record",
        reservationType: "normal", // "normal" or "parallel"
        state: "reserved", // "reserved", "readyForPickup"
        dateOfReservation: "2023-01-01",
        pickupBranch: "DK-775100",
        expiryDate: "2024-01-01",
        ...data
      };
    }

    it("groups reservations by transaction id", () => {
      const reservations = groupReservations([
        generateReservation({ transactionId: "t1", reservationId: 1 }),
        generateReservation({
          reservationId: 2,
          transactionId: "t2",
          reservationType: "parallel"
        }),
        generateReservation({
          reservationId: 3,
          transactionId: "t2",
          reservationType: "parallel"
        }),
        generateReservation({ transactionId: "t3", reservationId: 4 })
      ]);
      expect(reservations).toHaveLength(3);
    });

    it("transforms individual reservations to map from reservation ids to record ids", () => {
      const reservations = groupReservations([
        generateReservation({
          transactionId: "t1",
          reservationId: 1,
          recordId: "r11",
          reservationType: "parallel"
        }),
        generateReservation({
          transactionId: "t1",
          reservationId: 2,
          recordId: "r22",
          reservationType: "parallel"
        })
      ]);
      expect(reservations).toHaveLength(1);
      expect(reservations[0].records).toEqual({
        r11: 1,
        r22: 2
      });
    });

    it("uses the lowest queue number for parallel reservations", () => {
      const reservations = groupReservations([
        generateReservation({ transactionId: "t1", numberInQueue: 7 }),
        generateReservation({ transactionId: "t1", numberInQueue: 2 }),
        generateReservation({ transactionId: "t1", numberInQueue: 5 })
      ]);
      expect(reservations).toHaveLength(1);
      expect(reservations[0].numberInQueue).toBe(2);
    });
  });
}
