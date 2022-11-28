import React from "react";

import iconTriangle from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-triangle.svg";
import iconExpandMore from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";

const DropdownIcon = ({
  arrowIcon
}: {
  arrowIcon: "triangles" | "chevron";
}) => {
  if (arrowIcon === "triangles") {
    return (
      <span>
        <img className="dropdown__arrow" src={iconTriangle} alt="" />
        <img
          className="dropdown__arrow dropdown__arrow--bottom"
          src={iconTriangle}
          alt=""
        />
      </span>
    );
  }

  if (arrowIcon === "chevron") {
    return <img className="dropdown__arrow" src={iconExpandMore} alt="" />;
  }

  return null;
};

export default DropdownIcon;
