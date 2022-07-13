import ExpandMoreIcon from "@reload/dpl-design-system/build/icons/collection/ExpandMore.svg";
import React, { FC, ReactNode } from "react";
import { useText } from "../../../core/utils/text";

export interface DisclosureProps {
  svgIcon: { path: string; altText: string };
  title: string;
  children?: ReactNode;
}

export const Disclosure: FC<DisclosureProps> = ({
  title,
  children,
  svgIcon: { path, altText }
}) => {
  const t = useText();
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
          alt={t("disclosureIconExpandAltText")}
        />
      </summary>
      {children}
    </details>
  );
};

export default Disclosure;
