import { DemoModalPage } from "../../../cypress/page-objects/demo-modal.page";

describe("Demo Modal - Page Objects Integration", () => {
  let demoModalPage: DemoModalPage;

  beforeEach(() => {
    // Initialize page object for each test
    demoModalPage = new DemoModalPage();
  });

  it("Opens and closes modal using page objects", () => {
    // Navigate to demo modal story using PageObject's visit method
    demoModalPage.visit([]);

    // Url parameters are passed in, so we expect the first modal to be open on navigation to the url
    demoModalPage.elements.modalHeaders().should("contain", "demo-modal-one");
    demoModalPage.elements
      .modalTwoButtonWithinModal()
      .should("contain", "Show Modal 2");

    // We expect second modal _not_ to be open
    demoModalPage.elements.modalTwoHeaderWithinModal().should("not.exist");

    // Open second modal
    demoModalPage.elements.modalTwoButton().click();

    // We expect second modal to be open
    demoModalPage.elements.modalTwoHeaderWithinModal().should("exist");
    demoModalPage.elements
      .modalTwoHeaderWithinModal()
      .should("contain", "demo-modal-two");
    demoModalPage.elements.closeButtonWithinModal().should("exist");

    // Close the second modal again
    demoModalPage.closeModal();

    // We expect it to be closed
    demoModalPage.elements.modalTwoHeaderWithinModal().should("not.exist");
    demoModalPage.elements.modalTwoButtonWithinModal().should("be.visible");
  });
});

export default {};
