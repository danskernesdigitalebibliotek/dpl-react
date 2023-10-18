export enum RenewStatus {
  renewed = "renewed",
  deniedReserved = "deniedReserved",
  deniedMaxRenewalsReached = "deniedMaxRenewalsReached",
  deniedLoanerIsBlocked = "deniedLoanerIsBlocked",
  deniedMaterialIsNotLoanable = "deniedMaterialIsNotLoanable",
  deniedMaterialIsNotFound = "deniedMaterialIsNotFound",
  deniedLoanerNotFound = "deniedLoanerNotFound",
  deniedLoaningProfileNotFound = "deniedLoaningProfileNotFound",
  deniedOtherReason = "deniedOtherReason"
}

export default {};
