import {
  publizonLoanStatusFactory,
  publizonLoanListFactory
} from "../../factories/publizon/publizon.factory";
import { ContentLoanStatusEnum } from "../../../src/core/publizon/model";

/**
 * Given: User has a loaned e-book
 * Sets up intercepts to simulate an e-book that's already loaned by the user
 */
export const givenUserHasLoanedEbook = (options?: {
  orderId?: string;
  identifier?: string;
}) => {
  const orderId = options?.orderId || "58495816-6da7-4ac0-8fbe-db5825922e0a";
  const identifier = options?.identifier || "9788702441000";

  // Show book as loaned in status check
  cy.intercept("GET", "**/v1/loanstatus/**", {
    statusCode: 200,
    body: publizonLoanStatusFactory.build({
      loanStatus: ContentLoanStatusEnum.NUMBER_1, // Loaned
      identifier
    })
  }).as("publizonLoanStatusLoaned");

  // Return the loan in user's loans list
  const loansList = publizonLoanListFactory.build();
  cy.intercept("GET", "**/v1/user/loans**", {
    statusCode: 200,
    body: {
      ...loansList,
      loans: [
        {
          ...loansList.loans![0],
          orderId,
          libraryBook: {
            ...loansList.loans![0].libraryBook!,
            identifier
          }
        }
      ]
    }
  }).as("publizonUserLoansWithLoan");
};

/**
 * Given: User has a reserved e-book
 * Sets up intercepts to simulate an e-book that's reserved by the user
 */
export const givenUserHasReservedEbook = (options?: {
  identifier?: string;
}) => {
  const identifier = options?.identifier || "9788702441000";

  cy.intercept("GET", "**/v1/loanstatus/**", {
    statusCode: 200,
    body: publizonLoanStatusFactory.build({
      loanStatus: ContentLoanStatusEnum.NUMBER_2, // Reserved
      identifier
    })
  }).as("publizonLoanStatusReserved");
};

/**
 * Given: E-book is available to loan
 * Sets up intercepts to simulate an e-book that can be loaned
 */
export const givenEbookIsAvailable = (options?: { identifier?: string }) => {
  const identifier = options?.identifier || "9788702441000";

  cy.intercept("GET", "**/v1/loanstatus/**", {
    statusCode: 200,
    body: publizonLoanStatusFactory.build({
      loanStatus: ContentLoanStatusEnum.NUMBER_4, // Available
      identifier
    })
  }).as("publizonLoanStatusAvailable");
};

/**
 * Given: E-book is unavailable
 * Sets up intercepts to simulate an e-book that cannot be loaned
 */
export const givenEbookIsUnavailable = (options?: { identifier?: string }) => {
  const identifier = options?.identifier || "9788702441000";

  cy.intercept("GET", "**/v1/loanstatus/**", {
    statusCode: 200,
    body: publizonLoanStatusFactory.build({
      loanStatus: ContentLoanStatusEnum.NUMBER_3, // Unavailable
      identifier
    })
  }).as("publizonLoanStatusUnavailable");
};
