import React, { FC } from "react";
import { PatronV5 } from "../../../core/fbs/model";
import CheckBox from "../../../components/checkbox/Checkbox";
import BranchesDropdown from "../util/BranchesDropdown";
import { useText } from "../../../core/utils/text";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { getModalIds } from "../../../core/utils/helpers/modal-helpers";

export interface ChangePatronProps {
  (newValue: string | boolean, key: string): void;
}

interface ReservationDetailsSectionProps {
  patron: PatronV5;
  changePatron: ChangePatronProps;
}

const ReservationDetailsSection: FC<ReservationDetailsSectionProps> = ({
  patron,
  changePatron
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const { pauseReservation } = getModalIds();

  const openPauseReservationModal = () => {
    open(pauseReservation as string);
  };

  return (
    <section data-cy="pickup-reservations-section">
      <h2 className="text-header-h4 mt-32 mb-16">
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

      <h3 className="text-body-small-regular mt-32 mb-16">
        {t("patronPagePauseReservationsHeaderText")}
      </h3>
      <p className="text-body-small-regular mb-8">
        {t("patronPagePauseReservationsBodyText")}
      </p>
      <CheckBox
        className="my-16"
        id="show-reservation-pause-section"
        onChecked={openPauseReservationModal}
        ariaLabel={t("patronPageOpenPauseReservationsSectionAriaText")}
        selected={false}
        label={t("patronPageOpenPauseReservationsSectionText")}
      />
    </section>
  );
};

export default ReservationDetailsSection;
