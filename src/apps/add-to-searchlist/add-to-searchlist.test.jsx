import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddToSearchlistEntry from "./add-to-searchlist.entry";

test("Addition to list without token", async () => {
  const { queryByText, queryByLabelText } = render(
    <AddToSearchlistEntry
      searchQuery="star wars"
      buttonText="Tilføj til mine søgninger"
      successText="Tilføjet til dine gemte søgninger."
      errorText="Det gik galt."
      successLink="/?path=/story/apps-searchlist--entry"
      successLinkText="Se dine gemte søgnigner."
      labelText="Søgetitel"
      addButtonText="Gem"
    />
  );
  fireEvent.click(queryByText("Tilføj til mine søgninger"));
  fireEvent.change(queryByLabelText("Søgetitel"), {
    target: { value: "Husk den her" }
  });
  await fireEvent.click(queryByText("Gem"));
  await wait(() => queryByText("Det gik galt."));
  expect(queryByText("Det gik galt.")).toBeInTheDocument();
});
