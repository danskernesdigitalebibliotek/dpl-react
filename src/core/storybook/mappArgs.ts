export const argTypes = {
  mappDomainConfig: {
    description: "Mapp domain (Empty string to not activate Mapp)",
    control: { type: "text" }
  },
  mappIdConfig: {
    description: "Mapp id (Empty string to not activate Mapp)",
    control: { type: "text" }
  }
};

export default {
  mappDomainConfig: "",
  mappIdConfig: ""
};

export interface MappArgs {
  mappDomainConfig: string;
  mappIdConfig: string;
}
