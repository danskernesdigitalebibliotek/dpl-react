import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useCopyToClipboard } from "react-use";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg";
import { useText } from "../../core/utils/text";

export type PreviewSectionProps = {
  translatedCql: string;
  reset: () => void;
  isMobile?: boolean;
  setIsAdvancedSearchHeader: (newState: boolean) => void;
};

const PreviewSection: React.FC<PreviewSectionProps> = ({
  translatedCql,
  reset,
  isMobile,
  setIsAdvancedSearchHeader
}) => {
  const t = useText();
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
          onClick={() => reset()}
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
          onClick={() => setIsAdvancedSearchHeader(false)}
          onKeyUp={(e) => e.key === "Enter" ?? setIsAdvancedSearchHeader(false)}
        >
          {t("advancedSearchEditCqlText")}
        </button>
      </section>
    </div>
  );
};

export default PreviewSection;
