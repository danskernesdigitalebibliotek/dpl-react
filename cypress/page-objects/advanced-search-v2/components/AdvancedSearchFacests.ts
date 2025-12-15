import { ComponentObject } from "@hammzj/cypress-page-object";

export class AdvancedSearchFiltersComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".advanced-search-facets"));

    this.addElements = {
      toggleOnShelf: () => this.container().find("#on-shelf"),
      toggleOnlyExtraTitles: () => this.container().find("#only-extra-titles")
    };
  }

  // Toggle actions

  /**
   * Toggle the "On shelf" filter
   */
  toggleOnShelf() {
    this.elements.toggleOnShelf().click();
  }

  /**
   * Toggle the "Only extra titles" filter
   */
  toggleOnlyExtraTitles() {
    this.elements.toggleOnlyExtraTitles().click();
  }

  // Filter group actions

  /**
   * Expand or collapse a filter group by its label
   */
  toggleFilterGroup(label: string) {
    this.container()
      .find(".advanced-search-facet-group")
      .contains(".advanced-search-facet-group__label", label)
      .parents(".advanced-search-facet-group__header")
      .click();
  }

  /**
   * Select a facet value checkbox within a filter group
   */
  selectFacetValue(groupLabel: string, value: string) {
    this.getFilterGroup(groupLabel)
      .find(".advanced-search-facet-group__content")
      .contains(".advanced-search-facet-group__item", value)
      .find("input[type='checkbox']")
      .check({ force: true });
  }

  /**
   * Deselect a facet value checkbox within a filter group
   */
  deselectFacetValue(groupLabel: string, value: string) {
    this.getFilterGroup(groupLabel)
      .find(".advanced-search-facet-group__content")
      .contains(".advanced-search-facet-group__item", value)
      .find("input[type='checkbox']")
      .uncheck({ force: true });
  }

  /**
   * Click "Show all" or "Show less" button within a filter group
   */
  clickShowAllInGroup(groupLabel: string) {
    this.getFilterGroup(groupLabel)
      .find(".advanced-search-facet-group__show-all")
      .click();
  }

  // Helper to get a filter group by label
  private getFilterGroup(label: string) {
    return this.container()
      .find(".advanced-search-facet-group")
      .filter(`:has(.advanced-search-facet-group__label:contains("${label}"))`);
  }

  // Verification methods

  verifyOnShelfIsChecked() {
    this.elements.toggleOnShelf().should("have.attr", "aria-checked", "true");
  }

  verifyOnShelfIsNotChecked() {
    this.elements.toggleOnShelf().should("have.attr", "aria-checked", "false");
  }

  verifyOnlyExtraTitlesIsChecked() {
    this.elements
      .toggleOnlyExtraTitles()
      .should("have.attr", "aria-checked", "true");
  }

  verifyOnlyExtraTitlesIsNotChecked() {
    this.elements
      .toggleOnlyExtraTitles()
      .should("have.attr", "aria-checked", "false");
  }

  /**
   * Verify a filter group is expanded (content is visible)
   */
  verifyFilterGroupIsExpanded(label: string) {
    this.getFilterGroup(label)
      .find(".advanced-search-facet-group__header")
      .should("have.attr", "aria-expanded", "true");
    this.getFilterGroup(label)
      .find(".advanced-search-facet-group__content")
      .should("exist");
  }

  /**
   * Verify a filter group is collapsed (content is not visible)
   */
  verifyFilterGroupIsCollapsed(label: string) {
    this.getFilterGroup(label)
      .find(".advanced-search-facet-group__header")
      .should("have.attr", "aria-expanded", "false");
    this.getFilterGroup(label)
      .find(".advanced-search-facet-group__content")
      .should("not.exist");
  }

  /**
   * Verify the selected count badge on a filter group
   */
  verifyFilterGroupBadgeCount(label: string, count: number) {
    this.getFilterGroup(label)
      .find(".advanced-search-facet-group__count-badge")
      .should("contain", count);
  }

  /**
   * Verify a facet value checkbox is checked
   */
  verifyFacetValueIsSelected(groupLabel: string, value: string) {
    this.getFilterGroup(groupLabel)
      .find(".advanced-search-facet-group__content")
      .contains(".advanced-search-facet-group__item", value)
      .find("input[type='checkbox']")
      .should("be.checked");
  }

  /**
   * Verify a facet value checkbox is not checked
   */
  verifyFacetValueIsNotSelected(groupLabel: string, value: string) {
    this.getFilterGroup(groupLabel)
      .find(".advanced-search-facet-group__content")
      .contains(".advanced-search-facet-group__item", value)
      .find("input[type='checkbox']")
      .should("not.be.checked");
  }

  /**
   * Verify the number of visible facet items in a group
   */
  verifyFacetItemCount(groupLabel: string, count: number) {
    this.getFilterGroup(groupLabel)
      .find(".advanced-search-facet-group__item")
      .should("have.length", count);
  }

  /**
   * Verify "Show all" button exists in a group (meaning there are more items)
   */
  verifyShowAllButtonExists(groupLabel: string) {
    this.getFilterGroup(groupLabel)
      .find(".advanced-search-facet-group__show-all")
      .should("exist");
  }

  /**
   * Verify a facet value has a specific count displayed
   */
  verifyFacetValueCount(groupLabel: string, value: string, count: number) {
    this.getFilterGroup(groupLabel)
      .find(".advanced-search-facet-group__content")
      .contains(".advanced-search-facet-group__item", value)
      .find(".advanced-search-facet-group__item-count")
      .should("contain", count);
  }
}
