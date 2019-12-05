import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddToChecklistEntry from "./add-to-checklist.entry";

test("see success message", () => {
  const { queryByText } = render(
    <AddToChecklistEntry
      id="870970-basis:54172613"
      text="klik"
      errorText="This is an error"
      successText="What a success"
    />
  );

  fireEvent.click(queryByText("klik"));
  expect(queryByText("What a success")).toBeInTheDocument();
});
