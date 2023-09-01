import React, { useEffect, useState } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import CheckBox from "../checkbox/Checkbox";
import AdvancedSearchRow from "./AdvancedSearchRow";
import { AdvancedSearchRowData } from "../../core/utils/types/advanced-search-types";

export type AdvancedSearchHeaderProps = {
  dataCy?: string;
  setSearchQuery: (searchQuery: string | null) => void;
};

const AdvancedSearchHeader: React.FC<AdvancedSearchHeaderProps> = ({
  dataCy = "advanced-search-header",
  setSearchQuery
}) => {
  const [rowsData, setRowData] = useState<AdvancedSearchRowData[]>([
    { term: "", searchIndex: "all", clause: "AND" },
    { term: "", searchIndex: "all", clause: "AND" }
  ]);

  useEffect(() => {
    console.log(rowsData);
  }, [rowsData]);

  return (
    <>
      <h1 className="text-header-h2 advanced-search__title">
        Avanceret søgning
      </h1>
      <div className="input-and-preview">
        <div className="input-and-preview__input">
          {rowsData.map((row, index) => {
            return (
              <AdvancedSearchRow
                data={rowsData}
                rowIndex={index}
                setRowData={setRowData}
                dataCy={`${dataCy}-row`}
              />
            );
          })}
        </div>
        <div className="pagefold-parent--large input-and-preview__preview">
          <div className="pagefold-triangle--large pagefold-inherit-parent" />
          <h3 className="text-body-medium-medium mb-24">CQL søgestreng</h3>
          <p className="text-body-medium-regular mb-32">
            title = harry potter AND subtitle = and the philosophers stone
          </p>
          <footer>
            <button type="button" className="link-tag mr-16">
              Nulstil
            </button>
            <button type="button" className="link-tag mr-16">
              Kopier streng
            </button>
            <a href="/" className="link-tag link-tag">
              Rediger CQL
            </a>
          </footer>
        </div>
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
      <div className="pagefold-parent--large input-and-preview__preview input-and-preview__preview--mobile">
        <div className="pagefold-triangle--large pagefold-inherit-parent" />
        <h3 className="text-body-medium-medium mb-24">CQL søgestreng</h3>
        <p className="text-body-medium-regular mb-32">
          title = harry potter AND subtitle = and the philosophers stone
        </p>
        <footer>
          <button type="button" className="link-tag mr-16">
            Nulstil
          </button>
          <button type="button" className="link-tag mr-16">
            Kopier streng
          </button>
          <a href="/" className="link-tag link-tag">
            Rediger CQL
          </a>
        </footer>
      </div>
      <footer className="advanced-search__footer">
        <button
          type="button"
          className="btn-primary btn-filled btn-xlarge arrow__hover--right-small advanced-search__search-button"
        >
          Search
        </button>
      </footer>
    </>
  );
};

export default AdvancedSearchHeader;
