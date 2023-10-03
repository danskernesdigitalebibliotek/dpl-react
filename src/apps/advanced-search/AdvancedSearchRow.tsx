import React from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import IconMinus from "@reload/dpl-design-system/build/icons/collection/MinusButton.svg";
import IconPlus from "@reload/dpl-design-system/build/icons/collection/PlusButton.svg";
import clsx from "clsx";
import {
  AdvancedSearchClause,
  AdvancedSearchClauses,
  AdvancedSearchIndex,
  AdvancedSearchIndexTranslations,
  AdvancedSearchIndexes,
  AdvancedSearchQuery,
  initialAdvancedSearchQuery,
  AdvancedSearchRowData
} from "./types";
import { useText } from "../../core/utils/text";

export type AdvancedSearchRowProps = {
  data: AdvancedSearchQuery;
  dataCy?: string;
  rowIndex: number;
  setSearchObject: (searchObject: AdvancedSearchQuery) => void;
};

const AdvancedSearchRow: React.FC<AdvancedSearchRowProps> = ({
  dataCy = "advanced-search-row",
  data,
  rowIndex,
  setSearchObject
}) => {
  const t = useText();

  const updateRowData = (
    rowAspect: "term" | "clause" | "searchIndex",
    update: string | AdvancedSearchClause | AdvancedSearchIndex,
    updateData: (data: AdvancedSearchQuery) => void
  ) => {
    const newData = { ...data };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    newData.rows[rowIndex][rowAspect] = update;
    updateData(newData);
  };

  const getClauseClasses = (
    clickedClause: AdvancedSearchClause,
    currentClause: AdvancedSearchClause
  ) => {
    return clsx("advanced-search__clause focus-styling cursor-pointer", {
      "advanced-search__clause--grey": currentClause !== clickedClause
    });
  };

  const addRow = (updateData: (data: AdvancedSearchQuery) => void) => {
    const newData = { ...data };
    newData.rows.push(
      initialAdvancedSearchQuery.rows.at(0) as AdvancedSearchRowData
    );
    updateData(newData);
  };

  const removeRow = (
    index: number,
    updateData: (data: AdvancedSearchQuery) => void
  ) => {
    const newData = { ...data };
    newData.rows.splice(index, 1);
    updateData(newData);
  };

  return (
    <>
      {rowIndex > 0 && (
        <div className="advanced-search__clauses">
          {AdvancedSearchClauses.map((clause) => {
            return (
              <button
                key={`${rowIndex}-${clause}`}
                type="button"
                className={getClauseClasses(clause, data.rows[rowIndex].clause)}
                onClick={() => {
                  updateRowData("clause", clause, setSearchObject);
                }}
              >
                {clause}
              </button>
            );
          })}
        </div>
      )}

      <div className="input-with-dropdown" data-cy={dataCy}>
        <input
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
            {AdvancedSearchIndexes.map((index) => {
              return (
                <option key={index} className="dropdown__option" value={index}>
                  {t(AdvancedSearchIndexTranslations[index])}
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
        >
          <img className="mr-8" src={IconPlus} alt="" />
          {t("advancedSearchAddRowText")}
        </button>
      )}
    </>
  );
};

export default AdvancedSearchRow;
