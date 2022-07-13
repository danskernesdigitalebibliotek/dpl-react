import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import React, { FC, ReactNode } from "react";

export interface DisclosureProps {
  MainIcon: { path: string; altText: string };
  title: string;
  children?: ReactNode;
  disclosureIconExpandAltText: string;
}

export const Disclosure: FC<DisclosureProps> = ({
  title,
  children,
  MainIcon: { path, altText },
  disclosureIconExpandAltText
}) => {
  return (
    <details className="disclosure text-body-large">
      <summary className="disclosure__headline text-body-large">
        <div className="disclosure__icon bg-identity-tint-120 m-24">
          <img className="disclosure__icon" src={path} alt={altText} />
        </div>
        {title}
        <img
          className="disclosure__expand mr-24 noselect"
          src={ExpandMoreIcon}
          alt={disclosureIconExpandAltText}
        />
      </summary>
      {children}
    </details>
  );
};

export default Disclosure;
