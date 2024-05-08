import React, { FC, useEffect, useState } from "react";
import { useUrls } from "../../core/utils/url";
import { redirectTo } from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { getRedirectUrl } from "./helper";
import { Button } from "../../components/Buttons/Button";

const RedirectToLoginMessage: FC = () => {
  const t = useText();
  const u = useUrls();
  const redirectUrl = getRedirectUrl({
    loginUrl: u("authUrl"),
    logoutUrl: u("logoutUrl"),
    redirectOnUserCreatedUrl: u("redirectOnUserCreatedUrl")
  });
  const [seconds, setseconds] = useState(10);

  const clickHandler = () => {
    redirectTo(redirectUrl);
  };

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setseconds(seconds - 1), 1000);
    }
    if (seconds === 0) {
      redirectTo(redirectUrl);
    }
  }, [redirectUrl, seconds]);

  return (
    <section className="redirect-to-login-message">
      <p className="redirect-to-login-message__top">
        {t("postRegisterRedirectInfoTopText")}
      </p>
      <p className="redirect-to-login-message__bottom">
        {t("postRegisterRedirectInfoBottomText", {
          placeholders: { "@seconds": `${seconds}` }
        })}
      </p>
      <Button
        buttonType="default"
        size="small"
        collapsible={false}
        disabled={false}
        variant="outline"
        onClick={clickHandler}
        classNames="mt-32"
        label={t("postRegisterRedirectButtonText")}
      />
    </section>
  );
};

export default RedirectToLoginMessage;
