import React, { ReactNode, FC } from "react";
import Disclosure from "../../components/Disclosures/disclosure";
import DisclosureSummary from "../../components/Disclosures/DisclosureSummary";

export interface MaterialDisclosureProps {
  dataCy: string;
  title: string;
  icon: string;
  children?: ReactNode;
  open?: boolean;
}

const MaterialDisclosure: FC<MaterialDisclosureProps> = ({
  title,
  icon,
  children,
  dataCy,
  open
}) => {
  return (
    <Disclosure
      dataCy={dataCy}
      open={open}
      summary={<DisclosureSummary title={title} mainIconPath={icon} />}
    >
      {children}
    </Disclosure>
  );
};

export default MaterialDisclosure;
