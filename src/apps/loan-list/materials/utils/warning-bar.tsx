import React, { FC, useId } from "react";
import IconWarning from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import Link from "../../../../components/atoms/links/Link";
import LinkButton from "../../../../components/Buttons/LinkButton";
import { Button } from "../../../../components/Buttons/Button";

interface WarningBarProps {
  linkText?: string;
  overdueText?: string;
  rightButtonText?: string;
  rightButtonAriaLabelText?: string;
  rightText?: string;
  leftLink?: URL;
  rightLink?: URL;
  classNames?: string;
  rightAction?: () => void;
}

const WarningBar: FC<WarningBarProps> = ({
  linkText,
  overdueText,
  rightText,
  rightButtonText,
  rightButtonAriaLabelText,
  leftLink,
  rightLink,
  classNames,
  rightAction
}) => {
  const labelId = useId();

  return (
    <div
      className={`warning-bar bg-global-secondary${` ${classNames}`}`}
      data-cy="warning-bar"
    >
      <div className="warning-bar__left">
        <img className="warning-bar__icon" src={IconWarning} alt="" />
        <div>
          <p
            className="text-body-medium-regular color-primary-black"
            data-cy="warning-bar-text"
          >
            {overdueText}
            {leftLink && (
              <Link
                href={leftLink}
                className="link-tag color-secondary-gray ml-8"
              >
                {linkText}
              </Link>
            )}
          </p>
        </div>
      </div>
      {(rightText || rightLink || rightAction) && (
        <div className="warning-bar__right">
          {rightText && (
            <p
              className="text-body-medium-medium warning-bar__owes"
              data-cy="warning-bar-right-text"
            >
              {rightText}
            </p>
          )}{" "}
          {rightLink && (
            <>
              <span className="hide-visually" id={labelId}>
                {rightButtonAriaLabelText}
              </span>

              <LinkButton
                dataCy="warning-bar-right-link"
                url={rightLink}
                size="small"
                variant="filled"
                ariaLabelledBy={labelId}
              >
                {rightButtonText || ""}
              </LinkButton>
            </>
          )}
          {!!rightAction && !!rightButtonText && (
            <Button
              size="small"
              variant="filled"
              buttonType="none"
              collapsible={false}
              disabled={false}
              label={rightButtonText}
              onClick={rightAction}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WarningBar;
