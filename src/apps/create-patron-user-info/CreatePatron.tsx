import React, { useState, FC, useEffect } from "react";
import UserInfo from "./UserInfo";
import { useText } from "../../core/utils/text";
import { useConfig } from "../../core/utils/config";
import useUserInfo from "../../core/adgangsplatformen/useUserInfo";
import RedirectToLoginMessage from "./RedirectToLoginMessage";

const CreatePatron: FC = () => {
  const [cpr, setCpr] = useState<string | null>(null);
  const [patronIsRegistered, setPpatronIsRegistered] = useState<boolean | null>(
    null
  );
  const config = useConfig();
  const t = useText();

  const { id: agencyId } = config<{
    id: `${number}`;
  }>("agencyConfig", {
    transformer: "jsonParse"
  });
  // Fetch user info data.
  const { data: userInfo, isLoading } = useUserInfo();

  useEffect(() => {
    if (isLoading || !userInfo) {
      return;
    }

    const {
      attributes: { cpr: userCpr }
    } = userInfo;

    // Otherwise set the cpr so we can show the create patron form.
    setCpr(String(userCpr));
  }, [agencyId, isLoading, userInfo]);

  if (isLoading) {
    return <div>{t("loadingText")}</div>;
  }

  if (!cpr) {
    return null;
  }

  if (patronIsRegistered) {
    return <RedirectToLoginMessage />;
  }

  return (
    <UserInfo cpr={cpr} registerSuccessCallback={setPpatronIsRegistered} />
  );
};

export default CreatePatron;
