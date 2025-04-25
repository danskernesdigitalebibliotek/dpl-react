import { PatronV5 } from "../../../core/fbs/model";
import useSavePatron from "../../../core/utils/useSavePatron";
import { Patron } from "../../../core/utils/types/entities";

export type ModalReservationFormTextType =
  | "email"
  | "sms"
  | "pickup"
  | "interestPeriod";

export const modalReservationFormId = (type: ModalReservationFormTextType) =>
  `modal-reservation-form-${type}`;

export const constructPatronSaveData = ({
  type,
  value,
  patron: { preferredPickupBranch, preferredLanguage, receivePostalMail }
}: {
  type: string;
  value: string;
  patron: Patron;
}) => {
  const defaultData = {
    preferredPickupBranch,
    preferredLanguage,
    receiveSms,
    receivePostalMail,
    receiveEmail,
    emailAddress,
    phoneNumber
  };
  switch (type) {
    case "email":
      return {
        ...defaultData,
        emailAddress: value,
        receiveEmail: true
      };
    case "sms":
      return {
        ...defaultData,
        phoneNumber: value,
        receiveSms: true
      };
    default:
      return null;
  }
};

type SaveText = {
  type: ModalReservationFormTextType;
  changedText: string;
  savedText?: string;
  patron: Patron;
  savePatron: ReturnType<typeof useSavePatron>["savePatron"];
};

export const saveText = ({
  type,
  changedText,
  savedText,
  patron,
  savePatron
}: SaveText) => {
  const textDiffers = changedText !== savedText;
  const updatedPatronData = constructPatronSaveData({
    type,
    value: changedText,
    patron
  });

  // If we cannot construct the updated patron data we do not want to save anything.
  if (!updatedPatronData) {
    throw new Error("Cannot construct updated patron data");
  }
  // If the text has not changed we do not want to save anything.
  if (!textDiffers) {
    return;
  }

  // Update patron data.
  savePatron(updatedPatronData);
};

export function modalReservationFormSelectTypeIsInterestPeriod(
  type: ModalReservationFormTextType
): type is "interestPeriod" {
  return type === "interestPeriod";
}

export default {};
