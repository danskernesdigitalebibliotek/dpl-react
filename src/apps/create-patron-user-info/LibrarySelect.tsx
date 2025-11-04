import clsx from "clsx";
import React from "react";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { TBranch } from "../../core/utils/branches";

export type InputProps = {
  label: string;
  id: string;
  description?: string;
  classNames?: string;
  selectedBranch?: TBranch;
  required?: boolean;
  onClickCallback?: () => void;
};

function LibrarySelect({
  label,
  id,
  description,
  classNames,
  selectedBranch,
  onClickCallback
}: InputProps) {
  return (
    <div className={clsx("library-select-button-wrapper", classNames)}>
      <label htmlFor={id}>{label}</label>
      <button
        type="button"
        className="library-select-button"
        onClick={onClickCallback}
        aria-labelledby={`${id}-label`}
      >
        {selectedBranch ? (
          <div>
            <p className="library-select-button__name">
              {selectedBranch.title}
            </p>
            {selectedBranch.location && (
              <div className="library-select-button__address">
                <p>{selectedBranch.location.address}</p>
                <p>{selectedBranch.location.city}</p>
              </div>
            )}
          </div>
        ) : (
          <div>{label}</div>
        )}
        <img
          className="library-select-button__icon"
          src={ExpandIcon}
          alt="various-icon"
        />
        {/* This hidden input is used to handle validation on form submit */}
        <input
          type="text"
          id={id}
          className="library-select-button__hidden-input"
          required
          value={selectedBranch?.title || ""}
          aria-hidden="true"
          tabIndex={-1}
        />
      </button>

      {description && (
        <div
          className="library-select-button-wrapper__description"
          id={`description-${id}`}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export default LibrarySelect;
