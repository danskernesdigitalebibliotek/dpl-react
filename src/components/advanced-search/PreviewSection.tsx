import React from "react";
import clsx from "clsx";
import { AdvancedSearchRowData } from "../../core/utils/types/advanced-search-types";
import { useText } from "../../core/utils/text";

export type PreviewSectionProps = {
  translatedCql: string;
  setRowsData: (rowData: AdvancedSearchRowData[]) => void;
  initialRowData: AdvancedSearchRowData[];
  isMobile?: boolean;
};

const PreviewSection: React.FC<PreviewSectionProps> = ({
  translatedCql,
  setRowsData,
  initialRowData,
  isMobile
}) => {
  const t = useText();
  return (
    <div
      className={clsx("pagefold-parent--large input-and-preview__preview", {
        "input-and-preview__preview--mobile": isMobile
      })}
    >
      <div className="pagefold-triangle--large pagefold-inherit-parent" />
      <h3 className="text-body-medium-medium mb-24 capitalize-first">
        {t("advancedSearchPreviewHeadlineText")}
      </h3>
      <p className="text-body-medium-regular mb-32">
        {translatedCql || t("advancedSearchPreviewEmptyText")}
      </p>
      <section>
        <button
          type="button"
          className="link-tag mr-16 cursor-pointer capitalize-first"
          onClick={() => {
            setRowsData(initialRowData);
          }}
        >
          {t("advancedSearchResetText")}
        </button>
        <button
          type="button"
          className="link-tag mr-16 cursor-pointer capitalize-first"
        >
          {t("advancedSearchCopyStringText")}
        </button>
        <button
          type="button"
          className="link-tag link-tag cursor-pointer capitalize-first"
        >
          {t("advancedSearchEditCqlText")}
        </button>
      </section>
    </div>
  );
};

export default PreviewSection;
