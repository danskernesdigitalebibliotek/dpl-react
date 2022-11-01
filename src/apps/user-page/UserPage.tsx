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

const UserPage: FC = () => {
  const t = useText();
  const { data: userData, refetch: refetchUser } =
    useGetPatronInformationByPatronIdV2();
  const config = useConfig();
  const pincodeLength = parseInt(config("pincodeLengthConfig"), 10) || 4;
  const [user, setUser] = useState<PatronV5 | null>(null);
  const [pincodeValidation, setPincodeValidation] = useState<string>();
  const [pincode, setPincode] = useState<string>("");
  const [confirmPincode, setConfirmPincode] = useState<string>("");
  const [reservationPauseSectionVisible, setReservationPauseSectionVisible] =
    useState<boolean>(false);
  const { mutate } = useUpdateV5();
  useEffect(() => {
    if (userData && userData.patron) {
      setReservationPauseSectionVisible(userData.patron.onHold !== null);
      setUser(userData.patron);
    }
  }, [userData]);

  useEffect(() => {
    setPincodeValidation("");
    if (pincode && confirmPincode) {
      if (pincode.length !== pincodeLength) {
        setPincodeValidation(
          `${t("userPagePincodeTooShortValidationText")} ${pincodeLength}`
        );
      }
      if (pincode !== confirmPincode) {
        setPincodeValidation(t("userPagePincodesNotTheSameText"));
      }
    }
  }, [pincode, confirmPincode, pincodeLength, t]);

  const changeUser = (newValue: string | boolean, key: string) => {
    const copyUser = JSON.parse(JSON.stringify(user));
    set(copyUser, key, newValue);
    setUser(copyUser);
  };
  const save = () => {
    if (user) {
      const data: UpdatePatronRequestV4 = { patron: user };
      if (
        confirmPincode &&
        confirmPincode.length === pincodeLength &&
        pincode === confirmPincode
      ) {
        data.pincodeChange = {
          pincode: confirmPincode,
          libraryCardNumber: user.patronId.toString()
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
    <form className="dpl-user-page">
      <h1 className="text-header-h1 my-32">{t("userPageHeaderText")}</h1>
      {user && (
        <>
          <h2 className="text-body-small-regular mt-32 mb-16">
            {t("userPageBasicDetailsHeaderText")}
          </h2>
          <div className="dpl-user-info">
            <div className="dpl-user-info__label">
              {t("userPageBasicDetailsNameLabelText")}
            </div>
            <div className="dpl-user-info__text">{user.name}</div>
            <div className="dpl-user-info__label">
              {t("userPageBasicDetailsAddressLabelText")}
            </div>
            <div className="dpl-user-info__text">
              <div>{user.address?.coName}</div>
              <div>{user.address?.street}</div>
              <div>{user.address?.postalCode}</div>
              <div>{user.address?.city}</div>
              <div>{user.address?.country}</div>
            </div>
          </div>
        </>
      )}
      <h2 className="text-body-small-regular mt-32 mb-16">
        {t("userPageContactInfoHeaderText")}
      </h2>
      {t("userPageContactInfoBreadText") && (
        <p className="text-body-small-regular mb-32">
          {t("userPageContactInfoBreadText")}
        </p>
      )}
      <TextInput
        className="dpl-input__half-on-desktop"
        id="phone-input"
        type="number"
        onChange={(newPhoneNumber) => changeUser(newPhoneNumber, "phoneNumber")}
        value={user?.phoneNumber}
        label={t("userPageContactPhoneLabelText")}
      />
      <CheckBox
        className="mt-32 mb-16"
        onChecked={(newReceiveSms: boolean) =>
          changeUser(newReceiveSms, "receiveSms")
        }
        id="phone-messages"
        selected={user?.receiveSms}
        disabled={false}
        label={t("userPageContactPhoneCheckboxText")}
      />
      <TextInput
        className="dpl-input__half-on-desktop"
        id="email-address-input"
        type="email"
        onChange={(newEmail) => changeUser(newEmail, "emailAddress")}
        value={user?.emailAddress}
        label={t("userPageContactEmailLabelText")}
      />
      <CheckBox
        className="mt-32 mb-16"
        onChecked={(newReceiveEmail: boolean) =>
          changeUser(newReceiveEmail, "receiveEmail")
        }
        id="email-messages"
        selected={user?.receiveEmail}
        disabled={false}
        label={t("userPageContactEmailCheckboxText")}
      />
      <StatusBar />
      <h2 className="text-body-small-regular mt-32 mb-16">
        {t("userPageChangePickupHeaderText")}
      </h2>
      {t("userPageChangePickupBreadText") && (
        <p className="text-body-small-regular">
          {t("userPageChangePickupBreadText")}
        </p>
      )}
      <BranchesDropdown
        classNames="dropdown__half-on-desktop"
        selected={user?.preferredPickupBranch || ""}
        onChange={(newPreferredPickupBranch) =>
          changeUser(newPreferredPickupBranch, "preferredPickupBranch")
        }
      />
      <p className="text-body-medium mt-32 mb-8">
        {t("userPagePauseReservationsHeaderText")}
      </p>
      <p className="text-body-small-regular">
        {t("userPagePauseReservationsBreadText")}
      </p>
      <CheckBox
        className="mt-32 mb-16"
        id="show-reservation-pause-section"
        onChecked={() =>
          setReservationPauseSectionVisible(!reservationPauseSectionVisible)
        }
        ariaLabel={t("userPageOpenPauseReservationsSectionAriaText")}
        selected={reservationPauseSectionVisible}
        label={t("userPageOpenPauseReservationsSectionText")}
      />
      {reservationPauseSectionVisible && (
        <section>
          <DateInputs
            setStartDate={(newStartDate) =>
              changeUser(newStartDate, "onHold.from")
            }
            setEndDate={(newEndDate) => changeUser(newEndDate, "onHold.to")}
            startDate={user?.onHold?.from || ""}
            endDate={user?.onHold?.to || ""}
          />
        </section>
      )}
      <h2 className="text-body-small-regular mt-32 mb-16">
        {t("userPageChangePincodeHeaderText")}
      </h2>
      <p className="text-body-small-regular">
        {t("userPageChangePincodeBreadText")}
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
          label={t("userPagePincodeLabelText")}
          validation={pincodeValidation}
        />
        <TextInput
          className="dpl-input__half-on-desktop"
          id="pincode-input"
          pattern="[0-9]*"
          inputmode="numeric"
          type="password"
          onChange={(newPin) => setConfirmPincode(newPin)}
          value={confirmPincode}
          label={t("userPageConfirmPincodeLabelText")}
        />
      </div>
      <button
        disabled={Boolean(pincodeValidation)}
        className="mt-48 btn-primary btn-filled btn-small arrow__hover--right-small "
        type="button"
        onClick={save}
      >
        {t("userPageSaveButtonText")}
      </button>
      <div className="text-body-small-regular mt-32">
        {t("userPageDeleteProfileText")}
        På mange digitale materialer, er der er begrænsning på, hvor mange du
        kan låne pr. måned. Der findes dog en række materialer uden begrænsning.
        <a href="todo" className="text-links">
          {t("userPageDeleteProfileLinkText")}
          Se titler du altid kan låne
        </a>
      </div>
    </form>
  );
};

export default UserPage;
