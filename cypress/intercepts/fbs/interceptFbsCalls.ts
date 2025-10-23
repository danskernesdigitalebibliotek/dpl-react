import {
  extractRecordIdsFromUrl,
  getFbsAvailabilityResponse,
  getFbsHoldingsResponse
} from "./helpers";
import { registerManifestationAvailability } from "./manifestationPatternsMap";
import { AvailabilityPattern } from "./availabilityPatterns";
import { originalBookManifestation } from "../../factories/manifestation/variants/originalBookManifestation";
import { newBookManifestation } from "../../factories/manifestation/variants/newBookManifestation";
import { audioBookManifestation } from "../../factories/manifestation/variants/audioBookManifestation";

/**
 * Ensure all manifestation patterns are registered
 * This is the single source of truth for manifestation availability patterns
 */
const ensureManifestationPatternsRegistered = () => {
  // 2016 edition: show on shelves but with 0 available everywhere
  registerManifestationAvailability(
    originalBookManifestation.pid,
    AvailabilityPattern.ON_SHELF_BUT_UNAVAILABLE
  );

  // 2017 edition: available at all libraries
  registerManifestationAvailability(
    newBookManifestation.pid,
    AvailabilityPattern.AVAILABLE_EVERYWHERE
  );

  registerManifestationAvailability(
    audioBookManifestation.pid,
    AvailabilityPattern.NOT_AVAILABLE_ANYWHERE
  );
};

/**
 * Intercept FBS calls with pattern-based responses
 * Uses manifestation availability patterns to generate realistic responses
 * Supports multiple record IDs per request like the real FBS API
 */
export const interceptFbsCalls = () => {
  // Ensure all manifestation patterns are registered
  ensureManifestationPatternsRegistered();

  // Intercept availability calls
  cy.intercept(
    "GET",
    "**/fbs-openplatform.dbc.dk/external/agencyid/catalog/availability/**",
    (req) => {
      const recordIds = extractRecordIdsFromUrl(req.url);
      const response = getFbsAvailabilityResponse(recordIds);
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
      const recordIds = extractRecordIdsFromUrl(req.url);
      const response = getFbsHoldingsResponse(recordIds);
      req.reply({
        statusCode: 200,
        body: response
      });
    }
  ).as("fbsHoldings");
};
