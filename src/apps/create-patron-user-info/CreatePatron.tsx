import React, { useState, FC, useEffect } from "react";
import UserInfo from "./UserInfo";
import { useText } from "../../core/utils/text";
import { useConfig } from "../../core/utils/config";
import useUserInfo from "../../core/adgangsplatformen/useUserInfo";

export interface CreatePatronProps {
  fakeCpr?: string;
}

const CreatePatron: FC<CreatePatronProps> = ({ fakeCpr }) => {
  const [cpr, setCpr] = useState<string | null>(null);
  const config = useConfig();
  const t = useText();
  const { id: agencyId } = config<{
    id: `${number}`;
  }>("agencyConfig", {
    transformer: "jsonParse"
  });
  // Fetch user info data (only if not in storybook context).
  const { data: userInfo, isLoading } = useUserInfo({
    enabled: !fakeCpr
  });

  useEffect(() => {
    if (isLoading || !userInfo || fakeCpr) {
      return;
    }
    const {
      attributes: { cpr: userCpr }
    } = userInfo;
    // Otherwise set the cpr so we can show the create patron form.
    setCpr(String(userCpr));
  }, [agencyId, isLoading, userInfo, fakeCpr]);

  if (fakeCpr) {
    return <UserInfo cpr={fakeCpr} />;
  }

  if (isLoading) {
    return <div>{t("loadingText")}</div>;
  }

  if (!cpr) {
    return null;
  }

  return <UserInfo cpr={cpr} />;
};

export default CreatePatron;
