import { Factory } from "fishery";
import {
  ReservationResponseV2,
  ReservationDetailsV2,
  ReservationResultV2
} from "../../../src/core/fbs/model";

/**
 * Factory for FBS reservation details
 */
export const reservationDetailsFactory = Factory.define<ReservationDetailsV2>(
  () => ({
    reservationId: 12345,
    recordId: "12345678",
    state: "reserved",
    pickupBranch: "DK-775100",
    pickupDeadline: undefined,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    dateOfReservation: new Date().toISOString(),
    numberInQueue: 3,
    periodical: undefined,
    pickupNumber: undefined,
    ilBibliographicRecord: undefined,
    transactionId: "txn-001",
    reservationType: "NORMAL"
  })
);

/**
 * Factory for FBS reservation result
 */
export const reservationResultFactory = Factory.define<ReservationResultV2>(
  () => ({
    result: "success",
    recordId: "12345678",
    reservationDetails: reservationDetailsFactory.build()
  })
);

/**
 * Factory for FBS reservation response
 */
export const reservationResponseFactory = Factory.define<ReservationResponseV2>(
  () => ({
    success: true,
    reservationResults: [reservationResultFactory.build()]
  })
);
