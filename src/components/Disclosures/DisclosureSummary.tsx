import React from "react";
import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import Heading, { HeadingLevelType } from "../Heading/Heading";
import Pagefold from "../pagefold/Pagefold";
import { useText } from "../../core/utils/text";

type DisclosureSummaryProps = {
  title: string;
  headingLevel: HeadingLevelType;
  mainIconPath?: string;
  isAvailable?: boolean;
};

const DisclosureSummary: React.FunctionComponent<DisclosureSummaryProps> = ({
  title,
  headingLevel,
  mainIconPath,
  isAvailable
}) => {
  const t = useText();
  return (
    <>
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
    </>
  );
};

export default DisclosureSummary;
