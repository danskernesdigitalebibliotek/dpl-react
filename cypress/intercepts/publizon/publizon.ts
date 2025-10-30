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
  cy.intercept("GET", "**/v1/user/loans**", {
    statusCode: 200,
    body: publizonLoanListFactory.build({
      loans: [
        {
          orderId,
          orderNumber: "ORD-2025-001",
          orderDateUtc: new Date().toISOString(),
          loanExpireDateUtc: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          isSubscriptionLoan: false,
          fileExtensionType: 3, // epub
          libraryBook: {
            identifier,
            identifierType: 15, // ISBN
            title: "De syv søstre",
            publishersName: "Gyldendal"
          }
        }
      ],
      userData: {
        totalLoans: 1,
        totalEbookLoans: 1,
        totalAudioLoans: 0,
        ebookLoansRemaining: 4,
        audiobookLoansRemaining: 5
      }
    })
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
