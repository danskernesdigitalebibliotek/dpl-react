import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check_small.svg";
import FacebookIcon from "./facebook-icon";
import LinkIcon from "./link-icon";
import { useText } from "../../core/utils/text";
import useCopyToClipboard from "../../core/utils/useCopyToClipboard";

type ButtonShareProps = {
  className?: string;
};

const ButtonShare: React.FC<ButtonShareProps> = ({ className }) => {
  const t = useText();
  const { href } = window.location;
  const facebookShareUrl = "https://www.facebook.com/sharer/sharer.php";
  const shareUrl = `${facebookShareUrl}?u=${href}`;

  const shareButtonAreaLabel = t("shareOnFacebookAriaLabelText");
  const copyButtonAreaLabel = t("copyLinkAriaLabelText");

  const [showFixedButtons, setShowFixedButtons] = useState(true);
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const shareButtonRef = useRef<HTMLAnchorElement>(null);

  const onShareButtonClick = () => {
    copyToClipboard(href);
  };

  // Hide fixed buttons when share button is in view or above viewport
  useEffect(() => {
    const shareButton = shareButtonRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);
        const isAboveViewport = entries.some((entry) => {
          // return true if the share button is above the viewport
          return entry.boundingClientRect.top < 0;
        });
        setShowFixedButtons(!isIntersecting && !isAboveViewport);
      },
      { threshold: 1 }
    );

    if (shareButton) {
      observer.observe(shareButton);

      return () => {
        // Clean up observer on unmount
        observer.disconnect();
      };
    }

    return () => {};
  }, []);

  const copyIcon = isCopied ? (
    <img src={CheckIcon} alt="" aria-hidden="true" />
  ) : (
    <LinkIcon />
  );

  return (
    <div className={clsx("button-share", className)}>
      {showFixedButtons && (
        <div className="button-share button-share--fixed">
          <a
            href={shareUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={shareButtonAreaLabel}
            className="button-share__button button-share__button--fixed"
          >
            <FacebookIcon />
          </a>
          <button
            type="button"
            onClick={onShareButtonClick}
            aria-label={copyButtonAreaLabel}
            className={clsx(
              "button-share__button button-share__button--fixed",
              { "button-share__button--success": isCopied }
            )}
          >
            {copyIcon}
          </button>
        </div>
      )}
      <a
        ref={shareButtonRef}
        href={shareUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={shareButtonAreaLabel}
        className="button-share__button"
      >
        <FacebookIcon />
        {t("shareOnFacebookText")}
      </a>
      <button
        type="button"
        onClick={onShareButtonClick}
        aria-label={copyButtonAreaLabel}
        className={clsx("button-share__button", {
          "button-share__button--success": isCopied
        })}
      >
        {copyIcon}
        <span aria-live="polite">
          {isCopied ? t("copyLinkSuccessText") : t("copyLinkText")}
        </span>
      </button>
    </div>
  );
};

export default ButtonShare;
