import { ComponentObject } from "@hammzj/cypress-page-object";

export class DialogFindLibrary extends ComponentObject {
  constructor() {
    super(() => cy.get(".find-library-dialog"));
    this.addElements = {
      title: () => this.container().find(".find-library-dialog__title"),
      geoLocationGroup: () =>
        this.container().find(".find-library-dialog__location-group"),
      locationList: () =>
        this.container().find(".find-library-dialog__location-list"),
      locationListItems: () =>
        this.container().find(".find-library-dialog__location-list__item"),
      dawaInputAddressSuggestions: () =>
        this.container().find(".dawa-input__address-suggestions"),
      geoLocationGroupInput: () =>
        this.elements.geoLocationGroup().find("input")
    };
  }

  selectLibraryByName(libraryName: string) {
    this.elements.locationList().contains(libraryName).click();
  }

  verifyAllLibrariesAreDisplayed(libraryNames: string[]) {
    this.elements.locationList().shouldContainAll(libraryNames);
  }

  typeAddressInDawaInput(address: string) {
    this.elements.geoLocationGroupInput().type(address);
  }

  verifyDawaSuggestionListIsVisible() {
    this.elements.dawaInputAddressSuggestions().should("be.visible");
  }

  clickFirstDawaSuggestion() {
    this.elements.dawaInputAddressSuggestions().find("button").eq(0).click();
  }

  verifyDawaSuggestionListIsNotExisting() {
    this.elements.dawaInputAddressSuggestions().should("not.exist");
  }

  verifyDawaSuggestionIsInsertedInInput() {
    this.elements
      .geoLocationGroupInput()
      .should("have.value", "Suomisvej 2, 3310 Ølsted");
  }

  clickReverseGeoLocationButton() {
    this.elements
      .geoLocationGroup()
      .find(".find-library-dialog__location")
      .click();
  }

  verifyReverseLocationIsInsertedInInput() {
    this.elements
      .geoLocationGroupInput()
      .should("have.value", "Vodroffsvej 34, 1900 Frederiksberg C");
  }

  verifyLocationListHasSelectedLibrary({
    name,
    isSelected
  }: {
    name: string;
    isSelected: boolean;
  }) {
    const item = this.elements.locationList().contains(name);
    if (isSelected) {
      item.should(
        "have.class",
        "find-library-dialog__location-list__item--selected"
      );
    }
  }
}
