import React, { useEffect, useState, FC } from "react";
import { set } from "lodash";
import { PatronV5, UpdatePatronRequestV4 } from "../../core/fbs/model";
import {
  useGetPatronInformationByPatronIdV2,
  useUpdateV5
} from "../../core/fbs/fbs";
import StatusBar from "./util/StatusBar";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";
import { Link } from "../../components/atoms/link";
import BasicDetailsSection from "./sections/BasicDetailsSection";
import ContactInfoSection from "./sections/ContactInfoSection";
import ReservationDetailsSection from "./sections/ReservationDetailsSection";
import PincodeSection from "./sections/PincodeSection";

const PatronPage: FC = () => {
  const t = useText();
  const config = useConfig();
  const { mutate } = useUpdateV5();

  const { data: patronData, refetch: refetchUser } =
    useGetPatronInformationByPatronIdV2();

  const deletePatronLink = config("deletePatronLinkConfig");
  const [patron, setPatron] = useState<PatronV5 | null>(null);
  const [pin, setPin] = useState<string | null>(null);

  useEffect(() => {
    if (patronData && patronData.patron) {
      setPatron(patronData.patron);
    }
  }, [patronData]);

  const changePatron = (newValue: string | boolean, key: string) => {
    const copyUser = JSON.parse(JSON.stringify(patron));
    set(copyUser, key, newValue);
    setPatron(copyUser);
  };

  const save = () => {
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
            refetchUser();
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
      <StatusBar />
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
