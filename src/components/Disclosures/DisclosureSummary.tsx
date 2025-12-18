import React from "react";
import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import Heading, { HeadingLevelType } from "../Heading/Heading";
import Pagefold from "../pagefold/Pagefold";
import { useText } from "../../core/utils/text";

export type DisclosureSummaryProps = {
  title: string;
  headingLevel?: HeadingLevelType;
  mainIconPath?: string;
  isAvailable?: boolean;
  /** Whether this material is non-physical (online/digital). Defaults to false (physical). */
  isNonPhysical?: boolean;
  itemRef?: React.MutableRefObject<null>;
  className?: string;
  dataCy?: string;
};

const DisclosureSummary: React.FunctionComponent<DisclosureSummaryProps> = ({
  title,
  headingLevel = "h3",
  mainIconPath,
  isAvailable,
  isNonPhysical = false,
  itemRef,
  className,
  dataCy = "disclosure-summary"
}) => {
  const t = useText();

  const getAvailableText = () => {
    // Use different text for physical vs non-physical materials when available
    return isNonPhysical
      ? t("availabilityAvailableText")
      : t("availabilityAvailablePhysicalText");
  };
  return (
    <summary
      ref={itemRef}
      className={clsx("disclosure__headline text-body-large ", className)}
      data-cy={dataCy}
    >
      {mainIconPath && (
        <div className="disclosure__icon bg-identity-tint-120">
          <img className="invert" src={mainIconPath} alt="" />
        </div>
      )}

      <Heading
        level={headingLevel}
        className={`text-body-large disclosure__text${
          isAvailable !== undefined ? "--shorter" : ""
        }`}
      >
        {title}
      </Heading>
      {isAvailable !== undefined && (
        <Pagefold
          text={
            isAvailable ? getAvailableText() : t("availabilityUnavailableText")
          }
          state={isAvailable ? "success" : "alert"}
        />
      )}
      <img
        className="disclosure__expand noselect"
        src={ExpandMoreIcon}
        alt=""
      />
    </summary>
  );
};

export default DisclosureSummary;
