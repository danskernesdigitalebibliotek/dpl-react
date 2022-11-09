import React, { useEffect, useState, FC } from "react";
import { set } from "lodash";
import { useQueryClient } from "react-query";
import { PatronV5, UpdatePatronRequestV4 } from "../../core/fbs/model";
import {
  useGetPatronInformationByPatronIdV2,
  useUpdateV5
} from "../../core/fbs/fbs";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";
import { Link } from "../../components/atoms/link";
import BasicDetailsSection from "./sections/BasicDetailsSection";
import ContactInfoSection from "./sections/ContactInfoSection";
import ReservationDetailsSection from "./sections/ReservationDetailsSection";
import PincodeSection from "./sections/PincodeSection";
import StatusSection from "./sections/StatusSection";

const PatronPage: FC = () => {
  const queryClient = useQueryClient();
  const t = useText();
  const config = useConfig();
  const { mutate } = useUpdateV5();

  const { data: patronData } = useGetPatronInformationByPatronIdV2();

  const deletePatronLink = config("deletePatronLinkConfig");
  const [patron, setPatron] = useState<PatronV5 | null>(null);
  const [pin, setPin] = useState<string | null>(null);

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
    // Todo: perhaps save button should be disabled if there is no patron/patron error?
    // The user can actually save if there is no patron, this seem to be a consistent design decision
    // I will revisit when I get an answer to this question.
    if (patron) {
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
            queryClient.invalidateQueries(useGetPatronInformationByPatronIdV2);
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    }
  };

  return (
    <form className="dpl-patron-page">
      <h1 className="text-header-h1 my-32">{t("patronPageHeaderText")}</h1>
      {patron && <BasicDetailsSection patron={patron} />}
      {patron && (
        <ContactInfoSection changePatron={changePatron} patron={patron} />
      )}
      <StatusSection />
      {patron && (
        <ReservationDetailsSection
          changePatron={changePatron}
          patron={patron}
        />
      )}
      {patron && <PincodeSection changePincode={setPin} />}
      <button
        id="save-user-patron"
        className="mt-48 btn-primary btn-filled btn-small arrow__hover--right-small "
        type="button"
        onClick={save}
      >
        {t("patronPageSaveButtonText")}
      </button>
      <div className="text-body-small-regular mt-32">
        {t("patronPageDeleteProfileText")}{" "}
        <Link
          id="delete-patron-link"
          href={new URL(deletePatronLink)}
          className="link-tag"
        >
          {t("patronPageDeleteProfileLinkText")}
        </Link>
      </div>
    </form>
  );
};

export default PatronPage;
