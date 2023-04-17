import React, { ReactNode, FC } from "react";
import Disclosure from "../../components/Disclosures/disclosure";
import DisclosureSummary from "../../components/Disclosures/DisclosureSummary";

export interface MaterialDisclosureProps {
  dataCy: string;
  title: string;
  icon: string;
  children?: ReactNode;
}

const MaterialDisclosure: FC<MaterialDisclosureProps> = ({
  title,
  icon,
  children,
  dataCy
}) => {
  return (
    <Disclosure
      dataCy={dataCy}
      summary={<DisclosureSummary title={title} mainIconPath={icon} />}
    >
      {children}
    </Disclosure>
  );
};

export default MaterialDisclosure;
