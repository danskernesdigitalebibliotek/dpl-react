import { useSelect } from "downshift";
import { MultiselectExternalUpdate, MultiselectOption } from "./types";

export const deselectMultiselectAllOption = (
  selectedItems: MultiselectOption[],
  newSelected: MultiselectOption,
  updateState: (
    updateKey: string | undefined,
    value: MultiselectOption[]
  ) => void,
  updateExternalState: MultiselectExternalUpdate | undefined,
  setSelectedItems: (items: MultiselectOption[]) => void
) => {
  const newValue = [
    ...selectedItems.filter((item) => item.value !== "all"),
    newSelected
  ];
  updateState(updateExternalState?.key, newValue);
  setSelectedItems(newValue);
  return newValue;
};

export const setMultiselectOptions = (
  newSelected: MultiselectOption[],
  updateState: (
    updateKey: string | undefined,
    value: MultiselectOption[]
  ) => void,
  updateExternalState: MultiselectExternalUpdate | undefined,
  setSelectedItems: (items: MultiselectOption[]) => void
) => {
  updateState(updateExternalState?.key, newSelected);
  setSelectedItems(newSelected);
  return newSelected;
};

export const selectMultiselectAllOption = (
  updateState: (
    updateKey: string | undefined,
    value: MultiselectOption[]
  ) => void,
  updateExternalState: MultiselectExternalUpdate | undefined,
  setSelectedItems: (items: MultiselectOption[]) => void
) => {
  const newValue = [{ item: "multiselectAllOptionText", value: "all" }];
  updateState(updateExternalState?.key, newValue);
  setSelectedItems(newValue);
  return newValue;
};

export const selectMultiselectOption = (
  selectedItems: MultiselectOption[],
  newSelected: MultiselectOption,
  updateState: (
    updateKey: string | undefined,
    value: MultiselectOption[]
  ) => void,
  updateExternalState: MultiselectExternalUpdate | undefined,
  setSelectedItems: (items: MultiselectOption[]) => void
) => {
  updateState(updateExternalState?.key, [...selectedItems, newSelected]);
  setSelectedItems([...selectedItems, newSelected]);
  return [...selectedItems, newSelected];
};

export const useGetMultiselectDownshiftProps = (
  isDropdownOpen: boolean,
  allOptions: MultiselectOption[],
  selectedItems: MultiselectOption[],
  setSelectedItems: (items: MultiselectOption[]) => void,
  handleSelectedItems: (
    allCurrentlySelected: MultiselectOption[],
    newSelected: MultiselectOption | null,
    allPossibleOptions: number
  ) => MultiselectOption[]
) => {
  return useSelect({
    isOpen: isDropdownOpen,
    selectedItem: null,
    items: allOptions,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true // keep the menu open after selection.
          };
        default:
          break;
      }
      return changes;
    },
    onStateChange: ({ type, selectedItem: newSelectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
          // If new selection isn't already selected, we add it
          if (
            newSelectedItem &&
            !selectedItems.find((item) => item.value === newSelectedItem.value)
          ) {
            setSelectedItems(
              handleSelectedItems(
                selectedItems,
                newSelectedItem,
                allOptions.length
              )
            );
            return;
          }
          // If new selection is already selected, we deselect it
          if (
            newSelectedItem &&
            selectedItems.find((item) => item.value === newSelectedItem.value)
          ) {
            // Unless it's the only selected item
            if (selectedItems.length === 1) {
              return;
            }
            const newSelectedItems = selectedItems.filter((item) => {
              return item.value !== newSelectedItem.value;
            });
            setSelectedItems(
              handleSelectedItems(newSelectedItems, null, allOptions.length)
            );
          }
          break;
        default:
          break;
      }
    }
  });
};

export default {};
