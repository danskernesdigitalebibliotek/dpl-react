export const argTypes = {
  pincodeLengthMinConfig: {
    description: "Number of search result items on desktop",
    control: { type: "number" },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: "5" }
    }
  },
  pincodeLengthMaxConfig: {
    description: "Number of search result items on desktop",
    control: { type: "number" },
    table: {
      type: { summary: "number" },
      defaultValue: { summary: "5" }
    }
  }
};

export default {
  pincodeLengthMinConfig: "4",
  pincodeLengthMaxConfig: "5"
};
