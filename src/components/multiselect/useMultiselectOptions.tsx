import { MultiselectOption } from "../../core/utils/types/multiselect-types";

function useMultiselectOptions(
  options: MultiselectOption[],
  allOption: MultiselectOption
) {
  const allOptions = [allOption, ...options];

  return {
    allOptions
  };
}

export default useMultiselectOptions;
