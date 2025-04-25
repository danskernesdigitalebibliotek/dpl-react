import React, { FC } from "react";
import BranchesDropdown from "../util/BranchesDropdown";
import { useText } from "../../../core/utils/text";
import { Patron } from "../../../core/utils/types/entities";

export interface ChangePatronProps {
  (newValue: string | boolean, key: string): void;
}

interface ReservationDetailsSectionProps {
  patron: Patron;
  changePatron: ChangePatronProps;
}

const ReservationDetailsSection: FC<ReservationDetailsSectionProps> = ({
  patron,
  changePatron
}) => {
  const t = useText();

  return (
    <section data-cy="pickup-reservations-section">
      <h2 className="text-header-h4 mt-64 mb-16">
        {t("patronPageChangePickupHeaderText")}
      </h2>
      <p className="text-body-small-regular mb-8">
        {t("patronPageChangePickupBodyText")}
      </p>
      <BranchesDropdown
        classNames="dropdow dropdown__desktop"
        selected={patron?.preferredPickupBranch || ""}
        onChange={(newPreferredPickupBranch) =>
          changePatron(newPreferredPickupBranch, "preferredPickupBranch")
        }
      />
    </section>
  );
};

export default ReservationDetailsSection;
