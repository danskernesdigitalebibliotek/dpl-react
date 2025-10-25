import { reservationResponseFactory } from "../../factories/fbs/fbs.factory";
import { ReservationResponseV2 } from "../../../src/core/fbs/model";

/**
 * Given: Reservation will be successful
 * Sets up intercept to simulate successful reservation creation
 */
export const givenReservationWillSucceed = (
  overrides?: Partial<ReservationResponseV2>
) => {
  cy.intercept("POST", "**/external/v1/**/patrons/**/reservations/v2", {
    statusCode: 200,
    body: reservationResponseFactory.build(overrides)
  }).as("createReservation");
};
