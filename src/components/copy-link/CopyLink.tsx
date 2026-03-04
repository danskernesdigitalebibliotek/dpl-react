import React from "react";
import LinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/link.svg";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check_small.svg";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import useCopyToClipboard from "../../core/utils/useCopyToClipboard";

export interface CopyLinkProps {
  label?: string;
  successLabel?: string;
  url?: string;
  className?: string;
  successDuration?: number;
}

const CopyLink: React.FC<CopyLinkProps> = ({
  label,
  successLabel,
  url,
  className,
  successDuration = 2000
}) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard(successDuration);
  const t = useText();

  const defaultLabel = label || t("copyLinkDefaultText");
  const defaultSuccessLabel = successLabel || t("copyLinkSuccessText");

  const handleCopyLink = () => {
    const linkToCopy = url || window.location.href;
    copyToClipboard(linkToCopy);
  };

  return (
    <button
      className={clsx("copy-link", className)}
      onClick={handleCopyLink}
      type="button"
    >
      <span
        className={clsx("link-tag text-small-caption", {
          "copy-link--success": isCopied
        })}
      >
        {isCopied ? defaultSuccessLabel : defaultLabel}
      </span>
      <img src={isCopied ? CheckIcon : LinkIcon} alt="" aria-hidden="true" />
    </button>
  );
};

export default CopyLink;
