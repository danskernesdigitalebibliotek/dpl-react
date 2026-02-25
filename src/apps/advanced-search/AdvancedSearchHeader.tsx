import React, { useEffect, useState } from "react";
import AdvancedSearchRow from "./AdvancedSearchRow";
import {
  AdvancedSearchQuery,
  initialAdvancedSearchQuery,
  FirstAccessionOperatorFilter
} from "./types";
import { useText } from "../../core/utils/text";
import PreviewSection from "./PreviewSection";
import CqlSearchHeader from "./CqlSearchHeader";
import {
  shouldAdvancedSearchButtonBeDisabled,
  translateSearchObjectToCql
} from "./helpers";
import { Button } from "../../components/Buttons/Button";
import CheckBox from "../../components/checkbox/Checkbox";
import { LocationFilter } from "./LocationFilter";
import {
  useCollectPageStatistics,
  usePageStatistics
} from "../../core/statistics/useStatistics";
import { statistics } from "../../core/statistics/statistics";
import Link from "../../components/atoms/links/Link";

export type AdvancedSearchHeaderProps = {
  dataCy?: string;
  searchQuery: string | null;
  setSearchQuery: (searchQuery: string | null) => void;
  searchObject: AdvancedSearchQuery | null;
  setSearchObject: (searchObject: AdvancedSearchQuery | null) => void;
  onShelf: boolean;
  setOnShelf: (checked: boolean) => void;
  onLocationChange: (location: string) => void;
  onSublocationChange: (sublocation: string) => void;
  onBranchChange: (branch: string) => void;
  onDepartmentChange: (department: string) => void;
  onFirstAccessionDateChange: (firstAccession: string) => void;
  onFirstAccessionOperatorChange: (
    firstAccession: FirstAccessionOperatorFilter
  ) => void;
  locationFilter: LocationFilter;
  firstAccessionDateFilter: string;
  firstAccessionOperatorFilter: FirstAccessionOperatorFilter;
};

