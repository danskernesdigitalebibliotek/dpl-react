/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Publizon Library API
 * Pubhub exists in two separate environments, each with their own server, code and database. Please use the web service located at library-api.qa.pubhub.dk when developing and testing.
Orders/loans created in test environment will not be invoiced. Please request a new license key for the production environment when you're ready to go live.
 * OpenAPI spec version: 1
 */

export type ContentLoanStatusEnum =
  (typeof ContentLoanStatusEnum)[keyof typeof ContentLoanStatusEnum];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ContentLoanStatusEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
  NUMBER_3: 3,
  NUMBER_4: 4,
  NUMBER_5: 5,
  NUMBER_6: 6
} as const;
