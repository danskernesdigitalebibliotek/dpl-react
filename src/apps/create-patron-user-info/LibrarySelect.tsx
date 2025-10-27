import clsx from "clsx";
import React from "react";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";

export type InputProps = {
  label: string;
  id: string;
  description?: string;
  validation?: string;
  classNames?: string;
  selectedBranch?: {
    branchId: string;
    title: string;
    location: {
      lat: string;
      lng: string;
      value: string;
      address: string;
      city: string;
    };
  };
  required?: boolean;
  onClickCallback?: () => void;
};

function LibrarySelect({
  label,
  id,
  description,
  validation,
  classNames,
  selectedBranch,
  onClickCallback
}: InputProps) {
  return (
    <div
      className={clsx("dpl-input", classNames, {
        "dpl-input--invalid": !!validation
      })}
    >
      <label id={id} className="mb-8">
        {label}
      </label>
      <button
        type="button"
        className="library-select-button"
        id={id}
        onClick={onClickCallback}
      >
        {selectedBranch ? (
          <div>
            <p className="library-select-button__name">
              {selectedBranch.title}
            </p>
            <div className="library-select-button__address">
              <p>{selectedBranch.location.address}</p>
              <p>{selectedBranch.location.city}</p>
            </div>
          </div>
        ) : (
          <div>Vælg bibliotek</div>
        )}
        <img
          className="library-select-button__icon"
          src={ExpandIcon}
          alt="various-icon"
        />
      </button>
      {description && (
        <div className="dpl-input__description" id={`description-${id}`}>
          {description}
        </div>
      )}
      {validation && (
        <div id={`validation-${id}`} className="dpl-input__validation">
          {validation}
        </div>
      )}
    </div>
  );
}

export default LibrarySelect;
