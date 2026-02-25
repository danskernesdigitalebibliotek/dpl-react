import {
  PageObject,
  Elements,
  NestedComponents
} from "@hammzj/cypress-page-object";
import { SearchResultFacetsComponent } from "./components/SearchResultFacets";
import { SearchResultDialogFacetsComponent } from "./components/SearchResultDialogFacets";

export class SearchResultPage extends PageObject {
  public elements!: Elements;
  public components!: NestedComponents;

  constructor() {
    super({
      path: "/iframe.html?globals=&id=apps-search-result--default&viewMode=story"
    });

    this.addElements = {
      searchResults: () => cy.get(".search__results"),
      resultsHeading: () => cy.get(".search__results-heading"),
      resultsList: () => cy.get(".search-result-list"),
      resultItems: () => cy.get(".card-list-item"),
      header: () => cy.get(".search-result-header"),
      filterButton: () => cy.get(".search__modify-filters-button"),
      dialog: () => cy.get("dialog.dialog"),
      dialogCloseButton: () => cy.get("dialog.dialog .dialog__close-btn"),
      dialogShowResultsButton: () =>
        cy.get(".search-facets__dialog__actions__button")
    };

    this.addNestedComponents = {
      Filters: (fn) =>
        this.performWithin(
          this.container(),
          new SearchResultFacetsComponent(),
          fn
        ),
      DialogFilters: (fn) =>
        this.performWithin(
          this.container(),
          new SearchResultDialogFacetsComponent(),
          fn
        )
    };
  }

  // Page-level verification methods

  verifyResultsAreVisible() {
    this.elements.searchResults().should("be.visible");
  }

  verifyResultsHeadingContains(text: string) {
    this.elements.resultsHeading().should("contain", text);
  }

  verifyResultItemsExist() {
    this.elements.resultItems().should("have.length.greaterThan", 0);
  }

  verifyUrlContains(param: string) {
    cy.url().should("include", param);
  }

  verifyUrlDoesNotContain(substring: string) {
    cy.url().should("not.include", substring);
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

  // Dialog actions

  openFilterDialog() {
    this.elements.filterButton().click();
  }

  closeFilterDialog() {
    this.elements.dialogCloseButton().click();
  }

  clickShowResultsButton() {
    this.elements.dialogShowResultsButton().click();
  }

  // Dialog verification methods

  verifyDialogIsOpen() {
    this.elements.dialog().should("be.visible");
  }

  verifyDialogIsClosed() {
    this.elements.dialog().should("not.have.attr", "open");
  }
}
