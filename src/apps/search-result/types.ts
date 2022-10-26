import { FacetValue } from "../../core/dbc-gateway/generated/graphql";

export type FilterItemTerm = Omit<FacetValue, "__typename">;
export type FilterItem = {
  facet: string;
  term: FilterItemTerm;
};

export type TagOnclickHandler = ({
  filterItem,
  action
}: {
  filterItem: FilterItem;
  action: "remove" | "add";
}) => void;
