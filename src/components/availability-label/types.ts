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

export default {};
