import * as React from "react";
import { useSuggestionsFromQueryStringQuery } from "../../core/dbc-gateway/generated/graphql";

export interface DemoSuggestDropdownProps {
  q: string;
}

export const DemoSuggestDropdown: React.FC<DemoSuggestDropdownProps> = ({
  q
}) => {
  const { data } = useSuggestionsFromQueryStringQuery({
    q
  });

  return data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <>&nbsp;</>;
};

export default DemoSuggestDropdown;
