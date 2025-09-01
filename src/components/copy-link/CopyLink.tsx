import React, { useState } from "react";
import LinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/link.svg";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg";
import clsx from "clsx";
import { useText } from "../../core/utils/text";

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
  const [isCopied, setIsCopied] = useState(false);
  const t = useText();

  const defaultLabel = label || t("copyLinkDefaultText");
  const defaultSuccessLabel = successLabel || t("copyLinkSuccessText");

  const handleCopyLink = () => {
    const linkToCopy = url || window.location.href;
    navigator.clipboard.writeText(linkToCopy);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, successDuration);
  };

  return (
    <button
      className={clsx("copy-link", className, {
        "copy-link--success": isCopied
      })}
      onClick={handleCopyLink}
      type="button"
    >
      <span className="link-tag text-small-caption">
        {isCopied ? defaultSuccessLabel : defaultLabel}
      </span>
      <img src={isCopied ? CheckIcon : LinkIcon} alt="" aria-hidden="true" />
    </button>
  );
};

export default CopyLink;
