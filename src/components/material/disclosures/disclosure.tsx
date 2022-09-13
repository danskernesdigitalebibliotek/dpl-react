import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import React, { FC, ReactNode } from "react";
import { FaustId } from "../../../core/utils/types/ids";
import { AvailabilityLabel } from "../../availability-label/availability-label";

export interface DisclosureProps {
  mainIconPath?: string;
  title: string;
  children?: ReactNode;
  disclosureIconExpandAltText?: string;
  faustId?: FaustId;
}

const Disclosure: FC<DisclosureProps> = ({
  title,
  children,
  mainIconPath,
  faustId
}) => {
  return (
    <details className="disclosure text-body-large">
      <summary className="disclosure__headline text-body-large">
        {mainIconPath && (
          <div className="disclosure__icon bg-identity-tint-120">
            <img className="invert" src={mainIconPath} alt="" />
          </div>
        )}
        <span
          className={`disclosure__headline__text${faustId ? "-shorter" : ""}`}
        >
          {title}
        </span>
        {faustId && <AvailabilityLabel faustIds={[faustId]} />}
        <img
          className="disclosure__expand noselect"
          src={ExpandMoreIcon}
          alt=""
        />
      </summary>
      {children}
    </details>
  );
};

export default Disclosure;
