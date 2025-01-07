import React, { useEffect, useRef } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import IconMinus from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/MinusButton.svg";
import IconPlus from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/PlusButton.svg";
import clsx from "clsx";
import {
  AdvancedSearchClause,
  advancedSearchClauses,
  AdvancedSearchIndex,
  advancedSearchIndexTranslations,
  advancedSearchIndexes,
  AdvancedSearchQuery,
  initialAdvancedSearchQuery,
  AdvancedSearchRowData,
  AdvancedSearchRowUpdateRowAspect
} from "./types";
import { useText } from "../../core/utils/text";

export type AdvancedSearchRowProps = {
  data: AdvancedSearchQuery;
  dataCy?: string;
  rowIndex: number;
  isFocused?: boolean;
  setSearchObject: (searchObject: AdvancedSearchQuery) => void;
  setFocusedRow: (rowIndex: number) => void;
};

const AdvancedSearchRow: React.FC<AdvancedSearchRowProps> = ({
  dataCy = "advanced-search-row",
  data,
  rowIndex,
  isFocused,
  setSearchObject,
  setFocusedRow
}) => {
  const t = useText();
  const updateRowData = (
    rowAspect: AdvancedSearchRowUpdateRowAspect,
    update: string | AdvancedSearchClause | AdvancedSearchIndex,
    updateData: (data: AdvancedSearchQuery) => void
  ) => {
    const newData = { ...data };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line I wasn't able to match the update type with the rowAspect type
    // but the values match and it all works.
    newData.rows[rowIndex][rowAspect] = update;
    updateData(newData);
  };
  const getClauseClasses = (
    clickedClause: AdvancedSearchClause["value"],
    currentClause: AdvancedSearchClause["value"]
  ) => {
    return clsx(
      "advanced-search__clause focus-styling cursor-pointer capitalize-all",
      {
        "advanced-search__clause--grey": currentClause !== clickedClause
      }
    );
  };
  const addRow = (updateData: (data: AdvancedSearchQuery) => void) => {
    const newData = { ...data };
    newData.rows.push(
      structuredClone(
        initialAdvancedSearchQuery.rows.at(0)
      ) as AdvancedSearchRowData
    );
    newData.rows[newData.rows.length - 1].id =
      newData.rows[newData.rows.length - 2].id + 1;
    updateData(newData);
    // Update the focus.
    setFocusedRow(rowIndex + 1);
  };
  const removeRow = (
    index: number,
    updateData: (data: AdvancedSearchQuery) => void
  ) => {
    const newData = { ...data };
    newData.rows.splice(index, 1);
    updateData(newData);
    // Update the focus. If we're removing the first row, focus the new first row.
    if (newData.rows.length === index) {
      setFocusedRow(index - 1);
    } else {
      setFocusedRow(index);
    }
  };
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      inputElement.current?.focus();
    }
  }, [isFocused]);

  return (
    <>
      {rowIndex > 0 && (
        <div className="advanced-search__clauses" data-cy="clauses">
          {advancedSearchClauses.map((clause) => {
            return (
              <button
                key={`${rowIndex}-${clause.value}`}
                data-cy={`clause-${clause.value}`}
                type="button"
                className={getClauseClasses(
                  clause.value,
                  data.rows[rowIndex].clause.value
                )}
                onClick={() => {
                  updateRowData("clause", clause, setSearchObject);
                }}
              >
                {t(clause.translation)}
              </button>
            );
          })}
        </div>
      )}

      <div className="input-with-dropdown" data-cy={dataCy}>
        <label
          htmlFor={`advanced-search-input-${rowIndex}`}
          className="hide-visually"
        >
          {t("advancedSearchInputLabelText", {
            placeholders: { "@inputNumber": rowIndex + 1 }
          })}
        </label>
        <input
          id={`advanced-search-input-${rowIndex}`}
          ref={inputElement}
          className="input-with-dropdown__input focus-styling__input capitalize-first"
          type="text"
          placeholder={t("advancedSearchInputPlaceholderText")}
          value={data.rows[rowIndex].term}
          onChange={(e) => {
            updateRowData("term", e.target.value, setSearchObject);
          }}
        />
        <div className="dropdown dropdown--grey-borders input-with-dropdown__dropdown">
          <select
            className="dropdown__select dropdown__select--inline focus-styling"
            aria-label="input field dropdown"
            value={data.rows[rowIndex].searchIndex}
            onChange={(e) => {
              updateRowData("searchIndex", e.target.value, setSearchObject);
            }}
          >
            {advancedSearchIndexes.map((index) => {
              return (
                <option key={index} className="dropdown__option" value={index}>
                  {t(
                    advancedSearchIndexTranslations[
                      index as keyof typeof advancedSearchIndexTranslations
                    ]
                  )}
                </option>
              );
            })}
          </select>
          <div className="dropdown__arrows dropdown__arrows--inline">
            <img className="dropdown__arrow" src={IconExpand} alt="" />
          </div>
        </div>
        {data.rows.length > 1 && (
          <button
            type="button"
            onClick={() => {
              removeRow(rowIndex, setSearchObject);
            }}
            aria-label={t("advancedSearchRemoveRowText", {
              placeholders: { "@inputNumber": rowIndex + 1 }
            })}
          >
            <img className="input-with-dropdown__icon" src={IconMinus} alt="" />
          </button>
        )}
      </div>

      {rowIndex === data.rows.length - 1 && (
        <button
          type="button"
          className="advanced-search__clauses cursor-pointer"
          onClick={() => {
            addRow(setSearchObject);
          }}
          data-cy="advanced-search-add-row"
        >
          <img className="mr-8" src={IconPlus} alt="" />
          {t("advancedSearchAddRowText")}
        </button>
      )}
    </>
  );
};

export default AdvancedSearchRow;
