import {
  PageObject,
  Elements,
  NestedComponents
} from "@hammzj/cypress-page-object";
import { FbiCoverUrlPattern } from "../../fixtures/fixture.types";
import { DetailsComponent } from "./components/details";
import { EditionsComponent } from "./components/editions";
import { ReviewsComponent } from "./components/reviews";
import { ReservationModalComponent } from "./components/reservation-modal";
import { FindOnShelfComponent } from "./components/find-on-shelf";
import { RelatedMaterialsComponent } from "./components/related-materials";

export class MaterialPage extends PageObject {
  public elements!: Elements;
  public components!: NestedComponents;

  constructor() {
    super({
      path: "/iframe.html?id=apps-material--default&viewMode=story&type=bog"
    });
    this.elements = {
      // Header elements
      title: () => cy.get(".text-header-h1").scrollIntoView({ duration: 100 }),
      authorText: () =>
        cy
          .getBySel("material-header-author-text")
          .scrollIntoView({ duration: 100 }),

      // Cover and images
      mainCoverImage: () =>
        cy.get(".cover").find("img").scrollIntoView({ duration: 100 }),

      // Buttons
      favouriteButton: () =>
        cy.get(".button-favourite").scrollIntoView({ duration: 100 }),

      favouriteIcon: () =>
        cy.get(".icon-favourite").first().scrollIntoView({ duration: 100 }),

      // Material description and details
      materialDescription: () =>
        cy.getBySel("material-description").scrollIntoView({ duration: 300 }),

      // Series elements
      seriesDescription: (index: number) =>
        cy.getBySel(`material-description-series-${index}`),

      seriesMembers: () =>
        cy
          .getBySel("material-description-series-members")
          .scrollIntoView({ duration: 100 }),

      // Availability labels
      availabilityLabels: () =>
        cy
          .get(".material-header__availability-label")
          .scrollIntoView({ duration: 100 }),

      availabilityLabelType: () =>
        cy
          .get('[data-cy="availability-label-type"]')
          .scrollIntoView({ duration: 100 }),

      availabilityLabelStatus: () =>
        cy
          .get('[data-cy="availability-label-status"]')
          .scrollIntoView({ duration: 100 }),

      // Page fold elements for availability status
      pageFoldEq: (index: number) =>
        cy
          .get('[data-cy="page-fold"]')
          .eq(index)
          .scrollIntoView({ duration: 100 })
    };

    // Add nested components using proper PageObject pattern
    this.addNestedComponents = {
      Details: (fn) =>
        this.performWithin(this.container(), new DetailsComponent(), fn),
      Editions: (fn) =>
        this.performWithin(this.container(), new EditionsComponent(), fn),
      Reviews: (fn) =>
        this.performWithin(this.container(), new ReviewsComponent(), fn),
      ReservationModal: (fn) =>
        this.performWithin(
          this.container(),
          new ReservationModalComponent(),
          fn
        ),
      FindOnShelf: (fn) =>
        this.performWithin(this.container(), new FindOnShelfComponent(), fn),
      RelatedMaterials: (fn) =>
        this.performWithin(
          this.container(),
          new RelatedMaterialsComponent(),
          fn
        )
    };
  }

  // Navigation methods
  visitDefaultMaterial() {
    cy.visit("/iframe.html?id=apps-material--default&viewMode=story&type=bog");
    return this;
  }

  visitInfomediaMaterial() {
    cy.visit(
      "/iframe.html?args=&id=apps-material--infomedia&viewMode=story&type=artikel"
    );
    return this;
  }

  visitMusicMaterial() {
    cy.visit(
      "/iframe.html?args=&id=apps-material--default&viewMode=story&type=musik+(cd)"
    );
    return this;
  }

  // visitPeriodicalMaterial() {
  //   cy.visit(
  //     "/iframe.html?globals=&args=&id=apps-material--periodical&viewMode=story"
  //   );
  //   return this;
  // }

