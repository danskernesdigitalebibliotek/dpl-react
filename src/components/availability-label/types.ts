import { LoanStatusResult } from "../../core/publizon/model";
// Publizon API useGetV1LoanstatusIdentifier return data a property "loanStatus"
// which can be a number between 0 - 7. These are codes for specific statuses
// a given product can be in - e.g. code 5 means that there is a reservation queue
// on the product.
// #5 is also the only one we know the exact meaning of. The rest of the numbers
// should be updated in the future when we figure out what they mean.
export const publizonProductStatuses = {
  0: {
    isAvailable: true,
    meaning: "Unknown"
  },
  1: {
    isAvailable: true,
    meaning: "Unknown"
  },
  2: {
    isAvailable: true,
    meaning: "Unknown"
  },
  3: {
    isAvailable: true,
    meaning: "Unknown"
  },
  4: {
    isAvailable: true,
    meaning: "Reservable"
  },
  5: {
    isAvailable: false,
    meaning: "Reservation queue on the material"
  },
  6: {
    isAvailable: true,
    meaning: "Unknown"
  },
  7: {
    isAvailable: true,
    meaning: "Unknown"
  }
};

// Consider refactoring `publizonProductStatuses` and `getLoanStatus` into a shared function,
// as they both handle the same type of data.
// There is a discrepancy between the generated type (ContentLoanStatusEnum) and the Publizon documentation:
// - The generated type represents a number between 0 and 7,
// - whereas the documentation states that the status ranges from 0 to 5.
// Reference: https://docs.pubhub.dk/LibraryApi/1.6/Pubhub_Library_Integration_Guide_v1.6_December_2014.pdf
export const getLoanStatus = (
  dataLoanStatus: LoanStatusResult | null | undefined
) => {
  // Ensure that all statuses are false if the loanStatus is not available
  const status = dataLoanStatus?.loanStatus ?? -1;

  return {
    notLoanable: status === 0, // NotLoanable (not loanable, max loans reached)
    loaned: status === 1, // Loaned (already loaned)
    reserved: status === 2, // Reserved (reserved but not yet redeemable)
    redeemable: status === 3, // Redeemable (reserved and reservation is now redeemable)
    loanable: status === 4, // Loanable (not loaned, not reserved, but loanable)
    reservable: status === 5 // Reservable (not loaned, not reserved, not loanable, but reservable)
  };
};

export default {};
