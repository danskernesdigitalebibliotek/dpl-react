/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { ILLBibliographicRecord } from "./iLLBibliographicRecord";
import type { Periodical } from "./periodical";

export interface ReservationDetails {
  dateOfReservation: string;
  /** The date when the patron is no longer interested in the reserved material */
  expiryDate: string;
  ilBibliographicRecord?: ILLBibliographicRecord;
  loanType: string;
  /** The number in the reservation queue. */
  numberInQueue?: number;
  periodical?: Periodical;
  /** ISIL-number of pickup branch */
  pickupBranch: string;
  /** Set if reserved material is available for loan */
  pickupDeadline?: string;
  /** The reservation number. Will be present if the reservation is ready for pickup (the state is 'readyForPickup') */
  pickupNumber?: string;
  /** The FAUST number */
  recordId: string;
  /** Identifies the reservation for use when updating or deleting the reservation */
  reservationId: number;
  state: string;
}
