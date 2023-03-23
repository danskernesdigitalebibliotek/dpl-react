import React from "react";
import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import Heading, { HeadingLevelType } from "../Heading/Heading";
import Pagefold from "../pagefold/Pagefold";
import { useText } from "../../core/utils/text";

export type DisclosureSummaryProps = {
  title: string;
  headingLevel?: HeadingLevelType;
  mainIconPath?: string;
  isAvailable?: boolean;
  itemRef?: React.MutableRefObject<null>;
  className?: string;
};

const DisclosureSummary: React.FunctionComponent<DisclosureSummaryProps> = ({
  title,
  headingLevel = "h3",
  mainIconPath,
  isAvailable,
  itemRef,
  className
}) => {
  const t = useText();
  return (
    <summary
      ref={itemRef}
      className={`disclosure__headline text-body-large ${className}`}
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
          text={isAvailable ? t("available") : t("unavailable")}
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
