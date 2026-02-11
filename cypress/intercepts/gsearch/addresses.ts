export const givenGSearchAddresses = () => {
  cy.interceptRest({
    aliasName: "gsearchAddresses",
    url: "https://api.dataforsyningen.dk/rest/gsearch/v2.0/adresse*",
    fixtureFilePath: "find-library/gsearch-addresses.json"
  });
};

export const givenGSearchAddressReverseGeo = () => {
  cy.interceptRest({
    aliasName: "gsearchReverseGeo",
    url: "https://api.dataforsyningen.dk/rest/gsearch/v2.0/adgangsadresse_reverse*",
    fixtureFilePath: "find-library/gsearch-reverse-geo.json"
  });
};
