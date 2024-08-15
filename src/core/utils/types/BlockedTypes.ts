enum BlockedTypes {
  // Extended suspension
  extendedSuspension = "F",
  // Deceased
  deceased = "D",
  // Patron has fee
  fee = "E",

  // The user has not been assigned a correct patron category.
  // This should be pretty rare.
  // In Danish this is also called "Selvoprettet på web"
  missingPatronCategory = "W",

  // library card stolen
  accountStolen = "O",
  // Suspension
  suspension = "U",
  // Blocked by self service
  blockedFromSelfservice = "S"
}

export default BlockedTypes;
