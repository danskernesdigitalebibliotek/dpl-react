import { useConfig } from "./config";

export type TBranch = {
  branchId: string;
  title: string;
  location?: {
    lat: string;
    lng: string;
    value: string;
    address: string;
    city: string;
  };
};

export const excludeBlacklistedBranches = (
  branches: TBranch[],
  blacklist: string[]
): TBranch[] => {
  return branches.filter((item) => !blacklist.includes(item.branchId));
};

export const cleanBranchesId = (branches: TBranch[]): string[] => {
  return (
    branches
      .map((branch) => {
        // Filtering on branchId, only uses agency number for example "775100" and not ISIL "DK-775100"
        // So we need to filter on the digits after the -
        const pattern = /-(\d*)/g;
        const matches = pattern.exec(branch.branchId);
        return matches ? matches[1] : "";
      })
      // Remove empty strings
      .filter((item) => item)
  );
};

export const useGetBranches = (key: string): TBranch[] => {
  const config = useConfig();
  const branches = config<TBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const blacklistBranches = config(key, {
    transformer: "stringToArray"
  });
  const whitelistBranches = excludeBlacklistedBranches(
    branches,
    blacklistBranches
  );
  return whitelistBranches;
};

const useGetSearchBranches = () => {
  const branches = useGetBranches("blacklistedSearchBranchesConfig");
  const cleanBranches = cleanBranchesId(branches);
  return cleanBranches;
};

export default useGetSearchBranches;
