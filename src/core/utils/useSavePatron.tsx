import { useQueryClient } from "react-query";
import { Patron } from "./types/entities";
import { PatronSettingsV4, PincodeChange } from "../fbs/model";
import {
  getGetPersonTypePatronInformationV2QueryKey,
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
        data: { patron: { ...patron, ...data } }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(
            getGetPersonTypePatronInformationV2QueryKey()
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
            getGetPersonTypePatronInformationV2QueryKey()
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

export default useSavePatron;
