import { ComponentObject } from "@hammzj/cypress-page-object";

export class AdvancedSearchFormComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".advanced-search-v2__form"));

    this.addElements = {
      rowWrappers: () =>
        this.container().find(".advanced-search-filter-wrapper"),
      rows: () => this.container().find(".advanced-search-filter"),
      addRowButton: () =>
        this.container().find(".advanced-search-v2__add-filter"),
      searchButton: () => this.container().contains("button", "Search"),
      resetButton: () =>
        this.container().find(".advanced-search-v2__reset-button"),
      removeRowButtons: () =>
        this.container().find(".advanced-search-filter__remove-button"),
      searchTermSelects: () =>
        this.container().find(".advanced-search-filter .select-button")
    };
  }

  // Row actions

  /**
   * Types a search term and closes the suggestions dropdown.
   * Use this when testing search functionality without interacting with suggestions.
   */
  enterSearchTerm(index: number, term: string) {
    this.elements
      .rows()
      .eq(index)
      .find("input.combobox-input")
      .clear({ force: true })
      .type(term)
      .type("{esc}");
  }

  /**
   * Types a search term but keeps the suggestions dropdown open.
   * Use this when testing suggestion display or selection.
   */
  typeSearchTerm(index: number, term: string) {
    this.elements
      .rows()
      .eq(index)
      .find("input.combobox-input")
      .clear({ force: true })
      .type(term);
  }

  selectSuggestion(suggestionText: string) {
    cy.get(".combobox-options .combobox-option")
      .contains(suggestionText)
      .click();
  }

  verifySuggestionsAreVisible() {
    cy.get(".combobox-options").should("be.visible");
  }

  verifySuggestionsAreHidden() {
    cy.get(".combobox-options").should("not.exist");
  }

  verifySuggestionExists(text: string) {
    cy.get(".combobox-options .combobox-option").should("contain", text);
  }

  selectSearchTermType(index: number, typeLabel: string) {
    this.elements.searchTermSelects().eq(index).click();
    cy.get(".select-option").contains(typeLabel).click();
  }

  selectOperator(index: number, operator: "AND" | "OR" | "NOT") {
    this.elements
      .rowWrappers()
      .eq(index)
      .next(".advanced-search-filter__operators")
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

  clickSearch() {
    this.elements.searchButton().click();
  }

  // MultiSelect actions
  openMultiSelect(label: string) {
    this.container()
      .contains(".hui-multiselect-wrapper", label)
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
    this.container()
      .contains(".range-select-wrapper", facetLabel)
      .find("button.range-select__button")
      .click();
  }

  selectRangePreset(presetLabel: string) {
    cy.get(".range-select__option").contains(presetLabel).click();
  }

  enterRangeValues(from: string, to: string) {
    cy.get("input#range-select-from").should("be.visible").clear();
    cy.get("input#range-select-from").type(from);
    cy.get("input#range-select-to").should("be.visible").clear();
    cy.get("input#range-select-to").type(to);
  }

  enterRangeFrom(from: string) {
    cy.get("input#range-select-from").should("be.visible").clear();
    cy.get("input#range-select-from").type(from);
  }

  resetRange() {
    cy.get(".range-select__reset-button").click();
  }

  // General actions
  closePopover() {
    cy.get("body").click(0, 0);
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
      .next(".advanced-search-filter__operators")
      .find("button.advanced-search-filter__operator--active")
      .should("contain", operator);
  }

  verifyResetButtonVisible() {
    this.elements.resetButton().should("be.visible");
  }

  verifyResetButtonNotVisible() {
    this.elements.resetButton().should("not.exist");
  }

  verifyMultiSelectBadgeCount(label: string, count: string) {
    this.container()
      .contains(".hui-multiselect-wrapper", label)
      .find(".hui-multiselect__button-label__count-badge")
      .should("contain", count);
  }

  verifyMultiSelectShowsAll(label: string) {
    this.container()
      .contains(".hui-multiselect-wrapper", label)
      .find(".hui-multiselect__button-label")
      .should("contain", "All");
  }

  verifyMultiSelectOptionsContain(text: string) {
    cy.get(".hui-multiselect__options__option")
      .should("have.length.at.least", 1)
      .and("contain", text);
  }

  verifyRangeBadgeContains(facetLabel: string, text: string) {
    this.container()
      .contains(".range-select-wrapper", facetLabel)
      .find(".range-select__button-label__count-badge")
      .should("contain", text);
  }

  verifyRangeShowsAll(facetLabel: string) {
    this.container()
      .contains(".range-select-wrapper", facetLabel)
      .find(".range-select__button-label")
      .should("contain", "All");
  }

  verifyRangeInputValues(from: string, to: string) {
    cy.get("input#range-select-from").should("have.value", from);
    cy.get("input#range-select-to").should("have.value", to);
  }
}
