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
  AdvancedSearchRowData
} from "../../core/utils/types/advanced-search-types";
import { useText } from "../../core/utils/text";

export type AdvancedSearchRowProps = {
  dataCy?: string;
  data: AdvancedSearchRowData[];
  rowIndex: number;
  setRowsData: (data: AdvancedSearchRowData[]) => void;
};

const AdvancedSearchRow: React.FC<AdvancedSearchRowProps> = ({
  dataCy = "advanced-search-row",
  data,
  rowIndex,
  setRowsData
}) => {
  const t = useText();

  const updateRowData = (
    rowAspect: "term" | "clause" | "searchIndex",
    update: string | AdvancedSearchClause | AdvancedSearchIndex,
    rowData: AdvancedSearchRowData[],
    updateData: (data: AdvancedSearchRowData[]) => void
  ) => {
    const newData = [...rowData];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    newData[rowIndex][rowAspect] = update;
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

  const addRow = (updateData: (data: AdvancedSearchRowData[]) => void) => {
    const newData = [...data];
    newData.push({ term: "", searchIndex: "all", clause: "AND" });
    updateData(newData);
  };

  const removeRow = (
    index: number,
    rowData: AdvancedSearchRowData[],
    updateData: (data: AdvancedSearchRowData[]) => void
  ) => {
    const newData = [...rowData];
    newData.splice(index, 1);
    updateData(newData);
  };

  return (
    <>
      {rowIndex > 0 && (
        <div className="advanced-search__clauses">
          {AdvancedSearchClauses.map((clause) => {
            return (
              <button
                type="button"
                className={getClauseClasses(clause, data[rowIndex].clause)}
                onClick={() => {
                  updateRowData("clause", clause, data, setRowsData);
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
          className="input-with-dropdown__input focus-styling__input"
          type="text"
          placeholder={t("advancedSearchInputPlaceholderText")}
          value={data[rowIndex].term}
          onChange={(e) => {
            updateRowData("term", e.target.value, data, setRowsData);
          }}
        />
        <div className="dropdown dropdown--grey-borders input-with-dropdown__dropdown">
          <select
            className="dropdown__select dropdown__select--inline focus-styling"
            aria-label="input field dropdown"
            value={data[rowIndex].searchIndex}
            onChange={(e) => {
              updateRowData("searchIndex", e.target.value, data, setRowsData);
            }}
          >
            {AdvancedSearchIndexes.map((index) => {
              return (
                <option className="dropdown__option" value={index}>
                  {t(AdvancedSearchIndexTranslations[index])}
                </option>
              );
            })}
          </select>
          <div className="dropdown__arrows dropdown__arrows--inline">
            <img className="dropdown__arrow" src={IconExpand} alt="" />
          </div>
        </div>
        {data.length > 1 && (
          <button
            type="button"
            onClick={() => {
              removeRow(rowIndex, data, setRowsData);
            }}
          >
            <img className="input-with-dropdown__icon" src={IconMinus} alt="" />
          </button>
        )}
      </div>

      {rowIndex === data.length - 1 && (
        <button
          type="button"
          className="advanced-search__clauses cursor-pointer"
          onClick={() => {
            addRow(setRowsData);
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
