import { useEffect } from "react";
import { useQueryState, parseAsBoolean } from "nuqs";
import { buildCQLQuery, hasValidQuery } from "../lib/query-builder";
import { SuggestState, MultiSelectState } from "../types";

interface UseFormVisibilityParams {
  suggests: SuggestState[];
  selects: MultiSelectState[];
}

interface UseFormVisibilityReturn {
  shouldShowForm: boolean;
  shouldShowSummary: boolean;
  setShowForm: (value: boolean) => Promise<URLSearchParams>;
}

/**
 * Hook to manage form visibility state in URL
 * Ensures the form/summary toggle state is shareable via URL
 */
export const useFormVisibility = ({
  suggests,
  selects
}: UseFormVisibilityParams): UseFormVisibilityReturn => {
  const [showForm, setShowForm] = useQueryState(
    "edit",
    parseAsBoolean.withDefault(true)
  );

  const cql = buildCQLQuery(suggests, selects, []);
  const hasCurrentQuery = hasValidQuery(cql);

  // Ensure we show the form when there is no current query (e.g. after clearing)
  useEffect(() => {
    if (!hasCurrentQuery && !showForm) {
      setShowForm(true);
    }
  }, [hasCurrentQuery, showForm, setShowForm]);

  const shouldShowSummary = !showForm && hasCurrentQuery;

  return {
    shouldShowForm: showForm,
    shouldShowSummary,
    setShowForm
  };
};
