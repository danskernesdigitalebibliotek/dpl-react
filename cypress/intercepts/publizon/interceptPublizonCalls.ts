import {
  publizonUserFactory,
  publizonProductFactory,
  publizonLoanStatusFactory
} from "../../factories/publizon/publizon.factory";
import {
  ReservationListResult,
  ProductResult,
  LoanStatusResult
} from "../../../src/core/publizon/model";

/**
 * Intercept Publizon API calls with factory-generated mock responses
 * Provides consistent mocking for user data, product details, and loan status
 *
 * Usage:
 *   interceptPublizonCalls();
 *
 * Or with partial overrides:
 *   interceptPublizonCalls({
 *     loanStatus: { loanStatus: ContentLoanStatusEnum.NUMBER_4 }
 *   });
 */
export const interceptPublizonCalls = (overrides?: {
  user?: Partial<ReservationListResult>;
  product?: Partial<ProductResult>;
  loanStatus?: Partial<LoanStatusResult>;
}) => {
  // Intercept user reservations
  cy.intercept("GET", "**/v1/user/reservations**", {
    statusCode: 200,
    body: publizonUserFactory.build(overrides?.user)
  }).as("publizonUserReservations");

  // Intercept user loans
  cy.intercept("GET", "**/v1/user/loans**", {
    statusCode: 200,
    body: {
      loans: [],
      code: 101,
      message: "OK (#101)."
    }
  }).as("publizonUserLoans");

  // Intercept product details
  cy.intercept("GET", "**/v1/products/**", {
    statusCode: 200,
    body: publizonProductFactory.build(overrides?.product)
  }).as("publizonProducts");

  // Intercept loan status
  cy.intercept("GET", "**/v1/loanstatus/**", {
    statusCode: 200,
    body: publizonLoanStatusFactory.build(overrides?.loanStatus)
  }).as("publizonLoanStatus");
};
