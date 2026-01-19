import { ComponentObject } from "@hammzj/cypress-page-object";

export class RadioButtonGroupComponent extends ComponentObject {
  constructor(containerSelector: string) {
    super(() => cy.get(containerSelector));

    this.addElements = {
      radioButtons: () => this.container().find("input[type='radio']"),
      labels: () => this.container().find("label")
    };
  }

  /**
   * Select a radio button by its value
   */
  selectByValue(value: string) {
    this.container()
      .find(`input[type='radio'][value='${value}']`)
      .check({ force: true });
  }

  /**
   * Select a radio button by its label text
   */
  selectByLabel(labelText: string) {
    this.container().contains("label", labelText).click();
  }

  /**
   * Get the currently selected radio button value
   */
  getSelectedValue() {
    return this.container().find("input[type='radio']:checked").invoke("val");
  }

  // Verification methods

  /**
   * Verify the radio button group is visible
   */
  verifyIsVisible() {
    this.container().should("be.visible");
  }

  /**
   * Verify a specific radio button is selected by value
   */
  verifyValueIsSelected(value: string) {
    this.container()
      .find(`input[type='radio'][value='${value}']`)
      .should("be.checked");
  }

  /**
   * Verify a specific radio button is selected by label text
   */
  verifyLabelIsSelected(labelText: string) {
    this.container()
      .contains("label", labelText)
      .find("input[type='radio']")
      .should("be.checked");
  }

  /**
   * Verify a specific radio button is not selected by value
   */
  verifyValueIsNotSelected(value: string) {
    this.container()
      .find(`input[type='radio'][value='${value}']`)
      .should("not.be.checked");
  }

  /**
   * Verify the number of radio buttons in the group
   */
  verifyRadioButtonCount(count: number) {
    this.elements.radioButtons().should("have.length", count);
  }

  /**
   * Verify a radio button with specific value exists
   */
  verifyValueExists(value: string) {
    this.container()
      .find(`input[type='radio'][value='${value}']`)
      .should("exist");
  }

  /**
   * Verify a radio button is enabled
   */
  verifyValueIsEnabled(value: string) {
    this.container()
      .find(`input[type='radio'][value='${value}']`)
      .should("not.be.disabled");
  }

  /**
   * Verify a radio button is disabled
   */
  verifyValueIsDisabled(value: string) {
    this.container()
      .find(`input[type='radio'][value='${value}']`)
      .should("be.disabled");
  }
}
