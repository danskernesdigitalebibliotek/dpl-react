import { describe, expect, it } from "vitest";
import { getAllSubjects } from "../../apps/material/helper";
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

describe("getAllSubjects", () => {
  it("returns DBC-verified subjects first when no agency IDs configured", () => {
    const result = getAllSubjects({
      subjects: workSubjects,
      manifestations,
      agencyIds: []
    });

    expect(result).toEqual(["familien", "identitet", "arv"]);
  });

  it("includes local agency subjects after work subjects", () => {
    const result = getAllSubjects({
      subjects: workSubjects,
      manifestations,
      agencyIds: ["762100-katalog"]
    });

    expect(result).toEqual([
      "familien",
      "identitet",
      "arv",
      "DR Romanklub 2024/2025"
    ]);
  });

  it("includes subjects from multiple agencies", () => {
    const result = getAllSubjects({
      subjects: workSubjects,
      manifestations,
      agencyIds: ["762100-katalog", "911116-katalog"]
    });

    expect(result).toEqual([
      "familien",
      "identitet",
      "arv",
      "DR Romanklub 2024/2025",
      "færøsk emne"
    ]);
  });

  it("deduplicates subjects across work and agency manifestations", () => {
    const result = getAllSubjects({
      subjects: workSubjects,
      manifestations,
      agencyIds: ["762100-katalog"]
    });

    // "familien" exists in both work subjects and the 762100 manifestation
    // but should only appear once
    expect(result.filter((s) => s === "familien")).toHaveLength(1);
  });

  it("does not include subjects from non-matching agencies", () => {
    const result = getAllSubjects({
      subjects: workSubjects,
      manifestations,
      agencyIds: ["999999-katalog"]
    });

    expect(result).toEqual(["familien", "identitet", "arv"]);
  });
});
