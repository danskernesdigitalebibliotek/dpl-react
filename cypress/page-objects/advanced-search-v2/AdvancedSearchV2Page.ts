import {
  PageObject,
  Elements,
  NestedComponents
} from "@hammzj/cypress-page-object";
import { SearchFormComponent } from "./components/SearchForm";
import { SummaryComponent } from "./components/summary";
import { SearchFacetsComponent } from "./components/SearchFacests";
import { AdvancedSearchSortComponent } from "./components/AdvancedSearchSort";

export class AdvancedSearchV2Page extends PageObject {
  public elements!: Elements;
  public components!: NestedComponents;

  constructor() {
    super({
      path: "/iframe.html?args=&globals=&id=apps-advanced-search-v2--default&viewMode=story"
    });

    this.addElements = {
      form: () => cy.get(".search__form"),
      summary: () => cy.get(".search-summary")
    };

    this.addNestedComponents = {
      Form: (fn) =>
        this.performWithin(this.container(), new SearchFormComponent(), fn),
      Summary: (fn) =>
        this.performWithin(this.container(), new SummaryComponent(), fn),
      Filters: (fn) =>
        this.performWithin(this.container(), new SearchFacetsComponent(), fn),
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
