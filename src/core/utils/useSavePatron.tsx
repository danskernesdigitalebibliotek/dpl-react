import { useQueryClient } from "react-query";
import { Patron } from "./types/entities";
import {
  PatronSettingsV4,
  PatronSettingsV6,
  PincodeChange
} from "../fbs/model";
import {
  getGetPatronInformationByPatronIdV4QueryKey,
  useUpdateV8
} from "../fbs/fbs";

export interface FetchHandlers {
  onSuccess?: () => void;
  onError?: () => void;
}

interface UseSavePatron {
  patron?: Patron;
  fetchHandlers?: {
    savePatron?: FetchHandlers;
    savePincode?: FetchHandlers;
  };
}

const useSavePatron = ({ patron, fetchHandlers }: UseSavePatron) => {
  const { mutate } = useUpdateV8();
  const queryClient = useQueryClient();

  const savePatron = (data: Partial<PatronSettingsV4>) => {
    const { onSuccess, onError } = fetchHandlers?.savePatron || {};

    if (!patron) {
      return;
    }

    mutate(
      {
        data: {
          patron: {
            ...patron,
            ...convertPatronSettingsV4toV6(data),
            // Assume guardian visibility is false as we are not dealing with
            // child patrons in this client.
            guardianVisibility: false
          }
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            getGetPatronInformationByPatronIdV4QueryKey()
          );
          if (onSuccess) {
            onSuccess();
          }
        },
        // todo error handling
        onError: () => {
          if (onError) {
            onError();
          }
        }
      }
    );
  };

  const savePincode = (data: PincodeChange) => {
    const { onSuccess, onError } = fetchHandlers?.savePincode || {};
    if (!patron) {
      return;
    }

    mutate(
      {
        data: { pincodeChange: data }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            getGetPatronInformationByPatronIdV4QueryKey()
          );
          if (onSuccess) {
            onSuccess();
          }
        },
        // todo error handling
        onError: () => {
          if (onError) {
            onError();
          }
        }
      }
    );
  };

  return { savePatron, savePincode };
};

const convertPatronSettingsV4toV6 = (
  patronSettings: Partial<PatronSettingsV4>
): Partial<PatronSettingsV6> => {
  return {
    // PatronSettingsV6 supports multiple email addresses and phone numbers with
    // individual notifications. Convert the current PatronSettingsV4 with
    // single values to an array.
    emailAddresses: patronSettings.emailAddress
      ? [
          {
            emailAddress: patronSettings.emailAddress,
            receiveNotification: patronSettings.receiveEmail || false
          }
        ]
      : [],
    phoneNumbers: patronSettings.phoneNumber
      ? [
          {
            phoneNumber: patronSettings.phoneNumber,
            receiveNotification: patronSettings.receiveSms || false
          }
        ]
      : [],
    ...patronSettings
  };
};

export default useSavePatron;
