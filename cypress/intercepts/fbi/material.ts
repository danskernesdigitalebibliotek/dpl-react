import { buildGetMaterialResponse } from "../../factories/material/material.factory";
import { musicMaterial } from "../../factories/material/variants/musicMaterial";
import { nonFictionMaterial } from "../../factories/material/variants/nonFictionMaterial";
import { periodicalMaterial } from "../../factories/material/variants/periodicalMaterial";

export const givenAMaterial = () => {
  cy.interceptGraphql({
    operationName: "getMaterial",
    body: buildGetMaterialResponse()
  });
};

export const givenAMaterialMusic = () => {
  cy.interceptGraphql({
    operationName: "getMaterial",
    body: buildGetMaterialResponse(musicMaterial)
  });
};

export const givenANonFictionMaterial = () => {
  cy.interceptGraphql({
    operationName: "getMaterial",
    body: buildGetMaterialResponse(nonFictionMaterial)
  });
};

export const givenAPeriodical = () => {
  cy.interceptGraphql({
    operationName: "getMaterial",
    body: buildGetMaterialResponse(periodicalMaterial)
  });
};
