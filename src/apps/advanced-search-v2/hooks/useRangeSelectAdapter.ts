import { RangeValue } from "../types";

type UseRangeSelectAdapterProps = {
  selectedValues: string[];
  onUpdate: (values: string[]) => void;
};

type UseRangeSelectAdapterResult = {
  value: RangeValue;
  handleChange: (range: RangeValue) => void;
};

/**
 * Hook to convert between string[] format (used by filter state)
 * and RangeValue format (used by AdvancedSearchRangeSelect).
 */
const useRangeSelectAdapter = ({
  selectedValues,
  onUpdate
}: UseRangeSelectAdapterProps): UseRangeSelectAdapterResult => {
  // Convert string[] to RangeValue
  const value: RangeValue = {
    from:
      selectedValues[0] && !isNaN(parseInt(selectedValues[0]))
        ? parseInt(selectedValues[0])
        : null,
    to:
      selectedValues[1] && !isNaN(parseInt(selectedValues[1]))
        ? parseInt(selectedValues[1])
        : null
  };

  // Convert RangeValue to string[]
  const handleChange = (range: RangeValue) => {
    const values: string[] = [];
    if (range.from !== null) values.push(String(range.from));
    if (range.to !== null) values.push(String(range.to));
    onUpdate(values);
  };

  return { value, handleChange };
};

export default useRangeSelectAdapter;
