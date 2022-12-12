import React from "react";
import IconInfo from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-info.svg";

export type PromoBarIconType = "info";

export type PromoBarIconProps = {
  type: PromoBarIconType;
};

export const PromoBarIcon: React.FunctionComponent<PromoBarIconProps> = ({
  type
}) => {
  if (type === "info") {
    return <img src={IconInfo} alt="" />;
  }
  return null;
};
