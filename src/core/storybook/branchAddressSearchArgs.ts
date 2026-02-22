export const argTypes = {
  branchAddressSearchEnabledConfig: {
    description: "Enable address search",
    control: { type: "text" }
  }
};

export default {
  branchAddressSearchEnabledConfig: "1"
};

export interface BranchAddressSearchArgs {
  branchAddressSearchEnabledConfig: string;
}
