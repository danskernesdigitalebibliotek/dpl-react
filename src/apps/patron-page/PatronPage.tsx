import React, { useEffect, useState, FC, FormEvent } from "react";
import { set } from "lodash";
import { useText } from "../../core/utils/text";
import Link from "../../components/atoms/links/Link";
import BasicDetailsSection from "./sections/BasicDetailsSection";
import ContactInfoSection from "../../components/contact-info-section/ContactInfoSection";
import ReservationDetailsSection from "./sections/ReservationDetailsSection";
import PincodeSection from "./sections/PincodeSection";
import StatusSection from "./sections/StatusSection";
import { useUrls } from "../../core/utils/url";
import { useNotificationMessage } from "../../core/utils/useNotificationMessage";
import { usePatronData } from "../../core/utils/helpers/usePatronData";
import PatronPageSkeleton from "./PatronPageSkeleton";
import useSavePatron from "../../core/utils/useSavePatron";
import { Patron } from "../../core/utils/types/entities";

const PatronPage: FC = () => {
  const t = useText();
  const u = useUrls();
  const deletePatronUrl = u("deletePatronUrl");
  const { data: patronData, isLoading } = usePatronData();
  const [patron, setPatron] = useState<Patron | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const [isPinChangeValid, setIsPinChangeValid] = useState<boolean>(true);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [successPinMessage, setSuccessPinMessage] = useState<string | null>(
    null
  );
  const [NotificationComponent, handleNotificationMessage] =
    useNotificationMessage();
  const { savePatron, savePincode } = useSavePatron({
    patron: patron || undefined,
    fetchHandlers: {
      savePatron: {
        onSuccess: () => {
          setDisableSubmitButton(false);
          handleNotificationMessage(
            t("patronPageHandleResponseInformationText")
          );
        },
        onError: () => {
          setDisableSubmitButton(false);
        }
      },
      savePincode: {
        onSuccess: () => {
          setDisableSubmitButton(false);
          setSuccessPinMessage(t("patronPinSavedSuccessText"));
          handleNotificationMessage(
            t("patronPageHandleResponseInformationText")
          );
        },
        onError: () => {
          setDisableSubmitButton(false);
        }
      }
    }
  });

  useEffect(() => {
    if (patronData && patronData.patron) {
      setPatron(patronData.patron);
    }
  }, [patronData]);

  if (isLoading || !patron) {
    return <PatronPageSkeleton />;
  }

  // Changes the patron object by key.
  // So using the parameters 123 and "phoneNumber" would change the phoneNumber to 123.
  const changePatron = (newValue: string | boolean, key: string) => {
    // Deeeep copy
    const copyUser = JSON.parse(JSON.stringify(patron));
    set(copyUser, key, newValue);
    setPatron(copyUser);
  };

  const save = () => {
    if (patron) {
      setDisableSubmitButton(true);
      // If pincode is changed, the pincode should be updated.
      if (pin) {
        savePincode({
          pincode: pin,
          libraryCardNumber: patron.patronId ? patron.patronId.toString() : ""
        });
      } else {
        savePatron(patron);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    save();
  };

  return (
    <form className="dpl-patron-page" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-header-h1 my-32">{t("patronPageHeaderText")}</h1>
      <NotificationComponent />
      {patron && <BasicDetailsSection patron={patron} />}
      <div className="patron-page-info">
        {patron && (
          <ContactInfoSection
            changePatron={changePatron}
            patron={patron}
            inLine={false}
            showCheckboxes={["email", "phone"]}
          />
        )}
        {patron?.resident && <StatusSection />}
        {patron && (
          <ReservationDetailsSection
            changePatron={changePatron}
            patron={patron}
          />
        )}
        {patron && (
          <PincodeSection
            changePincode={setPin}
            required={false}
            setIsPinValid={setIsPinChangeValid}
          />
        )}
        {successPinMessage && (
          <p className="text-body-small-regular mb-8 mt-8" role="alert">
            {successPinMessage}
          </p>
        )}

        <button
          data-cy="save-user-patron"
          className="mt-48 btn-primary btn-filled btn-small arrow__hover--right-small "
          type="submit"
          disabled={disableSubmitButton || !isPinChangeValid}
        >
          {disableSubmitButton
            ? t("patronPageLoadingText")
            : t("patronPageSaveButtonText")}
        </button>

        <div className="text-body-small-regular mt-32">
          {t("patronPageDeleteProfileText")}{" "}
          <Link
            id="delete-patron-link"
            href={deletePatronUrl}
            className="link-tag"
          >
            {t("patronPageDeleteProfileLinkText")}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default PatronPage;
