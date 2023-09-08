import React, { useEffect, useState } from "react";
import AdvancedSearchRow from "./AdvancedSearchRow";
import {
  AdvancedSearchRowData,
  advancedSearchAccessibility,
  advancedSearchFiction,
  advancedSearchMaterialTypes
} from "../../core/utils/types/advanced-search-types";
import { useText } from "../../core/utils/text";
import PreviewSection from "./PreviewSection";
import Multiselect from "../multiselect/Multiselect";

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
  const [rowsData, setRowsData] =
    useState<AdvancedSearchRowData[]>(initialRowData);
  const [translatedToCql, setTranslatedToCql] = useState<string>("");

  const translateRowDataToCql = (dataToTranslate: AdvancedSearchRowData[]) => {
    return dataToTranslate.reduce(
      (acc: string, curr: AdvancedSearchRowData) => {
        let rowTranslation = "";
        if (acc !== "" && curr.term.trim() !== "") {
          rowTranslation = rowTranslation.concat(" ", curr.clause);
        }
        if (curr.searchIndex !== "all" && curr.term.trim() !== "") {
          rowTranslation = rowTranslation.concat(" ", curr.searchIndex, "=");
        }
        if (curr.term !== "") {
          const getSpace = acc.trim() === "" ? "" : " ";
          rowTranslation = rowTranslation.concat(getSpace, "'", curr.term, "'");
        }
        return acc + rowTranslation;
      },
      ""
    );
  };

  useEffect(() => {
    setTranslatedToCql(translateRowDataToCql(rowsData));
  }, [rowsData]);

  const handleSearchButtonClick = () => {
    if (translatedToCql.trim() !== "") {
      setSearchQuery(translatedToCql);
    }
  };

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
          translatedCql={translatedToCql}
          setRowsData={setRowsData}
        />
      </div>

      <section className="advanced-search__filters">
        <div className="advanced-search__filter">
          <Multiselect
            caption="Material types"
            options={advancedSearchMaterialTypes}
          />
        </div>
        <div className="advanced-search__filter">
          <Multiselect
            caption="Literature form"
            options={advancedSearchFiction}
          />
        </div>
        <div className="advanced-search__filter">
          <Multiselect
            caption="Access type"
            options={advancedSearchAccessibility}
          />
        </div>
      </section>
      <PreviewSection
        translatedCql={translatedToCql}
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
          disabled={translatedToCql === ""}
        >
          {t("advancedSearchSearchButtonText")}
        </button>
      </section>
    </>
  );
};

export default AdvancedSearchHeader;
