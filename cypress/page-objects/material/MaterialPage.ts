import {
  PageObject,
  Elements,
  NestedComponents
} from "@hammzj/cypress-page-object";
import { EditionsComponent } from "./components/editions";
import { FindOnShelfComponent } from "./components/find-on-shelf";

export class MaterialPage extends PageObject {
  public elements!: Elements;
  public components!: NestedComponents;

  constructor(materialType: string = "bog") {
    super({
      path: `/iframe.html?id=apps-material--default&viewMode=story&type=${materialType}`
    });
    this.elements = {
      title: () => cy.get(".text-header-h1")
    };

    this.addElements = {
      // Get all availability labels in the material header
      // First scroll into view to activate lazy loading, then get the labels
      headerAvailabilityLabels: () => {
        cy.get("[data-cy='material-header-content']").scrollIntoView();
        return cy.get(
          ".material-header__availability-label .availability-label"
        );
      }
    };

    this.addNestedComponents = {
      Editions: (fn) =>
        this.performWithin(this.container(), new EditionsComponent(), fn),
      FindOnShelf: (fn) =>
        this.performWithin(this.container(), new FindOnShelfComponent(), fn)
    };
  }

  getHeaderAvailabilityLabel(labelIndex: number) {
    // Scroll into view first, then get the specific label
    cy.get("[data-cy='material-header-content']").scrollIntoView();
    return cy
      .get(".material-header__availability-label .availability-label")
      .eq(labelIndex);
  }
}
