import { expect, test } from "vitest";
import {
  consolidatedHoldings,
  getInstantLoanBranchHoldings
} from "../../components/reservation/helper";
import vitestData from "./__vitest_data__/instant-loan";

test("getInstantLoanBranchHoldings should return materials grouped by branches filtered by instantloan config matches and branch whitelist", () => {
  const { branchHoldings, whitelist } = vitestData;
  const instantLoanStrings = [
    "I am supposed to be matched",
    "I am also supposed to be matched"
  ];

  const result = getInstantLoanBranchHoldings(
    branchHoldings,
    whitelist,
    instantLoanStrings
  );

  // There is supposed to be three branches in the result.
  expect(result).toHaveLength(3);

  // Åby is matched with 1 material out of 3.
  // The material is matched because it is available
  // and contains the string "I am supposed to be matched".
  expect(result[0].branch.title).toBe("Åby");
  expect(result[0].materials).toHaveLength(2);
  expect(result[0].materials[0].available).toBe(true);
  expect(result[0].materials[0].materialGroup.name).toBe(
    "I am supposed to be matched"
  );

  // Sabro is matched with 1 material out of 3.
  // The material is matched because it is available
  // and contains the string "I am supposed to be matched".
  // Although there is another material that matches the same string
  // it is not a part of the result because it is not available.
  expect(result[1].branch.title).toBe("Sabro");
  expect(result[1].materials).toHaveLength(1);
  expect(result[1].materials[0].available).toBe(true);
  expect(result[1].materials[0].materialGroup.name).toBe(
    "I am supposed to be matched"
  );

  // Hasle is matched with 2 materials out of 2.
  // The materials are matched because they both are available
  // and contain the strings "I am supposed to be matched"
  // and "I am also supposed to be matched".
  expect(result[2].branch.title).toBe("Hasle");
  expect(result[2].materials).toHaveLength(2);
  expect(result[2].materials[0].available).toBe(true);
  expect(result[2].materials[0].materialGroup.name).toBe(
    "I am supposed to be matched"
  );
  expect(result[2].materials[1].available).toBe(true);
  expect(result[2].materials[1].materialGroup.name).toBe(
    "I am also supposed to be matched"
  );
});

test("consolidatedHoldings should consolidate branches and their materials", () => {
  const { branchHoldings } = vitestData;

  // Before doing anything
  // we have 5 branches in the holdings but one is repeated
  // and therefor we have 6 entries.
  expect(branchHoldings).toHaveLength(6);
  expect(branchHoldings[0].branch.title).toBe("Åby");
  expect(branchHoldings[1].branch.title).toBe("Sabro");
  expect(branchHoldings[2].branch.title).toBe("Hasle");
  expect(branchHoldings[3].branch.title).toBe("Hjortshøj");
  expect(branchHoldings[4].branch.title).toBe("Andeby");
  expect(branchHoldings[5].branch.title).toBe("Åby");

  // One has 3 materials.
  expect(branchHoldings[0].materials).toHaveLength(3);
  // The other has 1 material.
  expect(branchHoldings[5].materials).toHaveLength(1);

  const result = consolidatedHoldings(branchHoldings);

  // After consolidating the holding contain just one instance of Åby
  expect(result).toHaveLength(5);
  expect(result[0].branch.title).toBe("Åby");
  expect(result[1].branch.title).toBe("Sabro");
  expect(result[2].branch.title).toBe("Hasle");
  expect(result[3].branch.title).toBe("Hjortshøj");
  expect(result[4].branch.title).toBe("Andeby");
  // With all the materials...
  expect(result[0].materials).toHaveLength(4);
});
