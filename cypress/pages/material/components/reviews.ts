import { ComponentObject } from "@hammzj/cypress-page-object";

export class ReviewsComponent extends ComponentObject {
  constructor() {
    super(() => cy.getBySel("material-reviews-disclosure"));

    this.addElements = {
      reviews: () => cy.getBySel("material-reviews")
    };
  }

  open() {
    this.container().should("be.visible").click();
    return this;
  }

  getReviews() {
    return this.elements.reviews();
  }

  verifyReviewContent(expectedContent: string) {
    this.elements
      .reviews()
      .should("be.visible")
      .and("contain", expectedContent);
    return this;
  }
}
