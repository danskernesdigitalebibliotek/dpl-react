import React, { useEffect, useState, FC, FormEvent } from "react";
import { set } from "lodash";
import { useQueryClient } from "react-query";
import { PatronV5, UpdatePatronRequestV4 } from "../../core/fbs/model";
import {
  useUpdateV5,
  getGetPatronInformationByPatronIdV2QueryKey
} from "../../core/fbs/fbs";
import { useText } from "../../core/utils/text";
import Link from "../../components/atoms/links/Link";
import BasicDetailsSection from "./sections/BasicDetailsSection";
import ContactInfoSection from "../../components/contact-info-section/ContactInfoSection";
import ReservationDetailsSection from "./sections/ReservationDetailsSection";
import PincodeSection from "./sections/PincodeSection";
import StatusSection from "./sections/StatusSection";
import PauseReservation from "../reservation-list/modal/pause-reservation/pause-reservation";
import { getModalIds } from "../../core/utils/helpers/general";
import { useUrls } from "../../core/utils/url";
import { usePatronData } from "../../components/material/helper";

const PatronPage: FC = () => {
  const queryClient = useQueryClient();
  const t = useText();
  const { mutate } = useUpdateV5();
  const { pauseReservation } = getModalIds();

  const { data: patronData } = usePatronData();

  const { deletePatronUrl } = useUrls();
  const [patron, setPatron] = useState<PatronV5 | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [successPinMessage, setSuccessPinMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (patronData && patronData.patron) {
      setPatron(patronData.patron);
    }
  }, [patronData]);

  // Changes the patron object by key.
  // So using the paramters 123 and "phoneNumber" would change the phoneNumber to 123.
  const changePatron = (newValue: string | boolean, key: string) => {
    // Deeeep copy
    const copyUser = JSON.parse(JSON.stringify(patron));
    set(copyUser, key, newValue);
    setPatron(copyUser);
  };

  const save = () => {
    if (patron) {
      setDisableSubmitButton(true);
      // The save patron request is done in another section of the code, but in that section
      // it is saved differently. Here, we save the input from the user, in the other scenario,
      // the checkboxes (subscribe to texts, subscribe to emails) will be set automatically
      const data: UpdatePatronRequestV4 = {
        patron: {
          emailAddress: patron.emailAddress,
          receivePostalMail: patron.receivePostalMail,
          phoneNumber: patron.phoneNumber,
          onHold: patron.onHold,
          preferredPickupBranch: patron.preferredPickupBranch,
          receiveEmail: patron.receiveEmail,
          receiveSms: patron.receiveSms
        }
      };
      // If pincode is changed, the pincode should be updated.
      if (pin) {
        data.pincodeChange = {
          pincode: pin,
          libraryCardNumber: patron.patronId.toString()
        };
      }
      mutate(
        {
          data
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(
              getGetPatronInformationByPatronIdV2QueryKey()
            );
            if (pin) {
              setSuccessPinMessage(t("patronPinSavedSuccessText"));
            }
            setDisableSubmitButton(false);
          },
          // todo error handling, missing in figma
          onError: () => {
            setDisableSubmitButton(false);
          }
        }
      );
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    save();
  };

  return (
    <>
      <form className="dpl-patron-page" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-header-h1 my-32">{t("patronPageHeaderText")}</h1>
        {patron && <BasicDetailsSection patron={patron} />}
        <div className="patron-page-info">
          {patron && (
            <ContactInfoSection
              changePatron={changePatron}
              patron={patron}
              inLine={false}
              showCheckboxes
            />
          )}
          <StatusSection />
          {patron && (
            <ReservationDetailsSection
              changePatron={changePatron}
              patron={patron}
            />
          )}
          {patron && <PincodeSection changePincode={setPin} required={false} />}
          {successPinMessage && (
            <p className="text-body-small-regular mb-8 mt-8">
              {successPinMessage}
            </p>
          )}

          <button
            data-cy="save-user-patron"
            className="mt-48 btn-primary btn-filled btn-small arrow__hover--right-small "
            type="submit"
            disabled={disableSubmitButton}
          >
            {t("patronPageSaveButtonText")}
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
      {patron && (
        <PauseReservation user={patron} id={pauseReservation as string} />
      )}
    </>
  );
};

export default PatronPage;
