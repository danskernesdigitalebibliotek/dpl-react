import React from "react";
import Link from "../atoms/links/Link";

export type CardListInfoBoxProps = {
  title?: string;
  html?: string;
  buttonLabel?: string;
  buttonUrl?: URL;
};

const CardListInfoBox = ({
  title,
  html,
  buttonLabel,
  buttonUrl
}: CardListInfoBoxProps) => {
  return (
    <div className="card-list-info-box pagefold-parent--medium">
      <div className="pagefold-triangle--medium pagefold-inherit-parent" />

      <div className="card-list-info-box__icon cover cover--size-small cover--aspect-small" />
      <div className="card-list-info-box__content">
        <div className="card-list-info-box__text">
          <h3 className="card-list-info-box__title text-header-h4 mb-8">
            {title}
          </h3>
          <div
            className="text-body-small-regular"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html || "" }}
          />
        </div>

        {buttonLabel && buttonUrl && (
          <div className="card-list-info-box__button-wrapper">
            <Link
              href={buttonUrl}
              className="btn-primary btn-outline btn-xsmall"
            >
              {buttonLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardListInfoBox;
