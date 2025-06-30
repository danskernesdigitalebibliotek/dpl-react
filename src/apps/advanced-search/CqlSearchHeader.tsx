import React, { useEffect, useState } from "react";
import { useText } from "../../core/utils/text";
import CheckBox from "../../components/checkbox/Checkbox";
import { LocationFilter } from "./LocationFilter";
import Textarea from "../../components/forms/textarea/Textarea";
import TextInput from "../../components/forms/input/TextInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import { FirstAccessionOperatorFilter } from "./types";

export type CqlSearchHeaderProps = {
  dataCy?: string;
  initialCql: string;
  setCql: (newState: string) => void;
  onShelf: boolean;
  handleOnShelfChange: (newState: boolean) => void;
  onLocationChange: (location: string) => void;
  onSublocationChange: (sublocation: string) => void;
  onFirstAccessionDateChange: (firstAccession: string) => void;
  onFirstAccessionOperatorChange: (
    operator: FirstAccessionOperatorFilter
  ) => void;
  locationFilter: LocationFilter;
  firstAccessionDateFilter: string;
  firstAccessionOperatorFilter: FirstAccessionOperatorFilter;
};

const CqlSearchHeader: React.FC<CqlSearchHeaderProps> = ({
  dataCy = "cql-search-header",
  initialCql,
  setCql,
  onShelf,
  handleOnShelfChange,
  onLocationChange,
  onSublocationChange,
  onFirstAccessionDateChange,
  onFirstAccessionOperatorChange,
  locationFilter,
  firstAccessionDateFilter,
  firstAccessionOperatorFilter
}) => {
  const t = useText();

  useEffect(() => {
    if (initialCql.trim() !== "") {
      setCql(initialCql);
    }
  }, [initialCql, setCql]);

  // Local state is needed to track input values as plain strings,
  // since onLocationChange expects a comma-separated string,
  // while locationFilter location and sublocation are provided as arrays.
  const [inputValues, setInputValues] = useState({
    location: locationFilter?.location?.join(", ") ?? "",
    sublocation: locationFilter?.sublocation?.join(", ") ?? "",
    firstAccessionDate: firstAccessionDateFilter,
    firstAccessionOperatorFilter: firstAccessionOperatorFilter
  });
  const firstAccessionDateOperators = [
    { label: t("advancedSearchFilterLaterThanText"), value: ">" },
    { label: t("advancedSearchFilterExactDateText"), value: "=" },
    { label: t("advancedSearchFilterEarlierThanText"), value: "<" }
  ];
  const handleInputChange = (
    name:
      | "location"
      | "sublocation"
      | "firstAccessionDate"
      | "firstAccessionDateOperator",
    value: string
  ) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));

    if (name === "location") {
      onLocationChange(value);
    }
    if (name === "sublocation") {
      onSublocationChange(value);
    }
    if (name === "firstAccessionDate") {
      onFirstAccessionDateChange(value);
    }
    if (name === "firstAccessionDateOperator") {
      onFirstAccessionOperatorChange(value as FirstAccessionOperatorFilter);
    }
  };

  return (
    <>
      <h1
        className="text-header-h2 advanced-search__title capitalize-first"
        data-cy={dataCy}
      >
        {t("cqlSearchTitleText")}
      </h1>
      <div className="advanced-search-cql-form">
        <Textarea
          id="cql"
          label="CQL"
          className="advanced-search-cql-form__input focus-styling__input"
          cols={100}
          rows={5}
          placeholder="e.g. term.title=snemand*”"
          dataCy={`${dataCy}-input`}
          onChange={(e) => setCql(e.target.value)}
          defaultValue={initialCql}
        />
        <TextInput
          id="location"
          label={t("advancedSearchFilterLocationText")}
          description={t("advancedSearchFilterLocationDescriptionText")}
          type="text"
          onChange={(location) => handleInputChange("location", location)}
          value={inputValues.location}
        />
        <TextInput
          id="sublocation"
          label={t("advancedSearchFilterSublocationText")}
          description={t("advancedSearchFilterSublocationDescriptionText")}
          type="text"
          onChange={(sublocation) =>
            handleInputChange("sublocation", sublocation)
          }
          value={inputValues.sublocation}
        />
        <CheckBox
          id="on-shelf"
          selected={onShelf}
          onChecked={handleOnShelfChange}
          label={t("advancedSearchFilterHoldingStatusText")}
        />
        <Dropdown
          classNames="dropdown--grey-borders advanced-search__filter dpl-input"
          options={firstAccessionDateOperators}
          arrowIcon="chevron"
          handleOnChange={(e) => {
            handleInputChange("firstAccessionDateOperator", e.target.value);
          }}
          id="first-accession-date-operator"
          label={t("advancedSearchFirstAccessionDateText")}
          ariaLabel={t("advancedSearchFirstAccessionDateOperatorText")}
        />
        <TextInput
          id="first-accession-date"
          className="mb-32"
          description={t("advancedSearchFirstAccessionDateDescriptionText")}
          ariaLabel={t("advancedSearchFirstAccessionDateSpecifyDateText")}
          type="text"
          onChange={(date) => handleInputChange("firstAccessionDate", date)}
          value={firstAccessionDateFilter}
        />
      </div>
    </>
  );
};

export default CqlSearchHeader;
