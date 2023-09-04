import React, { useEffect, useState } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import CheckBox from "../checkbox/Checkbox";
import AdvancedSearchRow from "./AdvancedSearchRow";
import { AdvancedSearchRowData } from "../../core/utils/types/advanced-search-types";
import { useText } from "../../core/utils/text";
import PreviewSection from "./PreviewSection";

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
          <div className="multiselect__caption">Caption for multiselect</div>
          <div className="multiselect">
            <div className="multiselect__selected">
              Item 1, Item 2, Item 3, Item 4
            </div>
            <div className="multiselect__opener">
              <img className="multiselect__icon" src={IconExpand} alt="" />
            </div>
            <ul className="multiselect__options">
              <li className="multiselect__option multiselect__option--highlighted">
                Item 1
                <div className="checkbox multiselect__checkbox">
                  <CheckBox id="23" />
                </div>
              </li>
              <li className="multiselect__option">
                Item 2
                <div className="checkbox multiselect__checkbox">
                  <CheckBox id="23" />
                </div>
              </li>
              <li className="multiselect__option">
                Item 3
                <div className="checkbox multiselect__checkbox">
                  <CheckBox id="23" />
                </div>
              </li>
            </ul>
          </div>
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
