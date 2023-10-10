/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { PeriodicalReservation } from "./periodicalReservation";
import type { ReservationDetailsV2 } from "./reservationDetailsV2";

export interface ReservationResultV2 {
  periodical?: PeriodicalReservation;
  /** Recordid of the record to reserve */
  recordId: string;
  reservationDetails?: ReservationDetailsV2;
  /** The reservation result */
  result: string;
}
