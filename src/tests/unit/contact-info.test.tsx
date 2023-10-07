import { describe, expect, it } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { configure } from "@testing-library/dom";
import ContactInfoInputs from "../../components/contact-info-section/ContactInfoInputs";

configure({
  testIdAttribute: "data-cy"
});

describe("ContactInfoInputs", () => {
  it("Should wrap the input fields if it is inline", async () => {
    const { getByTestId } = render(
      <ContactInfoInputs isInline>
        <p>One input component</p>
        <p>Another input component</p>
      </ContactInfoInputs>
    );

    const contactInfoInputs = getByTestId("contact-info-input");

    expect(contactInfoInputs).toMatchSnapshot();
  });
  it("Should NOT wrap the input fields if it is NOT inline", async () => {
    const { getByTestId } = render(
      <ContactInfoInputs dataCy="contact-info-input-inline" isInline={false}>
        <p>One input component</p>
        <p>Another input component</p>
      </ContactInfoInputs>
    );

    const contactInfoInputs = getByTestId("contact-info-input-inline");

    expect(contactInfoInputs).toMatchSnapshot();
  });
});
