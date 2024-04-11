/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */

/**
 * The price of a ticket in the category
 */
export type EventsGET200ItemTicketCategoriesItemPrice = {
  /** The currency of the price in ISO 4217 format. E.g. DKK for Danish krone. */
  currency: string;
  /** The price of a ticket in the minor unit of the currency. E.g. 750 for 7,50 EUR. Use 0 for free tickets. */
  value: number;
};
