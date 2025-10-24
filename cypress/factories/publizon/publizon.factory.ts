import { Factory } from "fishery";
import {
  ReservationListResult,
  ProductResult,
  LoanStatusResult,
  LoanResult,
  LoanListResult,
  ApiResponseCode,
  ContentLoanStatusEnum,
  IdentifierTypeEnum,
  FileExtensionType
} from "../../../src/core/publizon/model";

/**
 * Factory for Publizon user data (reservations and loans)
 * Uses generated types from Orval
 */
export const publizonUserFactory = Factory.define<ReservationListResult>(
  () => ({
    reservations: [],
    code: ApiResponseCode.NUMBER_101,
    message: "OK (#101)."
  })
);

/**
 * Factory for Publizon product details
 * Uses generated types from Orval
 */
export const publizonProductFactory = Factory.define<ProductResult>(() => ({
  product: {
    title: "De syv søstre",
    isActive: true,
    languageCode: "dan",
    productType: 1, // 1 = Ebook
    format: "epub",
    costFree: false,
    createdUtc: "2025-06-16T10:41:31.12Z",
    updatedUtc: "2025-08-28T10:51:02.56Z",
    coverUri: null,
    thumbnailUri: null,
    sampleUri: null,
    externalProductId: {
      idType: 15,
      id: "9788702441000"
    },
    internalProductId: "b63d0c64-eb43-4dee-8d9d-d545169abc35",
    contributors: [],
    fileSizeInBytes: 568,
    durationInSeconds: null,
    publisher: "Gyldendal",
    publicationDate: "2025-06-30T00:00:00Z",
    description: "Mock book description",
    productCategories: []
  },
  code: ApiResponseCode.NUMBER_101,
  message: "OK (#101)."
}));

export const publizonLoanStatusFactory = Factory.define<LoanStatusResult>(
  () => ({
    loanStatus: ContentLoanStatusEnum.NUMBER_4,
    onChecklist: false,
    identifier: "9788702441000",
    code: ApiResponseCode.NUMBER_101,
    message: "OK (#101)."
  })
);

/**
 * Factory for Publizon loan result (loaned e-materials)
 * Uses generated types from Orval
 */
export const publizonLoanFactory = Factory.define<LoanResult>(() => ({
  loan: {
    orderId: "123e4567-e89b-12d3-a456-426614174000",
    orderNumber: "ORD-2025-001",
    orderDateUtc: new Date().toISOString(),
    loanExpireDateUtc: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toISOString(), // 30 days from now
    isSubscriptionLoan: false,
    fileExtensionType: FileExtensionType.NUMBER_3, // epub
    libraryBook: {
      identifier: "9788702441000",
      identifierType: IdentifierTypeEnum.NUMBER_15, // ISBN
      title: "De syv søstre",
      publishersName: "Gyldendal"
    }
  },
  libraryData: {
    loanDurationDays: 30,
    maxAmountPerMonth: 10,
    maxConcurrentEbookLoansPerBorrower: 5,
    maxConcurrentAudiobookLoansPerBorrower: 5
  },
  userData: {
    totalLoans: 1,
    totalEbookLoans: 1,
    totalAudioLoans: 0,
    ebookLoansRemaining: 4,
    audiobookLoansRemaining: 5,
    friendlyCardNumber: "1234567890",
    ebookLoanAvailableUtc: new Date().toISOString(),
    audioLoanAvailableUtc: new Date().toISOString()
  },
  code: ApiResponseCode.NUMBER_101,
  message: "OK (#101)."
}));

/**
 * Factory for Publizon loan list result (user's loaned e-materials)
 * Uses generated types from Orval
 * This is for the /v1/user/loans endpoint which returns an array of loans
 */
export const publizonLoanListFactory = Factory.define<LoanListResult>(() => ({
  loans: [
    {
      orderId: "123e4567-e89b-12d3-a456-426614174000",
      orderNumber: "ORD-2025-001",
      orderDateUtc: new Date().toISOString(),
      loanExpireDateUtc: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      isSubscriptionLoan: false,
      fileExtensionType: FileExtensionType.NUMBER_3,
      libraryBook: {
        identifier: "9788702441000",
        identifierType: IdentifierTypeEnum.NUMBER_15,
        title: "De syv søstre",
        publishersName: "Gyldendal"
      }
    }
  ],
  libraryData: {
    loanDurationDays: 30,
    maxAmountPerMonth: 10,
    maxConcurrentEbookLoansPerBorrower: 5,
    maxConcurrentAudiobookLoansPerBorrower: 5
  },
  userData: {
    totalLoans: 1,
    totalEbookLoans: 1,
    totalAudioLoans: 0,
    ebookLoansRemaining: 4,
    audiobookLoansRemaining: 5,
    friendlyCardNumber: "1234567890",
    ebookLoanAvailableUtc: new Date().toISOString(),
    audioLoanAvailableUtc: new Date().toISOString()
  },
  code: ApiResponseCode.NUMBER_101,
  message: "OK (#101)."
}));
