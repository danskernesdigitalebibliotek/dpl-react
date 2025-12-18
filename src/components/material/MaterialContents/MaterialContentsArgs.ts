export const argTypes = {
  materialContentsShowLessText: {
    description: "Text for show less button",
    control: { type: "text" }
  },
  materialContentsShowAllText: {
    description: "Text for show all button with count placeholder",
    control: { type: "text" }
  }
};

export default {
  materialContentsShowLessText: "Show less",
  materialContentsShowAllText: "Show all (@count)"
};

export interface MaterialContentsArgs {
  materialContentsShowLessText: string;
  materialContentsShowAllText: string;
}
