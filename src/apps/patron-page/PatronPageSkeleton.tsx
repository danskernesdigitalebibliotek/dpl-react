import React from "react";
import BasicDetailsSectionSkeleton from "./sections/BasicDetailsSectionSkeleton";
import ContactInfoSection from "../../components/contact-info-section/ContactInfoSection";
import { useText } from "../../core/utils/text";

const PatronPageSkeleton: React.FC = () => {
  const t = useText();

  return (
    <form className="dpl-patron-page">
      <h1 className="text-header-h1 my-32">{t("patronPageHeaderText")}</h1>
      <h2 className="text-header-h4 mt-32 mb-16">
        {t("patronPageBasicDetailsHeaderText")}
      </h2>
      <BasicDetailsSectionSkeleton />
      <ContactInfoSection
        changePatron={() => {}}
        patron={null}
        inLine={false}
        showCheckboxes={["email", "phone"]}
      />
    </form>
  );
};

export default PatronPageSkeleton;
