export const getFindOnShelfLocationText = (
  locationArray: (string | undefined)[],
  author: string
) => {
  return `${locationArray.join(" · ")}${
    author && author !== "undefined" ? ` · ${author}` : ""
  }`;
};

export default {};
