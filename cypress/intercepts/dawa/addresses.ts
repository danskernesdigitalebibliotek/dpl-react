export const givenDawaAddressess = () => {
  // https://api.dataforsyningen.dk/adresser?q=hej&struktur=mini&fuzzy&per_side=10
  cy.interceptRest({
    aliasName: "dawaAddresses",
    url: "https://api.dataforsyningen.dk/adresser*",
    fixtureFilePath: "find-library/dawa-addresses.json"
  });
};

export const givenDawaAddressReverseGeo = () => {
  // https://api.dataforsyningen.dk/adgangsadresser/reverse?x=12.554823940146234&y=55.67931490419412&struktur=mini
  cy.interceptRest({
    aliasName: "dawaReverseGeo",
    url: "https://api.dataforsyningen.dk/adgangsadresser/reverse*",
    fixtureFilePath: "find-library/dawa-reverse-geo.json"
  });
};
