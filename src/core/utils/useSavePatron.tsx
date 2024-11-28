import { useQueryClient } from "react-query";
import { Patron } from "./types/entities";
import { PatronSettingsV4, PincodeChange } from "../fbs/model";
import {
  getGetPatronInformationByPatronIdV2QueryKey,
  useUpdateV5
} from "../fbs/fbs";
import { useUrls } from "./url";

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
  const u = useUrls();
  const { mutate } = useUpdateV5();
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
            getGetPatronInformationByPatronIdV2QueryKey()
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
        onSuccess: async () => {
          queryClient.invalidateQueries(
            getGetPatronInformationByPatronIdV2QueryKey()
          );

          // re-login user to re-fetch new token (the LMS token will be changed on password change)
          try {
            const userInfoEndpoint =
              document
                .querySelector("[data-userinfo-url]")
                ?.getAttribute("data-userinfo-url") || "";
            const isLmsApi =
              userInfoEndpoint.includes("lms") &&
              userInfoEndpoint.includes("/oauth/userinfo");

            if (isLmsApi) {
              const logoutUrl = u("logoutUrl");
              const loginUrl = u("menuLoginUrl");

              await window.fetch(logoutUrl.toString());

              loginUrl.searchParams.set(
                "current-path",
                window.location.pathname
              );
              window.location.href = loginUrl.toString();

              return;
            }
          } catch (error) {
            // eslint-disable-next-line
            console.error(error);
          }

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
