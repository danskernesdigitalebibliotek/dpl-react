export const givenDawaAddressess = () => {
  // https://api.dataforsyningen.dk/adresser?q=hej&struktur=mini&fuzzy&per_side=10
  cy.interceptRest({
    aliasName: "dawaAddresses",
    url: "https://api.dataforsyningen.dk/adresser*",
    fixtureFilePath: "find-library/dawa-addresses.json"
  });
};
