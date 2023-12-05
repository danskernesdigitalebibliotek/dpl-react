import React, { useState, FC, useEffect } from "react";
import UserInfo from "./UserInfo";
import { useUrls } from "../../core/utils/url";
import { useText } from "../../core/utils/text";
import { redirectTo } from "../../core/utils/helpers/url";
import { useConfig } from "../../core/utils/config";
import useUserInfo from "../../core/adgangsplatformen/useUserInfo";

const CreatePatron: FC = () => {
  const [cpr, setCpr] = useState<string | null>(null);
  const config = useConfig();
  const t = useText();
  const u = useUrls();
  const dashboardUrl = u("dashboardUrl");

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
      attributes: { agencies, cpr: userCpr }
    } = userInfo;

    const userWasAlreadyCreated = agencies.some(
      (agency) => agency.agencyId === agencyId
    );

    // If the user was already created, redirect to the dashboard.
    if (userWasAlreadyCreated) {
      redirectTo(dashboardUrl);
    }

    // Otherwise set the cpr so we can show the create patron form.
    setCpr(String(userCpr));
  }, [agencyId, dashboardUrl, isLoading, userInfo]);

  if (isLoading) {
    return <div>{t("loadingText")}</div>;
  }

  if (!cpr) {
    return null;
  }

  return <UserInfo cpr={cpr} />;
};

export default CreatePatron;
