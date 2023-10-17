import { MultiselectOption } from "./types";

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
