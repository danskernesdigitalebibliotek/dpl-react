import { MaterialPage } from "../../../cypress/pages/material";

describe("Material", () => {
  let materialPage: MaterialPage;

  beforeEach(() => {
    materialPage = new MaterialPage();

    // Setup all the necessary interceptors using the page object
    materialPage
      .interceptDefaultRest()
      .interceptDefaultGraphql()
      .interceptDefault();
  });

  it("Renders a title", () => {
    materialPage
      .visitDefaultMaterial()
      .shouldHaveTitle("De syv søstre : Maias historie");
  });

  it("Renders a cover with a source", () => {
    materialPage.visitDefaultMaterial().shouldHaveCoverWithSource();
  });

  it("Renders favorite buttons", () => {
    materialPage
      .visitDefaultMaterial()
      .shouldHaveFavouriteButton(
        "Add De syv søstre : Maias historie to favorites list"
      );
  });

  it("Renders series horizontal lines", () => {
    materialPage
      .visitDefaultMaterial()
      .shouldHaveSeriesDescription(0, "Del 1  in seriesDe syv søstre-serien");
  });

  it("Renders only first 3 horizontal lines items", () => {
    materialPage.shouldHaveSeriesMembersCount(3);
  });

  it("Renders additional horizontal lines items after button click", () => {
    materialPage.clickSeriesMembersButton().shouldHaveSeriesMembersCount(8);
  });

  it("Renders authors", () => {
    materialPage.visitDefaultMaterial().shouldHaveAuthor("Lucinda Riley");
  });

  it("Renders exactly 1 availability label per material type", () => {
    materialPage
      .visitDefaultMaterial()
      .shouldHaveAvailabilityLabelForType("bog");
  });

  it("Shows the book availability as available", () => {
    materialPage
      .visitDefaultMaterial()
      .shouldShowAvailabilityStatus("bog", "Available");
  });

  it("Can open material details", () => {
    materialPage.visitDefaultMaterial().openMaterialDetails();
  });

  it("Renders the correct details for books", () => {
    materialPage
      .visitDefaultMaterial()
      .verifyMainMaterialDetails()
      .openMaterialEditions()
      .expandFirstManifestationDetails()
      .verifyManifestationDetails();
  });

  it("Renders the correct details for infomedia", () => {
    materialPage
      .setupInfomediaInterceptions()
      .visitInfomediaMaterial()
      .verifyInfomediaDetails();
  });

  it("Renders the correct details for music", () => {
    materialPage
      .setupMusicInterceptions()
      .visitMusicMaterial()
      .verifyMusicDetails();
  });

  it("Renders editions with a reservation button", () => {
    materialPage
      .visitDefaultMaterial()
      .openMaterialEditions()
      .shouldHaveEditionsWithReserveButton();
  });

  it("Opens modal by clicking on reservation button and closes it with the x button", () => {
    cy.createFakeAuthenticatedSession();

    materialPage
      .visitDefaultMaterial()
      .clickReserveButton()
      .shouldShowReservationModal()
      .closeModalWithX();
  });

  it("Can open reservation modal, approve a reservation, and close the modal using buttons", () => {
    cy.createFakeAuthenticatedSession();

    materialPage
      .visitDefaultMaterial()
      .clickReserveButton()
      .submitReservation()
      .shouldShowReservationSuccess()
      .closeReservationSuccess();
  });

  it("Renders reviews", () => {
    materialPage

      .setupReviewsInterceptions()
      .visitDefaultMaterial()
      .openMaterialReviews()
      .shouldShowReviews("Dorthe Marlene Jørgensen, 2016");
  });

  it("Has a selected availability label based on url parameter", () => {
    materialPage
      .visitDefaultMaterial()
      .shouldHaveSelectedAvailabilityLabel("bog");
  });

  it("Does not have selected availability labels which does not match url parameter", () => {
    materialPage
      .visitDefaultMaterial()
      .shouldNotHaveSelectedAvailabilityLabel("lydbog");
  });

  it("Can favorite a material", () => {
    materialPage.interceptFavoriteAsFilled();
    cy.createFakeAuthenticatedSession();

    materialPage
      .visitDefaultMaterial()
      .shouldShowFavoriteAsUnfilled()
      .clickFavouriteButton()
      .shouldShowFavoriteAsFilled();
  });

  it("Displays 8 recommended materials in the related grid", () => {
    materialPage.visitDefaultMaterial().shouldHaveRelatedMaterialsCount(8);
  });

  it("Renders 3 filter buttons and can click author and series filters", () => {
    materialPage
      .visitDefaultMaterial()
      .shouldHaveFilterButtonsCount(3)
      .clickAuthorFilter()
      .clickSeriesFilter();
  });
});

export default {};
