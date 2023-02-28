import {
  ManifestationsSimpleFieldsFragment,
  WorkMediumFragment
} from "../../dbc-gateway/generated/graphql";
import { Pid, WorkId } from "./ids";

export type Manifestation = Omit<ManifestationsSimpleFieldsFragment, "pid"> & {
  pid: Pid;
};
export type Work = Omit<WorkMediumFragment, "workId" | "manifestations"> & {
  workId: WorkId;
  manifestations: {
    all: Manifestation[];
    first: Manifestation;
    latest: Manifestation;
    bestRepresentation: Manifestation;
  };
};
