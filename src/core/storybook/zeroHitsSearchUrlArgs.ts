export const argTypes = {
  zeroHitsSearchUrl: {
    description: "URL to redirect to when search has zero hits",
    control: { type: "text" }
  }
};

export default {
  zeroHitsSearchUrl: "/din-sogning-har-0-resultater"
};

export interface ZeroHitsSearchUrlArgs {
  zeroHitsSearchUrl: string;
}
