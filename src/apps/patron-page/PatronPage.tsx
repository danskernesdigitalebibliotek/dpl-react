import React, { useEffect, useState, FC } from "react";
import { set } from "lodash";
import { PatronV5, UpdatePatronRequestV4 } from "../../core/fbs/model";
import {
  useGetPatronInformationByPatronIdV2,
  useUpdateV5
} from "../../core/fbs/fbs";
import TextInput from "../../components/atoms/input/TextInput";
import StatusBar from "./util/StatusBar";
import CheckBox from "../../components/checkbox/Checkbox";
import BranchesDropdown from "./util/BranchesDropdown";
import DateInputs from "../reservation-list/modal/pause-reservation/date-inputs";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";
import { Link } from "../../components/atoms/link";

const PatronPage: FC = () => {
  const t = useText();

  const { data: patronData, refetch: refetchUser } =
    useGetPatronInformationByPatronIdV2();
  const config = useConfig();
  const pincodeLength = parseInt(config("pincodeLengthConfig"), 10) || 4;
  const deletePatronLink = config("deletePatronLinkConfig");
  const [patron, setPatron] = useState<PatronV5 | null>(null);
  const [pincodeValidation, setPincodeValidation] = useState<string>();
  const [pincode, setPincode] = useState<string>("");
  const [confirmPincode, setConfirmPincode] = useState<string>("");
  const [reservationPauseSectionVisible, setReservationPauseSectionVisible] =
    useState<boolean>(false);
  const { mutate } = useUpdateV5();
  useEffect(() => {
    if (patronData && patronData.patron) {
      setReservationPauseSectionVisible(patronData.patron.onHold !== null);
      setPatron(patronData.patron);
    }
  }, [patronData]);

  useEffect(() => {
    setPincodeValidation("");
    if (pincode && confirmPincode) {
      if (pincode.length !== pincodeLength) {
        setPincodeValidation(
          `${t("patronPagePincodeTooShortValidationText")} ${pincodeLength}`
        );
      }
      if (pincode !== confirmPincode) {
        setPincodeValidation(t("patronPagePincodesNotTheSameText"));
      }
    }
  }, [pincode, confirmPincode, pincodeLength, t]);

  const changeUser = (newValue: string | boolean, key: string) => {
    const copyUser = JSON.parse(JSON.stringify(patron));
    set(copyUser, key, newValue);
    setPatron(copyUser);
  };
  const save = () => {
    if (patron) {
      const data: UpdatePatronRequestV4 = { patron };
      if (
        confirmPincode &&
        confirmPincode.length === pincodeLength &&
        pincode === confirmPincode
      ) {
        data.pincodeChange = {
          pincode: confirmPincode,
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
      {patron && (
        <>
          <h2 className="text-body-small-regular mt-32 mb-16">
            {t("patronPageBasicDetailsHeaderText")}
          </h2>
          <div className="dpl-patron-info">
            <div className="dpl-patron-info__label">
              {t("patronPageBasicDetailsNameLabelText")}
            </div>
            <div className="dpl-patron-info__text">{patron.name}</div>
            <div className="dpl-patron-info__label">
              {t("patronPageBasicDetailsAddressLabelText")}
            </div>
            <div className="dpl-patron-info__text">
              <div>{patron.address?.coName}</div>
              <div>{patron.address?.street}</div>
              <div>{patron.address?.postalCode}</div>
              <div>{patron.address?.city}</div>
              <div>{patron.address?.country}</div>
            </div>
          </div>
        </>
      )}
      <div id="patron-page-contact-info">
        <h2 className="text-body-small-regular mt-32 mb-16">
          {t("patronPageContactInfoHeaderText")}
        </h2>
        {t("patronPageContactInfoBreadText") && (
          <p className="text-body-small-regular mb-32">
            {t("patronPageContactInfoBreadText")}
          </p>
        )}
        <TextInput
          className="dpl-input__half-on-desktop"
          id="phone-input"
          type="number"
          onChange={(newPhoneNumber) =>
            changeUser(newPhoneNumber, "phoneNumber")
          }
          value={patron?.phoneNumber}
          label={t("patronPageContactPhoneLabelText")}
        />
        <CheckBox
          className="mt-32 mb-16"
          onChecked={(newReceiveSms: boolean) =>
            changeUser(newReceiveSms, "receiveSms")
          }
          id="phone-messages"
          selected={patron?.receiveSms}
          disabled={false}
          label={t("patronPageContactPhoneCheckboxText")}
        />
        <TextInput
          className="dpl-input__half-on-desktop"
          id="email-address-input"
          type="email"
          onChange={(newEmail) => changeUser(newEmail, "emailAddress")}
          value={patron?.emailAddress}
          label={t("patronPageContactEmailLabelText")}
        />
        <CheckBox
          className="mt-32 mb-16"
          onChecked={(newReceiveEmail: boolean) =>
            changeUser(newReceiveEmail, "receiveEmail")
          }
          id="email-messages"
          selected={patron?.receiveEmail}
          disabled={false}
          label={t("patronPageContactEmailCheckboxText")}
        />
      </div>
      <StatusBar />
      <div id="pickup-reservations-section">
        <h2 className="text-body-small-regular mt-32 mb-16">
          {t("patronPageChangePickupHeaderText")}
        </h2>
        {t("patronPageChangePickupBreadText") && (
          <p className="text-body-small-regular">
            {t("patronPageChangePickupBreadText")}
          </p>
        )}
        <BranchesDropdown
          classNames="dropdown__half-on-desktop"
          selected={patron?.preferredPickupBranch || ""}
          onChange={(newPreferredPickupBranch) =>
            changeUser(newPreferredPickupBranch, "preferredPickupBranch")
          }
        />

        <h3 className="text-body-small-regular mt-32 mb-16">
          {t("patronPagePauseReservationsHeaderText")}
        </h3>
        <p className="text-body-small-regular">
          {t("patronPagePauseReservationsBreadText")}
        </p>
        <CheckBox
          className="mt-32 mb-16"
          id="show-reservation-pause-section"
          onChecked={() =>
            setReservationPauseSectionVisible(!reservationPauseSectionVisible)
          }
          ariaLabel={t("patronPageOpenPauseReservationsSectionAriaText")}
          selected={reservationPauseSectionVisible}
          label={t("patronPageOpenPauseReservationsSectionText")}
        />
        {reservationPauseSectionVisible && (
          <section>
            <DateInputs
              setStartDate={(newStartDate) =>
                changeUser(newStartDate, "onHold.from")
              }
              setEndDate={(newEndDate) => changeUser(newEndDate, "onHold.to")}
              startDate={patron?.onHold?.from || ""}
              endDate={patron?.onHold?.to || ""}
            />
          </section>
        )}
      </div>
      <div id="pincode-section">
        <h2 className="text-body-small-regular mt-32 mb-16">
          {t("patronPageChangePincodeHeaderText")}
        </h2>
        <p className="text-body-small-regular">
          {t("patronPageChangePincodeBreadText")}
        </p>
        <div className="dpl-pincode-container">
          <TextInput
            className="dpl-input__half-on-desktop"
            id="pincode-input"
            type="password"
            pattern="[0-9]*"
            inputmode="numeric"
            onChange={(newPin) => setPincode(newPin)}
            value={pincode}
            label={t("patronPagePincodeLabelText")}
            validation={pincodeValidation}
          />
          <TextInput
            className="dpl-input__half-on-desktop"
            id="pincode-confirm-input"
            pattern="[0-9]*"
            inputmode="numeric"
            type="password"
            onChange={(newPin) => setConfirmPincode(newPin)}
            value={confirmPincode}
            label={t("patronPageConfirmPincodeLabelText")}
          />
        </div>
      </div>
      <button
        disabled={Boolean(pincodeValidation)}
        className="mt-48 btn-primary btn-filled btn-small arrow__hover--right-small "
        type="button"
        onClick={save}
      >
        {t("patronPageSaveButtonText")}
      </button>
      <div className="text-body-small-regular mt-32">
        {t("patronPageDeleteProfileText")}{" "}
        <a href="todo" className="text-links">
          <Link href={new URL(deletePatronLink)} className="link-tag">
            {t("patronPageDeleteProfileLinkText")}
          </Link>
        </a>
      </div>
    </form>
  );
};

export default PatronPage;
