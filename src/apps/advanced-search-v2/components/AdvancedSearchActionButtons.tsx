import React from "react";
import { useText } from "../../../core/utils/text";

interface AdvancedSearchActionButtonsProps {
  onSearch: () => void;
  onClear: () => void;
}

const AdvancedSearchActionButtons: React.FC<
  AdvancedSearchActionButtonsProps
> = ({ onSearch, onClear }) => {
  const t = useText();

  return (
    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
      <button
        onClick={onSearch}
        className="advanced-search-v2__button advanced-search-v2__button--primary"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0066cc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold"
        }}
      >
        {t("advancedSearchSearchButtonText")}
      </button>
      <button
        onClick={onClear}
        className="advanced-search-v2__button advanced-search-v2__button--secondary"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "1rem"
        }}
      >
        {t("advancedSearchResetText")}
      </button>
    </div>
  );
};

export default AdvancedSearchActionButtons;
