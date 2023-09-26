import React, { useEffect, useState } from "react";
import AdvancedSearchRow from "./AdvancedSearchRow";
import {
  AdvancedSearchFilterData,
  AdvancedSearchRowData,
  advancedSearchAccessibility,
  advancedSearchFiction,
  advancedSearchFilters,
  advancedSearchMaterialTypes
} from "../../core/utils/types/advanced-search-types";
import { useText } from "../../core/utils/text";
import PreviewSection from "./PreviewSection";
import Multiselect from "../multiselect/Multiselect";
import {
  MultiselectExternalUpdateFunction,
  MultiselectOption
} from "../../core/utils/types/multiselect-types";
import { translateFilterToCql, translateRowsToCql } from "./helper";

export type AdvancedSearchHeaderProps = {
  dataCy?: string;
  setSearchQuery: (searchQuery: string | null) => void;
};

const AdvancedSearchHeader: React.FC<AdvancedSearchHeaderProps> = ({
  dataCy = "advanced-search-header",
  setSearchQuery
}) => {
  const t = useText();
  const initialRowData: AdvancedSearchRowData[] = [
    { term: "", searchIndex: "all", clause: "AND" },
    { term: "", searchIndex: "all", clause: "AND" }
  ];
  const initialFilterData: AdvancedSearchFilterData = {
    materialTypes: [{ item: "All", value: "all" }],
    fiction: [{ item: "All", value: "all" }],
    accessibility: [{ item: "All", value: "all" }]
  };
  const [rowsData, setRowsData] =
    useState<AdvancedSearchRowData[]>(initialRowData);
  const [rowsTranslatedToCql, setRowsTranslatedToCql] = useState<string>("");
  const [filtersData, setFiltersData] =
    useState<AdvancedSearchFilterData>(initialFilterData);
  const [filtersTranslatedToCql, setFiltersTranslatedToCql] =
    useState<string>("");

  const updateFiltersData = (filtersUpdate: {
    key: keyof AdvancedSearchFilterData;
    value: MultiselectOption[];
  }) => {
    if (!filtersData[filtersUpdate.key].length) {
      return;
    }
    const newFiltersData = {
      ...filtersData,
      [filtersUpdate.key]: filtersUpdate.value
    };
    setFiltersData((prev) => {
      return { ...prev, ...newFiltersData };
    });
  };

  const translateFiltersToCql = (
    filtersToTranslate: AdvancedSearchFilterData
  ) => {
    const filtersAsArray: MultiselectOption[][] = Object.keys(
      filtersToTranslate
    ).map((key) => filtersToTranslate[key as keyof AdvancedSearchFilterData]);

    const translatedFilters = filtersAsArray.reduce(
      (acc: string, curr: MultiselectOption[], index) => {
        return (
          acc +
          translateFilterToCql(
            curr,
            Object.keys(filtersToTranslate)[
              index
            ] as keyof typeof advancedSearchFilters
          )
        );
      },
      ""
    );
    return translatedFilters;
  };

  const handleSearchButtonClick = () => {
    if (rowsTranslatedToCql.trim() !== "") {
      setSearchQuery(rowsTranslatedToCql + filtersTranslatedToCql);
    }
  };

  useEffect(() => {
    setRowsTranslatedToCql(translateRowsToCql(rowsData));
  }, [rowsData]);

  useEffect(() => {
    setFiltersTranslatedToCql(translateFiltersToCql(filtersData));
  }, [filtersData]);

  return (
    <>
      <h1 className="text-header-h2 advanced-search__title">
        {t("advancedSearchTitleText")}
      </h1>
      <div className="input-and-preview">
        <div className="input-and-preview__input">
          {rowsData.map((row, index) => {
            return (
              <AdvancedSearchRow
                data={rowsData}
                rowIndex={index}
                setRowsData={setRowsData}
                dataCy={`${dataCy}-row`}
              />
            );
          })}
        </div>
        <PreviewSection
          initialRowData={initialRowData}
          translatedCql={rowsTranslatedToCql + (filtersTranslatedToCql || "")}
          setRowsData={setRowsData}
        />
      </div>

      <section className="advanced-search__filters">
        <div className="advanced-search__filter">
          <Multiselect
            caption="Material types"
            options={advancedSearchMaterialTypes}
            updateExternalState={{
              key: "materialTypes",
              externalUpdateFunction:
                updateFiltersData as MultiselectExternalUpdateFunction
            }}
          />
        </div>
        <div className="advanced-search__filter">
          <Multiselect
            caption="Literature form"
            options={advancedSearchFiction}
            updateExternalState={{
              key: "fiction",
              externalUpdateFunction:
                updateFiltersData as MultiselectExternalUpdateFunction
            }}
          />
        </div>
        <div className="advanced-search__filter">
          <Multiselect
            caption="Access type"
            options={advancedSearchAccessibility}
            updateExternalState={{
              key: "accessibility",
              externalUpdateFunction:
                updateFiltersData as MultiselectExternalUpdateFunction
            }}
          />
        </div>
      </section>
      <PreviewSection
        translatedCql={rowsTranslatedToCql + (filtersTranslatedToCql || "")}
        initialRowData={initialRowData}
        setRowsData={setRowsData}
        isMobile
      />
      <section className="advanced-search__footer">
        <button
          type="button"
          className="btn-primary btn-filled btn-xlarge arrow__hover--right-small advanced-search__search-button"
          onClick={() => {
            handleSearchButtonClick();
          }}
          disabled={rowsTranslatedToCql === ""}
        >
          {t("advancedSearchSearchButtonText")}
        </button>
      </section>
    </>
  );
};

export default AdvancedSearchHeader;
