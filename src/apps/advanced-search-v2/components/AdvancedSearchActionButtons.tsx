import React from "react";
import { useText } from "../../../core/utils/text";
import { Button } from "../../../components/Buttons/Button";

interface AdvancedSearchActionButtonsProps {
  onSearch: () => void;
  onClear: () => void;
  showReset?: boolean;
}

const AdvancedSearchActionButtons: React.FC<
  AdvancedSearchActionButtonsProps
> = ({ onSearch, onClear, showReset = true }) => {
  const t = useText();

  return (
    <div className="advanced-search-v2__action-buttons">
      <Button
        label={t("advancedSearchSearchButtonText")}
        buttonType="none"
        collapsible={false}
        size="large"
        variant="filled"
        onClick={onSearch}
      />
      {showReset && (
        <Button
          label={t("advancedSearchResetText")}
          buttonType="none"
          collapsible={false}
          size="large"
          variant="outline"
          onClick={onClear}
          classNames="advanced-search-v2__reset-button"
        />
      )}
    </div>
  );
};

export default AdvancedSearchActionButtons;
