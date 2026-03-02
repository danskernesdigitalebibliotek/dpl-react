import { describe, expect, it } from "vitest";
import {
  getDbcVerifiedSubjectsFirst,
  getLocalAgencySubjects
} from "../../apps/material/helper";
import { Work } from "../../core/utils/types/entities";
import { Pid } from "../../core/utils/types/ids";

const workSubjects: Work["subjects"] = {
  dbcVerified: [
    { display: "familien", __typename: "SubjectText" },
    { display: "identitet", __typename: "SubjectText" }
  ],
  all: [
    { display: "familien", __typename: "SubjectText" },
    { display: "identitet", __typename: "SubjectText" },
    { display: "arv", __typename: "SubjectText" }
  ]
};

const manifestations = [
  {
    pid: "870970-basis:139082699" as Pid,
    subjects: {
      all: [{ display: "familien" }, { display: "identitet" }]
    }
  },
  {
    pid: "762100-katalog:139939085" as Pid,
    subjects: {
      all: [{ display: "familien" }, { display: "DR Romanklub 2024/2025" }]
    }
  },
  {
    pid: "911116-katalog:99122572" as Pid,
    subjects: {
      all: [{ display: "færøsk emne" }]
    }
  }
];

describe("getDbcVerifiedSubjectsFirst", () => {
  it("returns DBC-verified subjects before other subjects", () => {
    const result = getDbcVerifiedSubjectsFirst(workSubjects);

    expect(result).toEqual(["familien", "identitet", "arv"]);
  });

  it("deduplicates subjects that appear in both dbcVerified and all", () => {
    const result = getDbcVerifiedSubjectsFirst(workSubjects);

    expect(result.filter((s) => s === "familien")).toHaveLength(1);
  });
});

describe("getLocalAgencySubjects", () => {
  it("returns empty array when no agency IDs configured", () => {
    const result = getLocalAgencySubjects(manifestations, []);

    expect(result).toEqual([]);
  });

  it("returns subjects from matching agency manifestations", () => {
    const result = getLocalAgencySubjects(manifestations, ["762100-katalog"]);

    expect(result).toEqual(["familien", "DR Romanklub 2024/2025"]);
  });

  it("returns subjects from multiple agencies", () => {
    const result = getLocalAgencySubjects(manifestations, [
      "762100-katalog",
      "911116-katalog"
    ]);

    expect(result).toEqual([
      "familien",
      "DR Romanklub 2024/2025",
      "færøsk emne"
    ]);
  });

  it("does not include subjects from non-matching agencies", () => {
    const result = getLocalAgencySubjects(manifestations, ["999999-katalog"]);

    expect(result).toEqual([]);
  });
});
