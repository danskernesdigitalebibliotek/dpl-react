import { afterEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import {
  UseNotificationOptionsType,
  useNotificationMessage
} from "../../core/utils/useNotificationMessage";

// Define a test component that utilizes the useNotificationMessage hook
const ComponentWithNotificationMessage = ({
  timeout,
  scrollToTop
}: UseNotificationOptionsType) => {
  const [NotificationMessage, handler] = useNotificationMessage({
    timeout,
    scrollToTop
  });

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

  it("should not display a message before the button is clicked", () => {
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

  it("should display a message after button activation with default timeout and scrollToTop settings initialized", () => {
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
            src="/@fs/Users/lassestausgaard/projects/dpl-dapple/design-system/build/icons/basic/icon-info.svg"
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

  it("should keep displaying a message indefinitely if timeout is removed", () => {
    vi.spyOn(window, "setTimeout");

    const { getByTestId } = render(
      <ComponentWithNotificationMessage timeout={0} />
    );
    const button = getByTestId("button");

    // Simulate button click
    fireEvent.click(button);

    // Expectations
    expect(window.setTimeout).not.toHaveBeenCalled(); // Expect setTimeout to not be called
    expect(screen.queryByText(/Some message/)).toBeTruthy(); // Expect the message to be displayed indefinitely
  });

  it("should not scroll to top if scrollToTop is false", () => {
    vi.spyOn(window, "scrollTo");

    const { getByTestId } = render(
      <ComponentWithNotificationMessage scrollToTop={false} />
    );
    const button = getByTestId("button");

    // Simulate button click
    fireEvent.click(button);

    // Expectations
    expect(window.scrollTo).not.toHaveBeenCalled(); // Expect page to not scroll to top
    expect(screen.queryByText(/Some message/)).toBeTruthy(); // Expect the message to be displayed
  });
});
