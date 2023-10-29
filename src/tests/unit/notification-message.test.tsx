import { afterEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useNotificationMessage } from "../../core/utils/useNotificationMessage";

// Define a test component that utilizes the useNotificationMessage hook
const ComponentWithNotificationMessage = () => {
  const [NotificationMessage, handler] = useNotificationMessage();

  return (
    <div data-testid="wrapper">
      <NotificationMessage />
      <button
        data-testid="button"
        type="button"
        onClick={() => handler("Some message")}
      >
        Click me
      </button>
    </div>
  );
};

describe("useNotificationMessage hook", () => {
  afterEach(() => {
    cleanup();
  });

  it("should not display a message before the button is clicked", async () => {
    const { getByTestId } = render(<ComponentWithNotificationMessage />);
    const wrapper = getByTestId("wrapper");

    // Expectations before the button is clicked
    expect(screen.queryByText(/Some message/)).toBeNull(); // Expect the message to not be displayed

    // Assert that the wrapper does not contain the message initially
    expect(wrapper).toMatchInlineSnapshot(`
      <div
        data-testid="wrapper"
      >
        <button
          data-testid="button"
          type="button"
        >
          Click me
        </button>
      </div>
    `);
  });

  it("should display a message after the button is clicked", async () => {
    vi.spyOn(window, "scrollTo");
    vi.spyOn(window, "setTimeout");

    const { getByTestId } = render(<ComponentWithNotificationMessage />);
    const wrapper = getByTestId("wrapper");
    const button = getByTestId("button");

    // Simulate button click
    fireEvent.click(button);

    // Expectations after the button is clicked
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0); // Expect page to scroll to top
    expect(window.setTimeout).toHaveBeenCalledTimes(1); // Expect setTimeout to be called once
    expect(screen.queryByText(/Some message/)).toBeTruthy(); // Expect the message to be displayed

    // Assert final state of the wrapper
    expect(wrapper).toMatchInlineSnapshot(`
      <div
        data-testid="wrapper"
      >
        <section
          class="promo-bar"
        >
          <img
            alt=""
            class="ml-4"
            src="/node_modules/@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-info.svg"
          />
          <p
            class="text-small-caption"
          >
            Some message
          </p>
        </section>
        <button
          data-testid="button"
          type="button"
        >
          Click me
        </button>
      </div>
    `);
  });
});
