import * as React from "react";
import { FC } from "react";
import { Link } from "../../components/atoms/link";
import { Button } from "../../components/Buttons/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";

interface SelectUserTypeProps {
  confirmHandler: () => void;
}

const SelectUserType: FC<SelectUserTypeProps> = ({ confirmHandler }) => {
  const t = useText();
  const { privacyPolicyUrl, regulationsUrl, feesUrl } = useUrls();
  const config = useConfig();
  const thresholdUserAge = parseInt(config("thresholdUserAgeConfig"), 10);

  return (
    <div className="loan-list-page">
      <h1>{t("createPatronSelectUserTypeHeaderText")}</h1>
      <p className="text-subtitle my-32">
        {t("createPatronSelectUserTypeSubHeaderText")}
      </p>
      <h2>
        {t("createPatronSelectUserTypeSecondHeaderText", {
          placeholders: { "@years": thresholdUserAge }
        })}
      </h2>
      <p className="text-subtitle my-32">
        {t("createPatronSelectUserTypeSecondSubHeaderText", {
          placeholders: { "@years": thresholdUserAge }
        })}
      </p>
      <Dropdown
        options={[
          {
            label: t("createPatronSelectUserTypeAdultOptionText", {
              placeholders: { "@years": thresholdUserAge }
            }),
            value: "adult"
          },
          {
            label: t("createPatronSelectUserTypeChildOptionText", {
              placeholders: { "@years": thresholdUserAge }
            }),
            value: "child"
          },
          {
            label: t("createPatronSelectUserTypeInstitutionOptionText"),
            value: "institution"
          }
        ]}
        classNames="dropdown dropdown__desktop"
        id="change-user-type"
        label="Change user type todo"
        arrowIcon="chevron"
      />
      <p className="text-subtitle my-32">
        {t("createPatronSelectUserTypeAcceptedTermsText")}
      </p>
      <div>
        <Link href={privacyPolicyUrl}>
          {t("createPatronSelectUserTypePrivacyPolicyLinkText")}
        </Link>
      </div>
      <div>
        <Link href={regulationsUrl}>
          {t("createPatronSelectUserTypeRegulationsLinkText")}
        </Link>
      </div>
      <div>
        <Link href={feesUrl}>
          {t("createPatronSelectUserTypeFeesLinkText")}
        </Link>
      </div>
      <Button
        label={t("createPatronSelectUserTypeConfirmButtonText")}
        buttonType="none"
        disabled={false}
        collapsible={false}
        classNames="mt-32"
        size="small"
        variant="filled"
        onClick={confirmHandler}
      />
    </div>
  );
};

export default SelectUserType;
