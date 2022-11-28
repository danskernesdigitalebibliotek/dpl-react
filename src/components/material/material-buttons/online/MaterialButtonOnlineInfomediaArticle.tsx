import * as React from "react";
import { useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../core/modal.slice";
import {
  getToken,
  setToken,
  TOKEN_LIBRARY_KEY,
  TOKEN_USER_KEY
} from "../../../../core/token";
import { setStatusAuthenticated } from "../../../../core/user.slice";
import {
  appendQueryParametersToUrl,
  getCurrentLocation,
  redirectTo
} from "../../../../core/utils/helpers/url";
import { userIsAnonymous } from "../../../../core/utils/helpers/user";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { Button } from "../../../Buttons/Button";
import { infomediaModalId } from "../../infomedia/InfomediaModal";

export interface MaterialButtonOnlineInfomediaArticleProps {
  size?: ButtonSize;
  manifestation: Manifestation;
  trackOnlineView: () => void;
  dataCy?: string;
}

const MaterialButtonOnlineInfomediaArticle: FC<
  MaterialButtonOnlineInfomediaArticleProps
> = ({
  size,
  manifestation: { pid },
  trackOnlineView,
  dataCy = "material-button-online-infomedia-article"
}) => {
  const t = useText();
  const dispatch = useDispatch();

  useEffect(() => {
    const CLIENT_ID = process.env.STORYBOOK_CLIENT_ID;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code || !CLIENT_ID) {
      return;
    }
    const currentLocation = new URL(getCurrentLocation());
    const REDIRECT_URL = currentLocation.href;
    console.log({ currentLocation });
    console.log({ REDIRECT_URL });

    fetch("https://login.bib.dk/oauth/token", {
      method: "POST",
      headers: {},
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: CLIENT_ID,
        client_secret: "secret",
        redirect_uri: REDIRECT_URL
      })
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        // eslint-disable-next-line camelcase
        if (!res?.access_token) {
          throw res;
        }
        // We need to make the token available in two contexts:
        // 1. Subsequent browser reloads. Consequently we set the token into sessionstorage, which are read by preview.js.
        window.sessionStorage.setItem(TOKEN_USER_KEY, res.access_token);
        // 2. Current storybook context.
        setToken(TOKEN_USER_KEY, res.access_token);
        setToken(TOKEN_LIBRARY_KEY, res.access_token);
        dispatch(setStatusAuthenticated());
      });
  }, [pid, dispatch]);

  const onClick = () => {
    const userToken = getToken("user");
    console.log({ userToken });
    const isUserAnonymous = userIsAnonymous();
    console.log({ isUserAnonymous });

    if (userIsAnonymous() || !getToken("user")) {
      console.log("User is anonymous and doesn't have any token");

      // redirect to login with a link back
      const { href: urlToOpenModal } = appendQueryParametersToUrl(
        new URL(getCurrentLocation()),
        {
          modal: infomediaModalId(pid)
        }
      );
      const CLIENT_ID = process.env.STORYBOOK_CLIENT_ID;
      const baseLoginUrl = new URL(
        `https://login.bib.dk/oauth/authorize?response_type=code&client_id=${CLIENT_ID}`
      );
      const redirectUrl = appendQueryParametersToUrl(baseLoginUrl, {
        redirect_uri: urlToOpenModal
      });
      redirectTo(redirectUrl);
      return;
    }
    trackOnlineView();
    dispatch(openModal({ modalId: infomediaModalId(pid) }));
  };

  // TODO: A logged in user with municipality registration can access this.
  const isRegistered = true;
  if (!isRegistered) {
    return null;
  }

  return (
    <Button
      label={t("readArticleText")}
      buttonType="none"
      variant="filled"
      disabled={false}
      collapsible={false}
      size={size || "large"}
      onClick={onClick}
      dataCy={dataCy}
    />
  );
};

export default MaterialButtonOnlineInfomediaArticle;
