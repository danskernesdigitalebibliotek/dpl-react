import {
  PageObject,
  Elements,
  NestedComponents
} from "@hammzj/cypress-page-object";
import { SummaryComponent } from "./components/summary";

export class AdvancedSearchV2Page extends PageObject {
  public elements!: Elements;
  public components!: NestedComponents;

  constructor() {
    super({
      path: "/iframe.html?args=&globals=&id=apps-advanced-search-v2--default&viewMode=story"
    });

    this.elements = {
      rowWrappers: () => cy.get(".advanced-search-suggest-wrapper"),
      rows: () => cy.get(".advanced-search-suggest"),
      addRowButton: () => cy.get(".advanced-search-v2__add-suggest"),
      searchButton: () => cy.contains("button", "Search"),
      resetButton: () => cy.get(".advanced-search-v2__reset-button"),
      removeRowButtons: () => cy.get(".advanced-search-suggest__remove-button"),
      searchTermSelects: () => cy.get(".advanced-search-suggest .select-button")
    };

    this.addNestedComponents = {
      Summary: (fn) =>
        this.performWithin(this.container(), new SummaryComponent(), fn)
    };
  }

  // Row actions
  enterSearchTerm(index: number, term: string) {
    this.elements
      .rows()
      .eq(index)
      .find("input.combobox-input")
      .clear({ force: true })
      .type(term)
      .type("{esc}");
  }

  selectSearchTermType(index: number, typeLabel: string) {
    this.elements.searchTermSelects().eq(index).click();
    cy.get(".select-option").contains(typeLabel).click();
  }

  selectOperator(index: number, operator: "AND" | "OR" | "NOT") {
    this.elements
      .rowWrappers()
      .eq(index)
      .next(".advanced-search-suggest__operators")
      .contains("button", operator)
      .click();
  }

  addSearchRow() {
    this.elements.addRowButton().click();
  }

  removeSearchRow(index: number) {
    this.elements.removeRowButtons().eq(index).click();
  }

  clickReset() {
    this.elements.resetButton().click();
  }

  // MultiSelect actions
  openMultiSelect(label: string) {
    cy.contains(".hui-multiselect-wrapper", label)
      .find("button.hui-multiselect__button")
      .click();
  }

  selectMultiSelectOption(optionLabel: string) {
    cy.get(".hui-multiselect__options__option")
      .contains(optionLabel)
      .parents(".hui-multiselect__options__option")
      .first()
      .click();
  }

  searchMultiSelectOption(query: string) {
    cy.get(".hui-multiselect__input").type(query);
  }

  resetMultiSelect() {
    cy.get(".hui-multiselect__reset-button").click();
  }

  // Range actions
  openRangeSelect(facetLabel: string) {
    cy.contains(".range-select-wrapper", facetLabel)
      .find("button.range-select__button")
      .click();
  }

  selectRangePreset(presetLabel: string) {
    cy.get(".range-select__option").contains(presetLabel).click();
  }

  enterRangeValues(from: string, to: string) {
    cy.get("input#range-select-from").should("be.visible").clear().type(from);
    cy.get("input#range-select-to").should("be.visible").clear().type(to);
  }

  enterRangeFrom(from: string) {
    cy.get("input#range-select-from").should("be.visible").clear().type(from);
  }

  resetRange() {
    cy.get(".range-select__reset-button").click();
  }

  // General actions
  closePopover() {
    cy.get("body").click(0, 0);
  }

  clickSearch() {
    this.elements.searchButton().click();
  }

  // Verification methods
  verifyRowCount(count: number) {
    this.elements.rows().should("have.length", count);
  }

  verifySearchTermValue(index: number, value: string) {
    this.elements
      .rows()
      .eq(index)
      .find("input.combobox-input")
      .should("have.value", value);
  }

  verifySearchTermTypeIs(index: number, typeLabel: string) {
    this.elements.searchTermSelects().eq(index).should("contain", typeLabel);
  }

  verifySearchInputPlaceholderIs(index: number, placeholder: string) {
    this.elements
      .rows()
      .eq(index)
      .find("input.combobox-input")
      .should("have.attr", "placeholder", placeholder);
  }

  verifyActiveOperatorIs(index: number, operator: string) {
    this.elements
      .rowWrappers()
      .eq(index)
      .next(".advanced-search-suggest__operators")
      .find("button.advanced-search-suggest__operator--active")
      .should("contain", operator);
  }

  verifyResetButtonVisible() {
    this.elements.resetButton().should("be.visible");
  }

  verifyResetButtonNotVisible() {
    this.elements.resetButton().should("not.exist");
  }

  verifyMultiSelectBadgeCount(label: string, count: string) {
    cy.contains(".hui-multiselect-wrapper", label)
      .find(".hui-multiselect__button-label__count-badge")
      .should("contain", count);
  }

  verifyMultiSelectShowsAll(label: string) {
    cy.contains(".hui-multiselect-wrapper", label)
      .find(".hui-multiselect__button-label")
      .should("contain", "All");
  }

  verifyMultiSelectOptionsContain(text: string) {
    cy.get(".hui-multiselect__options__option")
      .should("have.length.at.least", 1)
      .and("contain", text);
  }

  verifyRangeBadgeContains(facetLabel: string, text: string) {
    cy.contains(".range-select-wrapper", facetLabel)
      .find(".range-select__button-label__count-badge")
      .should("contain", text);
  }

  verifyRangeShowsAll(facetLabel: string) {
    cy.contains(".range-select-wrapper", facetLabel)
      .find(".range-select__button-label")
      .should("contain", "All");
  }

  verifyRangeInputValues(from: string, to: string) {
    cy.get("input#range-select-from").should("have.value", from);
    cy.get("input#range-select-to").should("have.value", to);
  }

  verifyFormIsVisible() {
    cy.get(".advanced-search-v2__form").should("be.visible");
  }

  verifyResultsAreVisible() {
    cy.get(".advanced-search-summary").should("be.visible");
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
}
