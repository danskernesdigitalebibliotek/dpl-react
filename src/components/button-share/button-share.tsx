import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import FacebookIcon from "./facebook-icon";
import LinkIcon from "./link-icon";
import { useText } from "../../core/utils/text";

type ButtonShareProps = {
  className?: string;
};

const ButtonShare: React.FC<ButtonShareProps> = ({ className }) => {
  const t = useText();
  const { href } = window.location;
  const facebookShareUrl = "https://www.facebook.com/sharer/sharer.php";
  const shareUrl = `${facebookShareUrl}?u=${href}`;

  const shareButtonAreaLabel = "Share this page on Facebook";
  const copyButtonAreaLabel = "Copy this page to clipboard";

  const [showFixedButtons, setShowFixedButtons] = useState(true);
  const shareButton = useRef<HTMLAnchorElement>(null);

  const onShareButtonClick = () => {
    navigator.clipboard.writeText(href);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowFixedButtons(false);
          } else {
            setShowFixedButtons(true);
          }
        });
      },
      { threshold: 1 }
    );

    if (shareButton.current) {
      observer.observe(shareButton.current);
    }

    return () => {
      if (shareButton.current) {
        observer.unobserve(shareButton.current);
      }
    };
  }, []);

  return (
    <div className={clsx("button-share", className)}>
      {showFixedButtons && (
        <div className="button-share button-share--fixed">
          <a
            href={shareUrl}
            aria-label={shareButtonAreaLabel}
            className="button-share__button button-share__button--fixed"
          >
            <FacebookIcon />
          </a>
          <button
            type="button"
            onClick={onShareButtonClick}
            aria-label={copyButtonAreaLabel}
            className="button-share__button button-share__button--fixed"
          >
            <LinkIcon />
          </button>
        </div>
      )}
      <a
        ref={shareButton}
        href={shareUrl}
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
        className="button-share__button"
      >
        <LinkIcon />
        {t("copyLinkText")}
      </button>
    </div>
  );
};

export default ButtonShare;
