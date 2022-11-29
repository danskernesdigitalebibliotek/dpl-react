import * as React from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../core/modal.slice";
import { getToken, TOKEN_USER_KEY } from "../../../../core/token";
import {
  appendQueryParametersToUrl,
  getCurrentLocation,
  redirectTo
} from "../../../../core/utils/helpers/url";
import { userIsAnonymous } from "../../../../core/utils/helpers/user";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import { useUrls } from "../../../../core/utils/url";
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
  const { authUrl } = useUrls();

  // useEffect(() => {
  //   // do stuff here upon coming back from teh login site
  // }, []);

  const onClick = () => {
    const userToken = getToken(TOKEN_USER_KEY);
    console.log({ userToken });
    const isUserAnonymous = userIsAnonymous();
    console.log({ isUserAnonymous });

    if (userIsAnonymous() || !getToken("user")) {
      console.log("User is anonymous and doesn't have any token");

      // link back from the login platform - with an open modal id
      const { pathname, search } = appendQueryParametersToUrl(
        new URL(getCurrentLocation()),
        {
          modal: infomediaModalId(pid)
        }
      );
      const urlToOpenModal = `${pathname}${search}`;
      console.log({ urlToOpenModal });
      const baseAuthUrl = authUrl;
      console.log({ baseAuthUrl });
      const redirectUrl = appendQueryParametersToUrl(baseAuthUrl, {
        "current-path": urlToOpenModal
      });
      // If we are in storybook context just redirect to the login story.
      if (process.env.STORYBOOK_CLIENT_ID && window.top) {
        const { origin } = new URL(getCurrentLocation());
        const storybookRedirect = `${origin}/?path=/story/sb-utilities-adgangsplatformen--sign-in`;
        // We don't use redirectTo() because that would redirect inside the storybook iframe.
        window.top.location.href = storybookRedirect;
        return;
      }
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
