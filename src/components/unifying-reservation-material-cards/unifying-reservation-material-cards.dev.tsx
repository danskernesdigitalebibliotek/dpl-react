import React from "react";
import StackableMaterial from "../../apps/loan-list/materials/stackable-material/stackable-material";
import loanListStorySettings from "../../apps/loan-list/list/loan-list.dev";
import reserVationListStorySettings from "../../apps/reservation-list/list/reservation-list.dev";
import dashBoardStorySettings from "../../apps/dashboard/dashboard.dev";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import { withText } from "../../core/utils/text";
import withIsPatronBlockedHoc from "../../core/utils/withIsPatronBlockedHoc";
import SelectableMaterial from "../../apps/loan-list/materials/selectable-material/selectable-material";
import StatusBadge from "../../apps/loan-list/materials/utils/status-badge";
import StatusMessage from "../../apps/loan-list/materials/selectable-material/StatusMessage";
import { LoanType } from "../../core/utils/types/loan-type";
import ReservationMaterial, {
  ReservationMaterialProps
} from "../../apps/reservation-list/reservation-material/reservation-material";
import ReservationInfo from "../../apps/reservation-list/reservation-material/reservation-info";

export default {
  title: "Development / Unifying reservation material cards",
  argTypes: {
    ...loanListStorySettings.argTypes,
    ...reserVationListStorySettings.argTypes,
    ...dashBoardStorySettings.argTypes
  }
};

const Template = () => {
  const stackableMaterialProps = {
    focused: false,
    loanId: null,
    loan: {
      dueDate: "2023-10-17 07:59:39+0000",
      loanDate: "2023-09-14 07:59:39+0000",
      isRenewable: false,
      materialItemNumber: "9788771076951",
      renewalStatusList: [],
      loanType: null,
      identifier: "9788771076951",
      faust: null,
      loanId: null
    },
    additionalMaterials: 0,
    material: {
      title: "Mordet i det blå tog",
      lang: "dan",
      periodical: null,
      year: 2014,
      description:
        'I køen på rejsebureauet får Katherine øje på en mand, som hun samme morgen har set uden for sin hoteldør. Da hun kigger sig tilbage over skulderen, ser hun, at manden står i døråbningen og stirrer på hende, og der går en kuldegysning gennem hende …<br><br>Episoden udvikler sig til en sag for den lille belgiske mesterdetektiv, der med klædelig ubeskedenhed præsenterer sig: "Mit navn er Hercule Poirot, og jeg er formentlig den største detektiv i verden."',
      materialType: "E-book",
      externalProductId: "9788711321683",
      authors: "By Agatha Christie and Jutta Larsen",
      authorsShort: "By Agatha Christie and Jutta Larsen"
    },
    identifier: "9788771076951"
  };

  const selectableMaterialProps = {
    focused: false,
    loanId: null,
    loan: {
      dueDate: "2023-10-17 07:59:39+0000",
      loanDate: "2023-09-14 07:59:39+0000",
      isRenewable: false,
      materialItemNumber: "9788771076951",
      renewalStatusList: [],
      loanType: null,
      identifier: "9788771076951",
      faust: null,
      loanId: null
    },
    additionalMaterials: 0,
    material: {
      title: "Mordet i det blå tog",
      lang: "dan",
      periodical: null,
      year: 2014,
      description:
        'I køen på rejsebureauet får Katherine øje på en mand, som hun samme morgen har set uden for sin hoteldør. Da hun kigger sig tilbage over skulderen, ser hun, at manden står i døråbningen og stirrer på hende, og der går en kuldegysning gennem hende …<br><br>Episoden udvikler sig til en sag for den lille belgiske mesterdetektiv, der med klædelig ubeskedenhed præsenterer sig: "Mit navn er Hercule Poirot, og jeg er formentlig den største detektiv i verden."',
      materialType: "E-book",
      externalProductId: "9788711321683",
      authors: "By Agatha Christie and Jutta Larsen",
      authorsShort: "By Agatha Christie and Jutta Larsen"
    },
    identifier: "9788771076951"
  };
  const loanType: LoanType = selectableMaterialProps.loan;

  const reservationMaterialProps = {
    focused: false,
    reservation: {
      periodical: "",
      faust: "61840974",
      dateOfReservation: "2022-06-13T17:09:20.695",
      expiryDate: "2022-10-10",
      numberInQueue: null,
      state: "readyForPickup",
      pickupBranch: "DK-775100",
      pickupDeadline: "2022-06-20",
      pickupNumber: "Reserveringshylde 115",
      reservationId: 67789646
    },
    material: {
      lang: "dan",
      authors: "David Baldacci",
      authorsShort: "David Baldacci",
      firstAuthor: "David Baldacci",
      pid: "870970-basis:61840974",
      title: "Farligt øjenvidne",
      year: "2021",
      description:
        "Præsident Richmond har begået et mord, og er overbevist om, at han slipper fra det, så han kræver, at morderen findes. Desværre har tyven Luther Whitney været vidne til mordet.",
      series: "",
      materialType: "bog"
    },
    faust: "61840974",
    openReservationDetailsModal: (): void => {}
  } as ReservationMaterialProps;

  return (
    <div className="loan-list-page">
      <h2>Loan list material</h2>
      <div className="list-reservation-container">
        <StackableMaterial
          {...stackableMaterialProps}
          openLoanDetailsModal={() => {}}
          openDueDateModal={() => {}}
        />
      </div>
      <h2>Group modal loans list material</h2>
      <ul className="modal-loan__list-materials">
        <SelectableMaterial
          {...selectableMaterialProps}
          id={selectableMaterialProps.identifier}
          statusBadgeComponent={
            <StatusBadge badgeDate={loanType.dueDate} neutralText="" />
          }
          statusMessageComponentDesktop={
            <ReservationInfo
              reservationInfo={reservationMaterialProps.reservation}
              showArrow={false}
              showStatusCircleIcon={false}
              reservationStatusClassNameOverride=""
            />
          }
          statusMessageComponentMobile={
            <StatusMessage
              className="list-materials__status__note-mobile"
              loanType={loanType.loanType}
              renewalStatusList={loanType.renewalStatusList}
            />
          }
        />
      </ul>
      <h2>Reservation List</h2>
      <ul className="list-reservation-container">
        <ReservationMaterial {...reservationMaterialProps} />
      </ul>
    </div>
  );
};

const WrappedTemplate = withConfig(
  withUrls(withText(withIsPatronBlockedHoc(Template)))
);

export const ComparisonOfThreeCards = WrappedTemplate.bind({});
