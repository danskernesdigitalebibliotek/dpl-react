import { afterEach, test, expect, vi } from "vitest";
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { configure } from "@testing-library/dom";
import * as linkTracking from "../../components/atoms/links/handleTracking";
import Link from "../../components/atoms/links/Link";

configure({
  testIdAttribute: "data-cy"
});

// Used for testing tracking callback.
const fakeTrackClick = () =>
  new Promise((resolve) => {
    resolve("done");
  });
const fakeUrl = new URL("http://google.com");

test("Should track when tracking callback is present and user clicks", async () => {
  const handleTrackingSpy = vi
    .spyOn(linkTracking, "handleTracking")
    .mockImplementation(({ e: { type } }) => type);

  const { getByTestId } = render(
    <Link dataCy="link" href={fakeUrl} trackClick={fakeTrackClick}>
      A link
    </Link>
  );

  const link = getByTestId("link");
  fireEvent.click(link);

  expect(handleTrackingSpy).toHaveBeenCalledTimes(1);
  expect(handleTrackingSpy).toHaveReturnedWith("click");
});

test("Should track when tracking callback is present and user presses Enter", async () => {
  const handleTrackingSpy = vi
    .spyOn(linkTracking, "handleTracking")
    .mockImplementation(({ e: { type } }) => type);

  const { getByTestId } = render(
    <Link dataCy="link" href={fakeUrl} trackClick={fakeTrackClick}>
      A link
    </Link>
  );

  const link = getByTestId("link");
  fireEvent.keyUp(link, { key: "Enter", code: "Enter" });

  // If user presses Enter there should be tracking.
  expect(handleTrackingSpy).toHaveReturnedWith("keyup");
  expect(handleTrackingSpy).toHaveBeenCalledTimes(1);

  // If user presses something else than Enter, then there should be no tracking.
  fireEvent.keyUp(link, { key: "A", code: "KeyA" });
  expect(handleTrackingSpy).toHaveBeenCalledTimes(1);
});

test("Should NOT track when tracking callback is NOT present and user clicks or presses Enter", async () => {
  const handleTrackingSpy = vi
    .spyOn(linkTracking, "handleTracking")
    .mockImplementation(({ e: { type } }) => type);

  const { getByTestId } = render(
    <Link dataCy="link" href={fakeUrl}>
      A link
    </Link>
  );

  const link = getByTestId("link");
  fireEvent.click(link);
  fireEvent.keyUp(link, { key: "Enter", code: "Enter" });

  expect(handleTrackingSpy).toHaveBeenCalledTimes(0);
});

afterEach(cleanup);