const AdvancedSearchHeader: React.FC<AdvancedSearchHeaderProps> = ({
  dataCy = "advanced-search-header",
  searchQuery,
  setSearchQuery,
  searchObject,
  setSearchObject,
  onShelf,
  setOnShelf,
  onLocationChange,
  onSublocationChange,
  onBranchChange,
  onDepartmentChange,
  onFirstAccessionDateChange,
  onFirstAccessionOperatorChange,
  locationFilter,
  firstAccessionDateFilter,
  firstAccessionOperatorFilter
}) => {
  const t = useText();
  const [isFormMode, setIsFormMode] = useState<boolean>(true);
  // Keep an internal copy of the search object in a separate state. We only
  // want to update the outer state and perform a search when the user clicks
  // the search button.
  const [internalSearchObject, setInternalSearchObject] =
    useState<AdvancedSearchQuery>(
      searchObject || structuredClone(initialAdvancedSearchQuery)
    );
  const [previewCql, setPreviewCql] = useState<string>(searchQuery || "");
  const [rawCql, setRawCql] = useState<string>("");
  const [focusedRow, setFocusedRow] = useState<number | null>(null);
  const { updatePageStatistics } = usePageStatistics();
  const { resetAndCollectPageStatistics } = useCollectPageStatistics();

  const handleOnShelfChange = (checked: boolean) => {
    setOnShelf(checked);
  };

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

  const reset = () => {
    setSearchObject(structuredClone(initialAdvancedSearchQuery));
  };
  const scrollToResults = () => {
    const element = document.getElementById("advanced-search-result");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleSearch = () => {
    // CQL search (free text mode)
    if (rawCql.trim() !== "" && !isFormMode) {
      resetAndCollectPageStatistics({
        ...statistics.advancedSearchCql,
        trackedData: rawCql
      });
      updatePageStatistics({ waitTime: 1000 });
      setSearchQuery(rawCql);
      // Half a second makes sure search result is rendered before scrolling to it.
      setTimeout(() => {
        scrollToResults();
      }, 500);
      return;
    }
    // Advanced search (form mode)
    resetAndCollectPageStatistics({
      ...statistics.advancedSearchTerm,
      trackedData: translatedCql
    });
    updatePageStatistics({ waitTime: 1000 });

    setSearchObject(internalSearchObject);
    // Half a second makes sure search result is rendered before scrolling to it.
    setTimeout(() => {
      scrollToResults();
    }, 500);
  };
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] =
    useState<boolean>(true);
  const translatedCql = previewCql || searchQuery || "";

  useEffect(() => {
    if (searchQuery && !searchObject) {
      setIsFormMode(false);
    }
  }, [searchObject, searchQuery]);

  useEffect(() => {
    setIsSearchButtonDisabled(
      shouldAdvancedSearchButtonBeDisabled(
        isFormMode,
        internalSearchObject,
        rawCql
      )
    );
  }, [internalSearchObject, rawCql, isFormMode]);

  useEffect(() => {
    if (!isFormMode) {
      resetAndCollectPageStatistics({
        ...statistics.advancedSearchCql,
        trackedData: rawCql
      });
    }

    if (isFormMode) {
      resetAndCollectPageStatistics({
        ...statistics.advancedSearchTerm,
        trackedData: translatedCql
      });
    }
  }, [isFormMode, rawCql, resetAndCollectPageStatistics, translatedCql]);

  return (
    <form action={handleSearch}>
      {isFormMode && (
        <>
          <h1 className="text-header-h2 advanced-search__title capitalize-first">
            {t("advancedSearchTitleText")}
          </h1>
          <div className="input-and-preview">
            <div className="input-and-preview__input">
              {internalSearchObject.rows.map((row, index) => {
                return (
                  <AdvancedSearchRow
                    key={row.id}
                    data={internalSearchObject}
                    rowIndex={index}
                    setSearchObject={setInternalSearchObject}
                    dataCy={`${dataCy}-row`}
                    setFocusedRow={setFocusedRow}
                    isFocused={focusedRow === index}
                  />
                );
              })}
            </div>
            <PreviewSection
              translatedCql={translatedCql}
              reset={reset}
              setIsFormMode={setIsFormMode}
            />
          </div>

          <CheckBox
            id="on-shelf"
            selected={onShelf}
            onChecked={handleOnShelfChange}
            label={t("advancedSearchFilterHoldingStatusText")}
          />
          <PreviewSection
            translatedCql={translatedCql}
            reset={reset}
            isMobile
            setIsFormMode={setIsFormMode}
          />
        </>
      )}
      {!isFormMode && (
        <CqlSearchHeader
          initialCql={translatedCql}
          setCql={setRawCql}
          onShelf={onShelf}
          handleOnShelfChange={handleOnShelfChange}
          onLocationChange={onLocationChange}
          onSublocationChange={onSublocationChange}
          onBranchChange={onBranchChange}
          onDepartmentChange={onDepartmentChange}
          onFirstAccessionDateChange={onFirstAccessionDateChange}
          onFirstAccessionOperatorChange={onFirstAccessionOperatorChange}
          locationFilter={locationFilter}
          firstAccessionDateFilter={firstAccessionDateFilter}
          firstAccessionOperatorFilter={firstAccessionOperatorFilter}
        />
      )}

      <section className="advanced-search__footer">
        {!isFormMode && (
          <Link
            className="link-tag advanced-search__back-button cursor-pointer"
            href={new URL("/advancedsearch", window.location.href)}
          >
            {t("toAdvancedSearchButtonText")}
          </Link>
        )}
        <Button
          dataCy="search-button"
          buttonType="none"
          type="submit"
          disabled={isSearchButtonDisabled}
          size="xlarge"
          variant="filled"
          classNames="advanced-search__search-button"
          collapsible
          label={t("advancedSearchSearchButtonText")}
        />
      </section>
    </form>
  );
};

export default AdvancedSearchHeader;
