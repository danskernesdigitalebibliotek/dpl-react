import React, { useEffect, useState } from "react";
import AdvancedSearchRow from "./AdvancedSearchRow";
import {
  AdvancedSearchFilterData,
  advancedSearchAccessibility,
  advancedSearchFiction,
  advancedSearchMaterialTypes,
  AdvancedSearchQuery,
  initialAdvancedSearchQuery
} from "./types";
import { useText } from "../../core/utils/text";
import PreviewSection from "./PreviewSection";
import Multiselect from "../../components/multiselect/Multiselect";
import {
  MultiselectExternalUpdateFunction,
  MultiselectOption
} from "../../core/utils/types/multiselect-types";
import CqlSearchHeader from "./CqlSearchHeader";
import {
  shouldAdvancedSearchButtonBeDisabled,
  translateSearchObjectToCql
} from "./helpers";
import { Button } from "../../components/Buttons/Button";

export type AdvancedSearchHeaderProps = {
  dataCy?: string;
  searchQuery: string | null;
  setSearchQuery: (searchQuery: string | null) => void;
  searchObject: AdvancedSearchQuery | null;
  setSearchObject: (searchObject: AdvancedSearchQuery | null) => void;
};

const AdvancedSearchHeader: React.FC<AdvancedSearchHeaderProps> = ({
  dataCy = "advanced-search-header",
  searchQuery,
  setSearchQuery,
  searchObject,
  setSearchObject
}) => {
  const t = useText();
  const [isAdvancedSearchheader, setIsAdvancedSearchHeader] =
    useState<boolean>(true);
  // Keep an internal copy of the search object in a separate state. We only
  // want to update the outer state and perform a search when the user clicks
  // the search button.
  const [internalSearchObject, setInternalSearchObject] =
    useState<AdvancedSearchQuery>(searchObject || initialAdvancedSearchQuery);
  const [previewCql, setPreviewCql] = useState<string>(searchQuery || "");
  const [rawCql, setRawCql] = useState<string>("");

  // If a new search object is passed in, override the internal state to reflect
  // the updated values in the state.
  useEffect(() => {
    if (searchObject === null) return;
    setInternalSearchObject(searchObject);
  }, [searchObject]);

  useEffect(() => {
    const cql = translateSearchObjectToCql(internalSearchObject);
    setPreviewCql(cql);
  }, [internalSearchObject]);

  const updateFiltersData = (filtersUpdate: {
    key: keyof AdvancedSearchFilterData;
    value: MultiselectOption[];
  }) => {
    if (!internalSearchObject?.filters[filtersUpdate.key].length) {
      return;
    }
    const newSearchObject = { ...internalSearchObject };
    newSearchObject.filters = {
      ...newSearchObject.filters,
      [filtersUpdate.key]: filtersUpdate.value
    };
    setInternalSearchObject(newSearchObject);
  };

  useEffect(() => {
    if (searchQuery && !searchObject) {
      setIsAdvancedSearchHeader(false);
    }
  }, [searchObject, searchQuery]);

  const handleSearchButtonClick = () => {
    if (rawCql.trim() !== "" && !isAdvancedSearchheader) {
      setSearchQuery(rawCql);
      return;
    }
    setSearchObject(internalSearchObject);
  };

  const [isSearchButtonDisabled, setIsSearchButtonDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    setIsSearchButtonDisabled(
      shouldAdvancedSearchButtonBeDisabled(
        isAdvancedSearchheader,
        internalSearchObject,
        rawCql
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalSearchObject, rawCql, isAdvancedSearchheader]);

  return (
    <>
      {isAdvancedSearchheader && (
        <>
          <h1 className="text-header-h2 advanced-search__title capitalize-first">
            {t("advancedSearchTitleText")}
          </h1>
          <div className="input-and-preview">
            <div className="input-and-preview__input">
              {internalSearchObject.rows.map((row, index) => {
                return (
                  <AdvancedSearchRow
                    data={internalSearchObject}
                    rowIndex={index}
                    setSearchObject={setInternalSearchObject}
                    dataCy={`${dataCy}-row`}
                  />
                );
              })}
            </div>
            <PreviewSection
              translatedCql={previewCql || searchQuery || ""}
              reset={() => setInternalSearchObject(initialAdvancedSearchQuery)}
              setIsAdvancedSearchHeader={setIsAdvancedSearchHeader}
            />
          </div>

          <section className="advanced-search__filters">
            <div className="advanced-search__filter">
              <Multiselect
                caption="Material types"
                options={advancedSearchMaterialTypes}
                defaultValue={internalSearchObject.filters.materialTypes}
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
                defaultValue={internalSearchObject.filters.fiction}
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
                defaultValue={internalSearchObject.filters.accessibility}
                updateExternalState={{
                  key: "accessibility",
                  externalUpdateFunction:
                    updateFiltersData as MultiselectExternalUpdateFunction
                }}
              />
            </div>
          </section>
          <PreviewSection
            translatedCql={previewCql || searchQuery || ""}
            reset={() => setInternalSearchObject(initialAdvancedSearchQuery)}
            isMobile
            setIsAdvancedSearchHeader={setIsAdvancedSearchHeader}
          />
        </>
      )}
      {!isAdvancedSearchheader && (
        <CqlSearchHeader
          initialCql={previewCql || searchQuery || ""}
          setCql={setRawCql}
        />
      )}

      <section className="advanced-search__footer">
        {!isAdvancedSearchheader && (
          <button
            type="button"
            className="link-tag advanced-search__back-button cursor-pointer"
            onClick={() => setIsAdvancedSearchHeader(true)}
            onKeyUp={(e) =>
              e.key === "Enter" ?? setIsAdvancedSearchHeader(!true)
            }
          >
            {t("toAdvancedSearchButtonText")}
          </button>
        )}
        <Button
          dataCy="search-button"
          buttonType="none"
          disabled={isSearchButtonDisabled}
          size="xlarge"
          variant="filled"
          classNames="advanced-search__search-button"
          collapsible
          label={t("advancedSearchSearchButtonText")}
          onClick={handleSearchButtonClick}
        />
      </section>
    </>
  );
};

export default AdvancedSearchHeader;
