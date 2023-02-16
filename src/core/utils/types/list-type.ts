import { FaustId } from "./ids";
import { Nullable } from "./nullable";

export type ListIdsType = {
  faust: FaustId;
  identifier: string;
  reservationId: number;
};

export type ListType = Nullable<Partial<ListIdsType>>;
