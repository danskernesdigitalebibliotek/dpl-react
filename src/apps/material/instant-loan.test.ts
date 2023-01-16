// const coverUrlPattern = /^https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/;

describe("Material - Instant Loan", () => {
  beforeEach(() => {
    cy.visit(
      "/iframe.html?id=apps-material--instant-loan&viewMode=story&type=bog"
    );
  });

  it("renders material", () => {});
  it("renders reservation modal without InstantLoan", () => {});
  it("renders reservation modal with InstantLoan", () => {});
  it("renders reservation modal with InstantLoan and display branch availability", () => {});
});

export default {};
