import * as React from "react";
import { FC } from "react";
import { Link } from "../../components/atoms/link";
import { Button } from "../../components/Buttons/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";

interface SelectUserTypeProps {
  confirmHandler: () => void;
}

const SelectUserType: FC<SelectUserTypeProps> = ({ confirmHandler }) => {
  const t = useText();
  const { privacyPolicyUrl, regulationsUrl, feesUrl } = useUrls();

  return (
    <div className="loan-list-page">
      <h1>Register as patron todo</h1>
      <p className="text-subtitle my-32">
        You must register as a library patron in order to borrow, reserve and
        use our digital ressources
      </p>
      <h2>Register user (above todo years)</h2>
      <p className="text-subtitle my-32">
        Are you registering on behalf of a child (below todo years), company or
        institution?
      </p>
      <Dropdown
        options={[
          { label: "User above {alder} todo", value: "adult" },
          { label: "Child/youth below {alder} todo", value: "child" },
          { label: "Institution todo", value: "institution" }
        ]}
        classNames="dropdown dropdown__desktop"
        id="change-user-type"
        label="Change user type todo"
        arrowIcon="chevron"
      />
      <p className="text-subtitle my-32">
        In order to register as a library patron, you must be at least 18 years
        of age. You must also confirm, that you have read and accepted our
        general terms, rules and rates and that you have been informed as to how
        we handle your personal information.
      </p>
      <div>
        <Link href={privacyPolicyUrl}>Privacy policy</Link>
      </div>
      <div>
        <Link href={regulationsUrl}>Regulations</Link>
      </div>
      <div>
        <Link href={feesUrl}>Fees</Link>
      </div>
      <Button
        label={t("createPatronConfirmButtonText")}
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
