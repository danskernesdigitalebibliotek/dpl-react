/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */
import type { EventsGET200ItemTicketCategoriesItemCount } from "./eventsGET200ItemTicketCategoriesItemCount";
import type { EventsGET200ItemTicketCategoriesItemPrice } from "./eventsGET200ItemTicketCategoriesItemPrice";

export type EventsGET200ItemTicketCategoriesItem = {
  /** The name of the ticket category. */
  title: string;
  /** Number of tickets for the event. */
  count?: EventsGET200ItemTicketCategoriesItemCount;
  /** The price of a ticket in the category */
  price: EventsGET200ItemTicketCategoriesItemPrice;
};