import {
  Elements,
  NestedComponents,
  PageObject
} from "@hammzj/cypress-page-object";
import { DialogFindLibrary } from "./components/DialogFindLibrary";

export class CreatePatronPage extends PageObject {
  public elements!: Elements;
  public components!: NestedComponents;

  constructor() {
    super({
      path: `/iframe.html?args=&globals=&id=apps-create-patron--primary&viewMode=story`
    });

    this.addElements = {
      title: () => cy.get(".create-patron-page__title"),
      contactInfo: () => cy.get("[data-cy='patron-page-contact-info']"),
      pincode: () => cy.get("[data-cy='pincode-section']"),
      librarySelectButton: () => cy.get("[data-cy='library-select-section']"),
      submitButton: () =>
        cy.get("[data-cy='complete-user-registration-button']"),
      cancelButton: () => cy.get("[data-cy='cancel-user-registration-button']")
    };

    this.addNestedComponents = {
      DialogFindLibrary: (fn) =>
        this.performWithin(this.container(), new DialogFindLibrary(), fn)
    };
  }

  openFindLibraryDialog() {
    this.elements.librarySelectButton().click();
  }

  verifyFindLibraryDialogIsVisible() {
    cy.get(".find-library-dialog").shouldContainAll(["Find nearest library"]);
  }

  verifyDialogIsNotVisible() {
    cy.get(".find-library-dialog").should("not.be.visible");
  }
}
