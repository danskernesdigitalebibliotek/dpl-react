import React, { FC, useId, useRef, useState } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { useMultipleSelection } from "downshift";
import clsx from "clsx";
import { useClickAway, useDeepCompareEffect } from "react-use";
import CheckBox from "../checkbox/Checkbox";
import { MultiselectExternalUpdate, MultiselectOption } from "./types";
import useMultiselectOptions from "./useMultiselectOptions";
import { useText } from "../../core/utils/text";
import {
  deselectMultiselectAllOption,
  selectMultiselectAllOption,
  selectMultiselectOption,
  setMultiselectOptions,
  useGetMultiselectDownshiftProps
} from "./helper";

export type MultiselectProps = {
  dataCy?: string;
  caption?: string;
  options: MultiselectOption[];
  defaultValue?: MultiselectOption[];
  updateExternalState?: MultiselectExternalUpdate;
};

const Multiselect: FC<MultiselectProps> = ({
  dataCy = "multiselect",
  caption,
  options,
  defaultValue = [],
  updateExternalState
}) => {
  const id = useId();
  const t = useText();
  const ref = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const updateState = (
    updateKey: string | undefined,
    value: MultiselectOption[]
  ) => {
    if (!updateExternalState || !updateKey) return;
    updateExternalState.externalUpdateFunction({
      key: updateKey,
      value
    });
  };
  const allValue = "all";
  const { allOptions } = useMultiselectOptions(options, {
    item: "multiselectAllOptionText",
    value: "all"
  });
  const initialSelectedOptions =
    defaultValue.length > 0 ? defaultValue : allOptions.slice(0, 1);

  const { getDropdownProps, setSelectedItems, selectedItems } =
    useMultipleSelection({ initialSelectedItems: initialSelectedOptions });

  const handleSelectedItems = (
    allCurrentlySelected: MultiselectOption[],
    newSelected: MultiselectOption | null,
    allPossibleOptions: number
  ) => {
    // If newSelected doesn't exist, then we instead are removing an item
    if (!newSelected) {
      return setMultiselectOptions(
        allCurrentlySelected,
        updateState,
        updateExternalState,
        setSelectedItems
      );
    }
    // If new selection is not "all" we make sure "all" is deselected
    if (
      allCurrentlySelected.find((item) => item.value === allValue) &&
      newSelected.value !== allValue
    ) {
      return deselectMultiselectAllOption(
        allCurrentlySelected,
        newSelected,
        updateState,
        updateExternalState,
        setSelectedItems
      );
    }
    // If every non-"all" item is selected, then we just select "all"
    if (
      newSelected.value !== allValue &&
      [...allCurrentlySelected, newSelected].length === allPossibleOptions - 1
    ) {
      return selectMultiselectAllOption(
        updateState,
        updateExternalState,
        setSelectedItems
      );
    }
    // If new selection is "all" we make sure to deselect all other options
    if (newSelected.value === allValue) {
      updateState(updateExternalState?.key, [newSelected]);
      setSelectedItems([newSelected]);
      return [newSelected];
    }
    return selectMultiselectOption(
      selectedItems,
      newSelected,
      updateState,
      updateExternalState,
      setSelectedItems
    );
  };

  useClickAway(ref, () => {
    setIsDropdownOpen(false);
  });

  useDeepCompareEffect(() => {
    setSelectedItems(initialSelectedOptions);
  }, [setSelectedItems, initialSelectedOptions]);

  const { getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } =
    useGetMultiselectDownshiftProps(
      isDropdownOpen,
      allOptions,
      selectedItems,
      setSelectedItems,
      handleSelectedItems
    );

  return (
    <>
      {caption && <div className="multiselect__caption">{caption}</div>}
      <div className="multiselect" ref={ref} data-cy={dataCy}>
        {/* The downshift combobox works this way by design */}
        <button
          type="button"
          className="multiselect focus-styling"
          // TODO: Explicitly define prop types for better clarity
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getToggleButtonProps(
            getDropdownProps({ preventKeyAction: isDropdownOpen })
          )}
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <div className="multiselect__selected">
            {selectedItems.map((singularitem, index) => {
              const getSpace = index > 0 ? ", " : "";
              return getSpace + t(singularitem.item);
            })}
          </div>

          <div className="multiselect__opener">
            <img
              className={clsx("multiselect__icon", {
                "dropdown__arrow--bottom": isDropdownOpen
              })}
              src={IconExpand}
              alt=""
            />
          </div>
        </button>
        <ul
          className="multiselect__options"
          // TODO: Explicitly define prop types for better clarity
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getMenuProps()}
          style={!isDropdownOpen ? { display: "none" } : {}}
        >
          {allOptions.map((item, index) => {
            const downshiftProps = {
              ...getItemProps({ item, index })
            };
            return (
              <li
                className={clsx("multiselect__option", {
                  "multiselect__option--highlighted": highlightedIndex === index
                })}
                key={`${item.value}${item.item}`}
                // TODO: Explicitly define prop types for better clarity
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...getItemProps({ item, index })}
                role="option"
                aria-selected={
                  !!selectedItems.find(
                    (selected) => selected.value === item.value
                  )
                }
              >
                <span id={`multiselect-label-${downshiftProps.id}`}>
                  {t(item.item)}
                </span>
                <div className="checkbox multiselect__checkbox">
                  <CheckBox
                    id={`${id}-${index.toString()}`}
                    selected={
                      !!selectedItems.find(
                        (selected) => selected.value === item.value
                      )
                    }
                    isVisualOnly
                    labelledBy={`multiselect-label-${downshiftProps.id}`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Multiselect;
