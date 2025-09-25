export const argTypes = {
  zeroHitsSearchLinkConfig: {
    description: "Link to redirect to when search has zero hits",
    control: { type: "text" }
  }
};

export default {
  zeroHitsSearchLinkConfig: "/din-sogning-har-0-resultater"
};

export interface ZeroHitsSearchLinkArgs {
  zeroHitsSearchLinkConfig: string;
}
