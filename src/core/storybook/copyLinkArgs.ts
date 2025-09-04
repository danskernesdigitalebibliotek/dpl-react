export const argTypes = {
  copyLinkDefaultText: {
    description: "Copy link default button text",
    control: { type: "text" }
  },
  copyLinkSuccessText: {
    description: "Copy link success button text",
    control: { type: "text" }
  },
  copyLinkToEditionText: {
    description: "Copy link to edition button text",
    control: { type: "text" }
  }
};

export default {
  copyLinkDefaultText: "Kopiér link",
  copyLinkSuccessText: "Link kopieret",
  copyLinkToEditionText: "Kopiér link til udgave"
};

export interface CopyLinkArgs {
  copyLinkDefaultText: string;
  copyLinkSuccessText: string;
  copyLinkToEditionText: string;
}
