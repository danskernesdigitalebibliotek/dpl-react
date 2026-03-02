export const argTypes = {
  dataforsyningenTokenConfig: {
    description: "Dataforsyningen API token",
    control: { type: "text" }
  }
};

export default {
  dataforsyningenTokenConfig: process.env.STORYBOOK_DATAFORSYNINGEN || ""
};

export interface DataforsyningenArgs {
  dataforsyningenTokenConfig: string;
}
