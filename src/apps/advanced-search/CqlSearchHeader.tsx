import React, { useEffect, useState } from "react";
import { useText } from "../../core/utils/text";
import CheckBox from "../../components/checkbox/Checkbox";
import { LocationFilter } from "./LocationFilter";
import Textarea from "../../components/forms/textarea/Textarea";
import TextInput from "../../components/forms/input/TextInput";
import Link from "../../components/atoms/links/Link";

export type CqlSearchHeaderProps = {
  dataCy?: string;
  initialCql: string;
  setCql: (newState: string) => void;
  onShelf: boolean;
  handleOnShelfChange: (newState: boolean) => void;
  onLocationChange: (location: string) => void;
  onSublocationChange: (sublocation: string) => void;
  locationFilter: LocationFilter;
};

const CqlSearchHeader: React.FC<CqlSearchHeaderProps> = ({
  dataCy = "cql-search-header",
  initialCql,
  setCql,
  onShelf,
  handleOnShelfChange,
  onLocationChange,
  onSublocationChange,
  locationFilter
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
    sublocation: locationFilter?.sublocation?.join(", ") ?? ""
  });

  const handleInputChange = (
    name: "location" | "sublocation",
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
  };

  return (
    <>
      <h1
        className="text-header-h2 advanced-search__title capitalize-first"
        data-cy={dataCy}
      >
        {t("cqlSearchTitleText")}
      </h1>
      <form className="advanced-search-cql-form">
        <div>
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
          <Link
            className="link-tag"
            href={new URL("https://danbib.dk/soegekoder-complex-search")}
            isNewTab
          >
            {t("cqlSearchExternalHelpLinkText")}
          </Link>
        </div>
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
      </form>
    </>
  );
};

export default CqlSearchHeader;
