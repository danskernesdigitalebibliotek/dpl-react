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
      addressInputSuggestions: () =>
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

  typeAddressInInput(address: string) {
    this.elements.geoLocationGroupInput().type(address);
  }

  verifyAddressSuggestionListIsVisible() {
    this.elements.addressInputSuggestions().should("be.visible");
  }

  clickFirstAddressSuggestion() {
    this.elements.addressInputSuggestions().find("li").eq(0).click();
  }

  verifyAddressSuggestionListIsNotExisting() {
    this.elements.addressInputSuggestions().should("not.be.visible");
  }

  verifyAddressSuggestionIsInsertedInInput() {
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
      .should("have.value", "Suomisvej 2, 1927 Frederiksberg C");
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