  setupMusicInterceptions() {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/music-fbi-api.json"
    });
    return this;
  }

  // Setup all necessary REST and GraphQL interceptors
  interceptDefaultRest() {
    // Holdings
    cy.interceptRest({
      aliasName: "holdings 1",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=53292968&recordid=52557240&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/1.json"
    });

    cy.interceptRest({
      aliasName: "holdings 2",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=53292968&recordid=52557240&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101006&exclude=FBS-101007&exclude=FBS-101008&exclude=FBS-101009&exclude=FBS-101010&exclude=FBS-101011&exclude=FBS-101012&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/2.json"
    });

    cy.interceptRest({
      aliasName: "holdings 3",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=52557240&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101006&exclude=FBS-101007&exclude=FBS-101008&exclude=FBS-101009&exclude=FBS-101010&exclude=FBS-101011&exclude=FBS-101012&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/3.json"
    });

    cy.interceptRest({
      aliasName: "holdings 4",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=52590302&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101006&exclude=FBS-101007&exclude=FBS-101008&exclude=FBS-101009&exclude=FBS-101010&exclude=FBS-101011&exclude=FBS-101012&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/4.json"
    });

    cy.interceptRest({
      aliasName: "holdings 5",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=52643414&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101006&exclude=FBS-101007&exclude=FBS-101008&exclude=FBS-101009&exclude=FBS-101010&exclude=FBS-101011&exclude=FBS-101012&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/5.json"
    });

    cy.interceptRest({
      aliasName: "holdings 6",
      url: "**/agencyid/catalog/holdingsLogistics/v1?recordid=53292968&exclude=FBS-101002&exclude=FBS-101003&exclude=FBS-101004&exclude=FBS-101007&exclude=FBS-101010&exclude=FBS-101017",
      fixtureFilePath: "material/default/holdings/6.json"
    });

    // Branches
    cy.interceptRest({
      aliasName: "branches",
      url: "**/agencyid/branches",
      fixtureFilePath: "material/branches.json"
    });

    // User
    cy.interceptRest({
      aliasName: "user",
      url: "**/agencyid/patrons/patronid/v4",
      fixtureFilePath: "material/user.json"
    });

    // Availability
    cy.interceptRest({
      aliasName: "Availability",
      url: "**/availability/v3?recordid=**",
      fixtureFilePath: "material/default/availability.json"
    });

    // URL Proxy
    cy.interceptRest({
      aliasName: "UrlProxy",
      url: "**/dpl-url-proxy?url=**",
      fixtureFilePath: "material/dpl-url-proxy.json"
    });

    return this;
  }

  interceptDefaultGraphql() {
    // Get Material
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/default/fbi-api.json"
    });

    // Cover
    cy.interceptGraphql({
      operationName: "GetCoversByPids",
      fixtureFilePath: "cover/cover.json"
    });

    // Work Recommendations
    cy.interceptGraphql({
      operationName: "WorkRecommendations",
      fixtureFilePath: "material/material-grid-related-recommendations.json"
    });

    // Work reviews
    cy.interceptGraphql({
      operationName: "getReviewManifestations",
      fixtureFilePath: "material/reviews.json"
    });

    // Complex Search with Pagination
    cy.interceptGraphql({
      operationName: "complexSearchWithPagination",
      fixtureFilePath:
        "material/material-grid-related-author-recommendations.json"
    });

    return this;
  }

  interceptDefault() {
    // Intercept like button to show it as unfilled
    cy.intercept("HEAD", "**/list/default/**", {
      statusCode: 404
    }).as("Favorite list service");
  }

  interceptInfomediaGraphql() {
    cy.interceptGraphql({
      operationName: "getMaterial",
      fixtureFilePath: "material/infomedia-fbi-api.json"
    });
    return this;
  }

  interceptFavoriteAsFilled() {
    // Intercept like button to show it as filled
    cy.intercept("PUT", "**/list/default/**", {
      statusCode: 200
    }).as("Favorite list service");
    return this;
  }

  // Assertion methods

  scrollToToMaterialTDescription() {
    this.elements.materialDescription();
    return this;
  }

  shouldHaveCoverWithSource() {
    this.elements
      .mainCoverImage()
      .should("have.attr", "src")
      .and("match", FbiCoverUrlPattern);
    return this;
  }

  shouldShowAvailabilityStatus(materialType: string, status: string) {
    this.elements
      .availabilityLabels()
      .find('[data-cy="availability-label-type"]')
      .contains(materialType)
      .parent()
      .find('[data-cy="availability-label-status"]')
      .should("have.text", status);
    return this;
  }
}
