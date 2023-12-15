export default {
  alertErrorCloseText: {
    name: "Alert error close text",
    defaultValue: "close",
    control: { type: "text" }
  },
  alertErrorMessageText: {
    name: "Alert error message text",
    defaultValue: "An error occurred",
    control: { type: "text" }
  }
};

export interface GlobalEntryTextProps {
  alertErrorCloseText: string;
  alertErrorMessageText: string;
}
