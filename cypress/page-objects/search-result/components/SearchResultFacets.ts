import { ComponentObject } from "@hammzj/cypress-page-object";

export class SearchResultFacetsComponent extends ComponentObject {
  constructor() {
    super(() => cy.get(".search-facets"));

    this.addElements = {
      toggleOnShelf: () => this.container().find("#on-shelf"),
      toggleCanAlwaysBeLoaned: () =>
        this.container().find("#can-always-be-loaned")
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
   * Toggle the "Can always be loaned" filter
   */
  toggleCanAlwaysBeLoaned() {
    this.elements.toggleCanAlwaysBeLoaned().click();
  }

  // Filter group actions

  /**
   * Expand or collapse a filter group by its label
   */
  toggleFilterGroup(label: string) {
    this.container()
      .find(".search-facet-group")
      .contains(".search-facet-group__label", label)
      .parents(".search-facet-group__header")
      .click();
  }

  /**
   * Select a facet value checkbox within a filter group
   */
  selectFacetValue(groupLabel: string, value: string) {
    this.getFilterGroup(groupLabel)
      .find(".search-facet-group__content")
      .contains(".search-facet-group__item", value)
      .find("input[type='checkbox']")
      .check({ force: true });
  }

  /**
   * Deselect a facet value checkbox within a filter group
   */
  deselectFacetValue(groupLabel: string, value: string) {
    this.getFilterGroup(groupLabel)
      .find(".search-facet-group__content")
      .contains(".search-facet-group__item", value)
      .find("input[type='checkbox']")
      .uncheck({ force: true });
  }

  /**
   * Click "Show all" or "Show less" button within a filter group
   */
  clickShowAllInGroup(groupLabel: string) {
    this.getFilterGroup(groupLabel)
      .find(".search-facet-group__show-all")
      .click();
  }

  // Helper to get a filter group by label
  private getFilterGroup(label: string) {
    return this.container()
      .find(".search-facet-group")
      .filter(`:has(.search-facet-group__label:contains("${label}"))`);
  }

  // Verification methods

  verifyOnShelfIsChecked() {
    this.elements.toggleOnShelf().should("have.attr", "aria-checked", "true");
  }

  verifyOnShelfIsNotChecked() {
    this.elements.toggleOnShelf().should("have.attr", "aria-checked", "false");
  }

  verifyCanAlwaysBeLoanedIsChecked() {
    this.elements
      .toggleCanAlwaysBeLoaned()
      .should("have.attr", "aria-checked", "true");
  }

  verifyCanAlwaysBeLoanedIsNotChecked() {
    this.elements
      .toggleCanAlwaysBeLoaned()
      .should("have.attr", "aria-checked", "false");
  }

  /**
   * Verify a filter group is expanded (content is visible)
   */
  verifyFilterGroupIsExpanded(label: string) {
    this.getFilterGroup(label)
      .find(".search-facet-group__header")
      .should("have.attr", "aria-expanded", "true");
    this.getFilterGroup(label)
      .find(".search-facet-group__content")
      .should("exist");
  }

  /**
   * Verify a filter group is collapsed (content is not visible)
   */
  verifyFilterGroupIsCollapsed(label: string) {
    this.getFilterGroup(label)
      .find(".search-facet-group__header")
      .should("have.attr", "aria-expanded", "false");
    this.getFilterGroup(label)
      .find(".search-facet-group__content")
      .should("not.exist");
  }

  /**
   * Verify the selected count badge on a filter group
   */
  verifyFilterGroupBadgeCount(label: string, count: number) {
    this.getFilterGroup(label)
      .find(".search-facet-group__count-badge")
      .should("contain", count);
  }

  /**
   * Verify a facet value checkbox is checked
   */
  verifyFacetValueIsSelected(groupLabel: string, value: string) {
    this.getFilterGroup(groupLabel)
      .find(".search-facet-group__content")
      .contains(".search-facet-group__item", value)
      .find("input[type='checkbox']")
      .should("be.checked");
  }

  /**
   * Verify a facet value checkbox is not checked
   */
  verifyFacetValueIsNotSelected(groupLabel: string, value: string) {
    this.getFilterGroup(groupLabel)
      .find(".search-facet-group__content")
      .contains(".search-facet-group__item", value)
      .find("input[type='checkbox']")
      .should("not.be.checked");
  }

  /**
   * Verify the number of visible facet items in a group
   */
  verifyFacetItemCount(groupLabel: string, count: number) {
    this.getFilterGroup(groupLabel)
      .find(".search-facet-group__item")
      .should("have.length", count);
  }

  /**
   * Verify "Show all" button exists in a group (meaning there are more items)
   */
  verifyShowAllButtonExists(groupLabel: string) {
    this.getFilterGroup(groupLabel)
      .find(".search-facet-group__show-all")
      .should("exist");
  }

  /**
   * Verify a facet value has a specific count displayed
   */
  verifyFacetValueCount(groupLabel: string, value: string, count: number) {
    this.getFilterGroup(groupLabel)
      .find(".search-facet-group__content")
      .contains(".search-facet-group__item", value)
      .find(".search-facet-group__item-count")
      .should("contain", count);
  }

  // Radio button group actions

  /**
   * Select a radio button by its label text
   */
  selectRadioOption(labelText: string) {
    this.container()
      .find(".search-radio-button-group")
      .contains(".search-radio-button-group__label", labelText)
      .parent()
      .click();
  }

  // Radio button group verification methods

  /**
   * Verify a radio button is selected by label text
   */
  verifyRadioOptionIsSelected(labelText: string) {
    this.container()
      .find(".search-radio-button-group")
      .contains(".search-radio-button-group__label", labelText)
      .parent()
      .find(".search-radio-button-group__input--checked")
      .should("exist");
  }

  /**
   * Verify a radio button is not selected by label text
   */
  verifyRadioOptionIsNotSelected(labelText: string) {
    this.container()
      .find(".search-radio-button-group")
      .contains(".search-radio-button-group__label", labelText)
      .parent()
      .find(".search-radio-button-group__input--checked")
      .should("not.exist");
  }
}
