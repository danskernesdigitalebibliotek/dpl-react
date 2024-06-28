import React, { useEffect } from "react";
import { useText } from "../../core/utils/text";
import CheckBox from "../../components/checkbox/Checkbox";
import TextInput from "../../components/atoms/input/TextInput";

export type CqlSearchHeaderProps = {
  dataCy?: string;
  initialCql: string;
  setCql: (newState: string) => void;
  onShelf: boolean;
  handleOnShelfChange: (newState: boolean) => void;
  onLocationChange: (location: string) => void;
  onSublocationChange: (sublocation: string) => void;
};

const CqlSearchHeader: React.FC<CqlSearchHeaderProps> = ({
  dataCy = "cql-search-header",
  initialCql,
  setCql,
  onShelf,
  handleOnShelfChange,
  onLocationChange,
  onSublocationChange
}) => {
  const t = useText();

  useEffect(() => {
    if (initialCql.trim() !== "") {
      setCql(initialCql);
    }
  }, [initialCql, setCql]);

  return (
    <>
      <h1
        className="text-header-h2 advanced-search__title capitalize-first"
        data-cy={dataCy}
      >
        {t("cqlSearchTitleText")}
      </h1>
      <textarea
        className="advanced-search__cql-input focus-styling__input"
        cols={100}
        rows={5}
        placeholder="e.g. title=snemand*"
        data-cy={`${dataCy}-input`}
        onChange={(e) => setCql(e.target.value)}
        defaultValue={initialCql}
      />
      <TextInput
        id="location"
        label="Location"
        type="text"
        onChange={(location) => onLocationChange(location)}
      />
      <TextInput
        id="location"
        label="Sublocation"
        type="text"
        onChange={(sublocation) => onSublocationChange(sublocation)}
      />
      <CheckBox
        id="on-shelf"
        selected={onShelf}
        onChecked={handleOnShelfChange}
        label={t("advancedSearchFilterHoldingStatusText")}
      />
    </>
  );
};

export default CqlSearchHeader;
