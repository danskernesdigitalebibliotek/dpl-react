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
    <div className="advanced-search-v2__action-buttons">
      <button
        onClick={onSearch}
        className="advanced-search-v2__button advanced-search-v2__button--primary"
      >
        {t("advancedSearchSearchButtonText")}
      </button>
      <button
        onClick={onClear}
        className="advanced-search-v2__button advanced-search-v2__button--secondary"
      >
        {t("advancedSearchResetText")}
      </button>
    </div>
  );
};

export default AdvancedSearchActionButtons;
