import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useCopyToClipboard } from "react-use";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg";
import { useText } from "../../core/utils/text";

export type PreviewSectionProps = {
  dataCy?: string;
  translatedCql: string;
  reset: () => void;
  isMobile?: boolean;
  setIsFormMode: (newState: boolean) => void;
};

const PreviewSection: React.FC<PreviewSectionProps> = ({
  dataCy = "preview-section",
  translatedCql,
  reset,
  isMobile,
  setIsFormMode
}) => {
  const t = useText();
  // The "value" isn't used, but needs to be destructured from the hook.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, copy] = useCopyToClipboard();
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);

  useEffect(() => {
    if (copiedToClipboard) {
      setTimeout(() => {
        setCopiedToClipboard(false);
      }, 2000);
    }
    return () => {};
  }, [copiedToClipboard]);

  return (
    <div
      data-cy={dataCy}
      className={clsx("pagefold-parent--large input-and-preview__preview", {
        "input-and-preview__preview--mobile": isMobile
      })}
    >
      <div className="pagefold-triangle--large pagefold-inherit-parent" />
      <h3 className="text-body-medium-medium mb-24 capitalize-first">
        {t("advancedSearchPreviewHeadlineText")}
      </h3>
      <p
        data-cy={`${dataCy}-preview`}
        className="text-body-medium-regular mb-32"
      >
        {translatedCql || t("advancedSearchPreviewEmptyText")}
      </p>
      <section>
        <button
          type="button"
          className="link-tag mr-16 cursor-pointer capitalize-first"
          onClick={() => reset()}
          data-cy="advanced-search-reset"
        >
          {t("advancedSearchResetText")}
        </button>
        {translatedCql && (
          <button
            type="button"
            className={clsx("link-tag mr-16 capitalize-first", {
              "cursor-pointer": !copiedToClipboard
            })}
            onClick={() => {
              copy(translatedCql);
              setCopiedToClipboard(true);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                copy(translatedCql);
                setCopiedToClipboard(true);
              }
            }}
          >
            {copiedToClipboard && (
              <>
                {t("copiedToClipboardText")}
                <img className="inline-icon" src={CheckIcon} alt="" />
              </>
            )}
            {!copiedToClipboard && t("advancedSearchCopyStringText")}
          </button>
        )}
        <button
          type="button"
          className="link-tag link-tag cursor-pointer capitalize-first"
          onClick={() => setIsFormMode(false)}
          onKeyUp={(e) => e.key === "Enter" ?? setIsFormMode(false)}
          data-cy="advanced-search-edit-cql"
        >
          {t("advancedSearchEditCqlText")}
        </button>
      </section>
    </div>
  );
};

export default PreviewSection;
