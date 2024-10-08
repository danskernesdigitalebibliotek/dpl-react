import React, { FC } from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { LibraryType } from "./helper";

const OpeningHoursSidebarSummary: FC<Pick<LibraryType, "name">> = ({
  name
}) => {
  return (
    <>
      <h3 className="opening-hours-sidebar-summary__name">{name}</h3>
      <img
        src={IconExpand}
        alt=""
        className="opening-hours-sidebar-summary__icon"
      />
    </>
  );
};

export default OpeningHoursSidebarSummary;
