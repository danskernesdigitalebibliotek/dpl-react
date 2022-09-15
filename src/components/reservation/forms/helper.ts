import { QueryClient, UseMutateFunction } from "react-query";
import { getGetPatronInformationByPatronIdV2QueryKey } from "../../../core/fbs/fbs";
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
  queryClient: QueryClient;
};

export const saveText = ({
  type,
  changedText,
  savedText,
  patron,
  mutate,
  queryClient
}: SaveText) => {
  // If we do not have an email address, we do not want to save anything.
  if (!changedText) {
    return;
  }
  const textDiffers = changedText !== savedText;
  const updatedPatronData = constructPatronSaveData({
    type,
    value: changedText,
    patron
  });

  // If cannot construct the updated patron data or the email address is the same,
  // we do not want to save anything.
  if (!updatedPatronData || !textDiffers) {
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
          return;
        }
        // If we succeeded in mutating we can cache the new data.
        queryClient.setQueryData(
          getGetPatronInformationByPatronIdV2QueryKey(),
          response
        );
      },
      onError: () => {
        throw new Error("Error updating patron data");
      }
    }
  );
};

export default {};
