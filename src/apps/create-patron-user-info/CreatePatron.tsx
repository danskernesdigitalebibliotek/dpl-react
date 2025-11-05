import React, { useState, FC, useEffect } from "react";
import UserInfo from "./UserInfo";
import { useText } from "../../core/utils/text";
import { useConfig } from "../../core/utils/config";
import useUserInfo from "../../core/adgangsplatformen/useUserInfo";
import RedirectToLoginMessage from "./RedirectToLoginMessage";

export interface CreatePatronProps {
  cpr?: string;
}

const CreatePatron: FC<CreatePatronProps> = ({ cpr }) => {
  const [userInfoCpr, setCpr] = useState<string | null>(null);
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
  // Fetch user info data (only if not in storybook context).
  const { data: userInfo, isLoading } = useUserInfo({
    enabled: !cpr
  });

  useEffect(() => {
    if (isLoading || !userInfo || cpr) {
      return;
    }
    const {
      attributes: { cpr: userCpr }
    } = userInfo;
    // Otherwise set the cpr so we can show the create patron form.
    setCpr(String(userCpr));
  }, [agencyId, isLoading, userInfo, cpr]);

  // We only hit this if in case we are in storybook context.
  if (cpr) {
    return (
      <UserInfo cpr={cpr} registerSuccessCallback={setPpatronIsRegistered} />
    );
  }

  if (isLoading) {
    return <div>{t("loadingText")}</div>;
  }

  if (!userInfoCpr) {
    return null;
  }

  if (patronIsRegistered) {
    return <RedirectToLoginMessage />;
  }

  return (
    <UserInfo
      cpr={userInfoCpr}
      registerSuccessCallback={setPpatronIsRegistered}
    />
  );
};

export default CreatePatron;
