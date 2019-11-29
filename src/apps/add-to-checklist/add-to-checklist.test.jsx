import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddToChecklistEntry from "./add-to-checklist.entry";

test("see success message", () => {
  const { queryByText } = render(
    <AddToChecklistEntry text="klik" id="870970-basis:54172613" />
  );

  fireEvent.click(queryByText("klik"));
  expect(queryByText("Tilføjet")).toBeDefined();
});
