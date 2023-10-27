describe("Patron page", () => {
  beforeEach(() => {
    cy.interceptRest({
      aliasName: "User",
      url: "**/external/agencyid/patrons/patronid/v2",
      fixtureFilePath: "patron/user.json"
    });
    cy.interceptRest({
      aliasName: "LibraryProfile",
      url: "**/v1/library/profile",
      fixtureFilePath: "patron/library-profile.json"
    });
    cy.interceptRest({
      aliasName: "Loans",
      url: "**/v1/user/loans",
      fixtureFilePath: "patron/user-loans.json"
    });
  });

  it("Render Patron page", () => {
    cy.visit("/iframe.html?path=/story/apps-patron-page--patron-page-entry");
    cy.wait(["@User", "@LibraryProfile", "@Loans"]);

    // ID 36 2. The system shows
    // ID 36 2.a. Header
    cy.get(".dpl-patron-page")
      .find("h1")
      .scrollIntoView()
      .should("contain.text", "Patron profile page");

    // ID 36 2.b. Digital loans - quota
    cy.get(".dpl-patron-page .dpl-status-loans")
      .find("h2")
      .scrollIntoView()
      .should("contain.text", "Digital loans (eReolen)");

    // ID 36 2.b.i. Number of digital loans (ebook - audiobooks) the patron has left in "this" month
    cy.get(".dpl-patron-page .dpl-status-loans")
      .find(".text-label")
      .eq(1)
      .scrollIntoView()
      .should("contain.text", "1 out of 3");

    cy.get(".dpl-patron-page .dpl-status-loans")
      .find(".text-label")
      .eq(3)
      .scrollIntoView()
      .should("contain.text", "3 out of 3");

    // ID 36 2.c. basic information
    // ID 36 2.c.i. Name
    cy.get(".dpl-patron-info__label")
      .eq(0)
      .scrollIntoView()
      .should("contain.text", "Name");

    cy.get(".dpl-patron-info__text")
      .eq(0)
      .should("contain.text", "Testkort DDF 07/Tøstesen");

    // ID 36 2.c.ii. Address
    cy.get(".dpl-patron-info__label").eq(1).should("contain.text", "Address");
    cy.get(".dpl-patron-info__text").eq(1).should("contain.text", "DK");

    // ID 36 2.d. Contact info
    cy.getBySel("patron-page-contact-info").should(
      "contain.text",
      "Contact information"
    );
  });
});

export {};
