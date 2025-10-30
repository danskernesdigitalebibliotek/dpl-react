import { reservationResponseFactory } from "../../factories/fbs/fbs.factory";
import { availabilityFactory } from "../../factories/fbs/availability.factory";
import { holdingsForRecordFactory } from "../../factories/fbs/holdings.factory";
import { scenarios } from "./scenarios";
import { originalBookManifestation } from "../../factories/manifestation/variants/originalBookManifestation";
import { newBookManifestation } from "../../factories/manifestation/variants/newBookManifestation";
import { audioBookManifestation } from "../../factories/manifestation/variants/audioBookManifestation";
import { eBookManifestation } from "../../factories/manifestation/variants/eBookManifestation";
import { ReservationResponseV2 } from "../../../src/core/fbs/model";
import { convertPostIdToFaustId } from "../../../src/core/utils/helpers/general";
import { Pid } from "../../../src/core/utils/types/ids";
/**
 * Extract record IDs from FBS URL query parameters
 */
const extractRecordIdsFromUrl = (url: string): string[] => {
  const params = new URLSearchParams(url.split("?")[1]);
  return params.getAll("recordid").map((id) => decodeURIComponent(id));
};

/**
 * Get scenario for a record ID, with default fallback
 */
const getScenarioForRecord = (recordId: string) => {
  return manifestationScenarios.get(recordId) || scenarios.default;
};

/**
 * Default manifestation configurations
 * Maps PIDs (faust ID portion only) to scenarios for consistent test data
 */
const manifestationScenarios = new Map([
  // 2016 edition: all copies checked out
  [
    convertPostIdToFaustId(originalBookManifestation.pid as Pid),
    scenarios.unavailableEverywhere
  ],
  // 2017 edition: available at multiple libraries
  [convertPostIdToFaustId(newBookManifestation.pid as Pid), scenarios.default],
  // Audiobook: not in collection
  [
    convertPostIdToFaustId(audioBookManifestation.pid as Pid),
    scenarios.notAvailableAnywhere
  ],
  // E-book: digital only
  [
    convertPostIdToFaustId(eBookManifestation.pid as Pid),
    scenarios.reservableButNoHoldings
  ]
]);

/**
 * Intercept FBS calls with factory-based responses
 * Provides default availability and holdings for known manifestations
 * Supports multiple record IDs per request like the real FBS API
 */
export const interceptFbsCalls = () => {
  // Intercept availability calls
  cy.intercept(
    "GET",
    "**/fbs-openplatform.dbc.dk/external/agencyid/catalog/availability/**",
    (req) => {
      const recordIds = extractRecordIdsFromUrl(req.url);
      const response = recordIds.map((recordId) => {
        const scenario = getScenarioForRecord(recordId);
        return availabilityFactory.build({
          recordId,
          ...scenario.availability
        });
      });
      req.reply({ statusCode: 200, body: response });
    }
  ).as("fbsAvailability");

  // Intercept holdings logistics calls
  cy.intercept(
    "GET",
    "**/fbs-openplatform.dbc.dk/external/agencyid/catalog/holdingsLogistics/**",
    (req) => {
      const recordIds = extractRecordIdsFromUrl(req.url);
      const response = recordIds.map((recordId) => {
        const scenario = getScenarioForRecord(recordId);
        return holdingsForRecordFactory.build({
          recordId,
          ...scenario.availability,
          holdings: scenario.holdings
        });
      });
      req.reply({ statusCode: 200, body: response });
    }
  ).as("fbsHoldings");
};

/**
 * Given: Reservation will be successful
 * Sets up intercept to simulate successful reservation creation
 */
export const givenReservationWillSucceed = (
  overrides?: Partial<ReservationResponseV2>
) => {
  cy.intercept("POST", "**/external/v1/**/patrons/**/reservations/v2", {
    statusCode: 200,
    body: reservationResponseFactory.build(
      overrides as Parameters<typeof reservationResponseFactory.build>[0]
    )
  }).as("createReservation");
};
