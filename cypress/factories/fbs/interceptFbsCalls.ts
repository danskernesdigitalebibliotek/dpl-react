import {
  getFbsAvailabilityResponse,
  extractRecordIdFromAvailabilityUrl
} from "./availability.factory";

import {
  getFbsHoldingsResponse,
  extractRecordIdFromHoldingsUrl
} from "./holdings.factory";

// Cypress command helper to intercept FBS calls with realistic responses
export const interceptFbsCalls = () => {
  // Intercept availability calls
  cy.intercept(
    "GET",
    "**/fbs-openplatform.dbc.dk/external/agencyid/catalog/availability/**",
    (req) => {
      const recordId = extractRecordIdFromAvailabilityUrl(req.url);
      const response = getFbsAvailabilityResponse(recordId);
      req.reply({
        statusCode: 200,
        body: response
      });
    }
  ).as("fbsAvailability");

  // Intercept holdings logistics calls
  cy.intercept(
    "GET",
    "**/fbs-openplatform.dbc.dk/external/agencyid/catalog/holdingsLogistics/**",
    (req) => {
      const recordId = extractRecordIdFromHoldingsUrl(req.url);
      const response = getFbsHoldingsResponse(recordId);
      req.reply({
        statusCode: 200,
        body: response
      });
    }
  ).as("fbsHoldings");
};
