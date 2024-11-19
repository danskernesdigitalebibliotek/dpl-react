import { HoldingsLogisticsV1 } from "../../core/fbs/model";

export const getLocationArray = (
  holdingsLogistics: HoldingsLogisticsV1
): string[] => {
  const { logisticsPlacement, lmsPlacement } = holdingsLogistics;

  if (logisticsPlacement?.length) {
    return (
      logisticsPlacement
        // Remove the first element, which is always the library name
        .slice(1)
        .filter((item): item is string => Boolean(item))
    );
  }

  if (lmsPlacement) {
    const { department, location, sublocation } = lmsPlacement;
    return [department?.title, location?.title, sublocation?.title].filter(
      (item): item is string => Boolean(item)
    );
  }

  return [];
};

export const getFindOnShelfLocationText = (
  locationArray: (string | undefined)[],
  author: string
) => {
  return `${locationArray.join(" · ")}${
    author && author !== "undefined" ? ` · ${author}` : ""
  }`;
};

export default {};
