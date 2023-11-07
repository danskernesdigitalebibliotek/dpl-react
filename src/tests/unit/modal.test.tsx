import React from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import modalReducer from "../../core/modal.slice";
import Modal, { useModalButtonHandler } from "../../core/utils/modal";

const store = configureStore({
  reducer: combineReducers({
    modal: modalReducer
  })
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}> {children} </Provider>
);

const ComponentWithModals = () => {
  const modalId1 = "modal-1";
  const modalId2 = "modal-2";
  const modalId3 = "modal-3";
  const { closeAll, open, close } = useModalButtonHandler();

  return (
    <div data-testid="wrapper">
      <button type="button" onClick={() => open(modalId1)}>
        Open modal 1
      </button>
      <Modal
        modalId={modalId1}
        classNames="modal-cta"
        closeModalAriaLabelText="Close modal 1"
        screenReaderModalDescriptionText="Modal 1"
        data-testid="modal-1"
      >
        Modal 1
        <button type="button" onClick={() => open(modalId2)}>
          Open modal 2
        </button>
      </Modal>
      <Modal
        modalId={modalId2}
        classNames="modal-cta"
        closeModalAriaLabelText="Close modal 2"
        screenReaderModalDescriptionText="Modal 2"
        data-testid="modal-2"
      >
        Modal 2
        <button type="button" onClick={() => open(modalId3)}>
          Open modal 3
        </button>
        <button type="button" onClick={() => closeAll()}>
          Close all
        </button>
      </Modal>
      <Modal
        modalId={modalId3}
        classNames="modal-cta"
        closeModalAriaLabelText="Close modal 3"
        screenReaderModalDescriptionText="Modal 3"
        data-testid="modal-3"
      >
        Modal 3
        <button type="button" onClick={() => close(modalId3)}>
          Close this
        </button>
      </Modal>
    </div>
  );
};

describe("modal", () => {
  afterEach(() => {
    cleanup();
  });

  it("should not display a modal before the button is clicked", () => {
    const { getByTestId } = render(<ComponentWithModals />, {
      wrapper: Wrapper
    });
    const wrapper = getByTestId("wrapper");

    // Expectations before the button is clicked
    expect(screen.queryByText(/Modal 1/)).toBeNull(); // Expect the modal to not be displayed

    // Assert that the wrapper does not contain the modal initially
    expect(wrapper).toMatchInlineSnapshot(`
      <div
        data-testid="wrapper"
      >
        <button
          type="button"
        >
          Open modal 1
        </button>
      </div>
    `);
  });

  it("should display modal 1 after button activation", () => {
    const { container } = render(<ComponentWithModals />, {
      wrapper: Wrapper
    });
    const button = screen.getByText("Open modal 1");

    // Click the button
    fireEvent.click(button);

    // Expect the modal to be displayed
    expect(container.querySelector("#modal-modal-1-description")).toBeTruthy();
  });

  it("should display modal 2 after closing modal 3", () => {
    const { container } = render(<ComponentWithModals />, {
      wrapper: Wrapper
    });
    const button = screen.getByText("Open modal 1");

    // Click the button in page
    fireEvent.click(button);

    // Expect modal 1 to be displayed
    expect(container.querySelector("#modal-modal-1-description")).toBeTruthy();

    // Click the button inside modal 1
    fireEvent.click(screen.getByText("Open modal 2"));

    // Expect modal 2 to be displayed
    expect(container.querySelector("#modal-modal-2-description")).toBeTruthy();

    // Click the button inside modal 2
    fireEvent.click(screen.getByText("Open modal 3"));

    // Expect modal 3 to be displayed
    expect(container.querySelector("#modal-modal-3-description")).toBeTruthy();

    // Click close button in modal 3
    fireEvent.click(screen.getByText("Close this"));

    // Expect modal 2 to be displayed
    expect(container.querySelector("#modal-modal-2-description")).toBeTruthy();
  });

  it("should close all modals after clicking close all button", () => {
    const { container } = render(<ComponentWithModals />, {
      wrapper: Wrapper
    });
    const button = screen.getByText("Open modal 1");

    // Click the button in page
    fireEvent.click(button);

    // Expect modal 1 to be displayed
    expect(container.querySelector("#modal-modal-1-description")).toBeTruthy();

    // Click the button inside modal 1
    fireEvent.click(screen.getByText("Open modal 2"));

    // Expect modal 2 to be displayed
    expect(container.querySelector("#modal-modal-2-description")).toBeTruthy();

    // Close all modals
    fireEvent.click(screen.getByText("Close all"));

    // Expect no modals to be displayed
    expect(container.querySelector("#modal-modal-1-description")).toBeNull();
  });
});
