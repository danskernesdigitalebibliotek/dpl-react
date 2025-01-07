/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Publizon Library API
 * Pubhub exists in two separate environments, each with their own server, code and database. Please use the web service located at library-api.qa.pubhub.dk when developing and testing.
Orders/loans created in test environment will not be invoiced. Please request a new license key for the production environment when you're ready to go live.
 * OpenAPI spec version: 1
 */

/**
 * 0 = Ebook, 1 = Audio
 */
export type BookTypes = typeof BookTypes[keyof typeof BookTypes];

export const BookTypes = {
  NUMBER_0: 0,
  NUMBER_1: 1
} as const;
