import {
  givenDawaAddressess,
  givenDawaAddressReverseGeo
} from "../../../cypress/intercepts/dawa/addresses";
import { givenLocationLatLong } from "../../../cypress/intercepts/geolocation/geolocation";
import { CreatePatronPage } from "../../../cypress/page-objects/create-patron/CreatePatronPage";

describe("Create Patron - Page Objects Integration", () => {
  let createPatronPage: CreatePatronPage;

  beforeEach(() => {
    cy.viewport(1280, 720);

    // Mock branches endpoint
    cy.interceptRest({
      aliasName: "branches",
      url: "**/agencyid/branches",
      fixtureFilePath: "material/branches.json"
    });

    // Initialize page object for each test
    createPatronPage = new CreatePatronPage();
    createPatronPage.visit([]);
  });

  describe("Page Display", () => {
    it("Should display the create patron page title", () => {
      createPatronPage.elements
        .title()
        .shouldContainAll(["Register as patron"]);
      createPatronPage.elements
        .contactInfo()
        .shouldContainAll([
          "Phone number *",
          "E-mail *",
          "Receive text messages about your loans, reservations, and so forth"
        ]);
      createPatronPage.elements
        .pincode()
        .shouldContainAll(["New pin *", "Length of 4 characters"]);
      createPatronPage.elements
        .librarySelectButton()
        .shouldContainAll(["Choose library"]);
      createPatronPage.elements.submitButton().shouldContainAll(["Confirm"]);
      createPatronPage.elements.cancelButton().shouldContainAll(["Cancel"]);
    });
  });

  describe("Find Library Dialog", () => {
    it("Should open find library dialog when clicking library select", () => {
      createPatronPage.openFindLibraryDialog();
      createPatronPage.verifyFindLibraryDialogIsVisible();
    });

    it("Should display list of libraries with names", () => {
      createPatronPage.openFindLibraryDialog();
      createPatronPage.verifyFindLibraryDialogIsVisible();
      createPatronPage.components.DialogFindLibrary((dialog) => {
        dialog.elements
          .locationList()
          .shouldContainAll([
            "Grønlandsk Bibliotek",
            "Biblioteket Rentemestervej",
            "Sundby",
            "Solvang",
            "Sydhavn",
            "Bibliotekshuset",
            "Valby",
            "Tingbjerg",
            "Vesterbro",
            "Vanløse",
            "Hovedbiblioteket",
            "Vigerslev",
            "Ørestad",
            "Østerbro",
            "Blågården",
            "Christianshavn",
            "Brønshøj",
            "Islands Brygge",
            "Husum",
            "Øbro Jagtvej"
          ]);
      });
    });

    it("Should allow selecting a library from the list", () => {
      createPatronPage.openFindLibraryDialog();
      createPatronPage.verifyFindLibraryDialogIsVisible();
      createPatronPage.components.DialogFindLibrary((dialog) => {
        dialog.elements
          .locationList()
          .shouldContainAll(["Biblioteket Rentemestervej"]);

        dialog.selectLibraryByName("Biblioteket Rentemestervej");
      });
      createPatronPage.verifyDialogIsNotVisible();
      createPatronPage.elements
        .librarySelectButton()
        .shouldContainAll(["Biblioteket Rentemestervej"]);
    });

    it("Should highlight selected library in the list", () => {
      createPatronPage.openFindLibraryDialog();
      createPatronPage.verifyFindLibraryDialogIsVisible();
      createPatronPage.components.DialogFindLibrary((dialog) => {
        dialog.elements
          .locationList()
          .shouldContainAll(["Biblioteket Rentemestervej"]);
        dialog.elements
          .locationListItems()
          .contains("Biblioteket Rentemestervej")
          .click();
      });
      createPatronPage.verifyDialogIsNotVisible();
      createPatronPage.elements
        .librarySelectButton()
        .shouldContainAll(["Biblioteket Rentemestervej"]);
      createPatronPage.openFindLibraryDialog();
      createPatronPage.verifyFindLibraryDialogIsVisible();

      createPatronPage.components.DialogFindLibrary((dialog) => {
        dialog.verifyLocationListHasSelectedLibrary({
          name: "Biblioteket Rentemestervej",
          isSelected: true
        });
      });
    });
  });

  describe("Find Library Dialog through dawa autocomplete", () => {
    it("Should display the suggestions list when typing in the dawa input field", () => {
      givenDawaAddressess();
      createPatronPage.openFindLibraryDialog();
      createPatronPage.verifyFindLibraryDialogIsVisible();
      createPatronPage.components.DialogFindLibrary((dialog) => {
        dialog.typeAddressInDawaInput("Suomisvej");
        dialog.verifyDawaSuggestionListIsVisible();
        dialog.clickFirstDawaSuggestion();
        dialog.verifyDawaSuggestionListIsNotExisting();
        dialog.verifyDawaSuggestionIsInsertedInInput();
      });
    });
  });

  describe("Find Library Dialog through reverse geolocation", () => {
    it("Should display reversed geo location when clicking the reverse geo location button", () => {
      givenDawaAddressess();
      givenDawaAddressReverseGeo();
      createPatronPage.openFindLibraryDialog();
      createPatronPage.verifyFindLibraryDialogIsVisible();
      givenLocationLatLong();

      createPatronPage.components.DialogFindLibrary((dialog) => {
        dialog.clickReverseGeoLocationButton();
        dialog.verifyDawaSuggestionListIsNotExisting();
        dialog.verifyReverseLocationIsInsertedInInput();
      });
    });
  });
});

export default {};
