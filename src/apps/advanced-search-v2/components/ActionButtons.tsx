import React from "react";

interface ActionButtonsProps {
  onSearch: () => void;
  onClear: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSearch, onClear }) => {
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
        Search
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
        Clear All
      </button>
    </div>
  );
};

export default ActionButtons;
