import {
  PageObject,
  Elements,
  NestedComponents
} from "@hammzj/cypress-page-object";
import { AdvancedSearchFormComponent } from "./components/AdvancedSearchForm";
import { AdvancedSearchSortComponent } from "./components/AdvancedSearchSort";
import { SummaryComponent } from "./components/summary";
import { AdvancedSearchFacetsComponent } from "./components/AdvancedSearchFacests";

export class AdvancedSearchV2Page extends PageObject {
  public elements!: Elements;
  public components!: NestedComponents;

  constructor() {
    super({
      path: "/iframe.html?args=&globals=&id=apps-advanced-search-v2--default&viewMode=story"
    });

    this.addElements = {
      form: () => cy.get(".advanced-search-v2__form"),
      summary: () => cy.get(".advanced-search-summary")
    };

    this.addNestedComponents = {
      Form: (fn) =>
        this.performWithin(
          this.container(),
          new AdvancedSearchFormComponent(),
          fn
        ),
      Summary: (fn) =>
        this.performWithin(this.container(), new SummaryComponent(), fn),
      Filters: (fn) =>
        this.performWithin(
          this.container(),
          new AdvancedSearchFacetsComponent(),
          fn
        ),
      Sort: (fn) =>
        this.performWithin(
          this.container(),
          new AdvancedSearchSortComponent(),
          fn
        )
    };
  }

  // Page-level verification methods

  verifyFormIsVisible() {
    this.elements.form().should("be.visible");
  }

  verifyResultsAreVisible() {
    this.elements.summary().should("be.visible");
  }

  verifyUrlContains(param: string) {
    cy.url().should("include", param);
  }

  verifyUrlParamEquals(paramName: string, expectedValue: unknown) {
    cy.url().then((url) => {
      const urlObj = new URL(url);
      const paramValue = urlObj.searchParams.get(paramName);
      if (paramValue === null) {
        throw new Error(`URL parameter "${paramName}" not found`);
      }
      const actualValue = JSON.parse(paramValue);
      expect(actualValue).to.deep.equal(expectedValue);
    });
  }

  verifyUrlDoesNotContain(substring: string) {
    cy.url().should("not.include", substring);
  }
}
