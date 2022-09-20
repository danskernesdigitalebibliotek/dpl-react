import { UseMutateFunction } from "react-query";
import {
  AuthenticatedPatronV6,
  PatronV5,
  UpdatePatronRequestV4
} from "../../../core/fbs/model";

export type ModalReservationFormTextType = "email" | "sms";

export const modalReservationFormId = (type: ModalReservationFormTextType) =>
  `modal-reservation-form-${type}`;

export const constructPatronSaveData = ({
  type,
  value,
  patron: {
    preferredPickupBranch,
    preferredLanguage,
    receiveSms,
    receivePostalMail,
    receiveEmail,
    emailAddress,
    phoneNumber
  }
}: {
  type: string;
  value: string;
  patron: PatronV5;
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
  patron: PatronV5;
  mutate: UseMutateFunction<
    AuthenticatedPatronV6 | null,
    void,
    {
      data: UpdatePatronRequestV4;
    },
    unknown
  >;
};

export const saveText = ({
  type,
  changedText,
  savedText,
  patron,
  mutate
}: SaveText) => {
  return new Promise((resolve, reject) => {
    const textDiffers = changedText !== savedText;
    const updatedPatronData = constructPatronSaveData({
      type,
      value: changedText,
      patron
    });

    // If we cannot construct the updated patron data we do not want to save anything.
    if (!updatedPatronData) {
      reject(new Error("Cannot construct updated patron data"));
      return;
    }
    // If the email address is the same we do not want to save anything.
    if (!textDiffers) {
      resolve("");
      return;
    }

    // Update user data.
    mutate(
      {
        data: {
          patron: updatedPatronData
        }
      },
      {
        onSuccess: (response) => {
          if (!response) {
            reject(new Error("We did not get a response from the server"));
            return;
          }
          resolve(response);
        },
        onError: (e) => {
          reject(e);
        }
      }
    );
  });
};

export default {};
