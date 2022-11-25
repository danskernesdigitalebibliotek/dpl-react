import { DigitalArticleService } from "../../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../../core/utils/types/entities";

export const createDigitalModalId = (digitalArticleIssn: string) =>
  `digital-modal-${digitalArticleIssn}`;

export const getDigitalArticleIssn = (manifestation: Manifestation) => {
  const digitalArticle = manifestation.access.find(
    ({ __typename }) => __typename === "DigitalArticleService"
  ) as DigitalArticleService;

  return digitalArticle.issn;
};

export const orderDigitalCopy = async () => {
  const response = fetch(
    "https://webservice.statsbiblioteket.dk/elba-webservices/services/placecopyrequest",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/xml; charset=UTF8"
      },
      body: `<?xml version="1.0" encoding="utf-8"?>\n<placeCopyRequest xmlns="http://statsbiblioteket.dk/xws/elba-placecopyrequest-schema">\n <ws_user>${process.env.WS_USER}</ws_user>\n <ws_password>${process.env.WS_PASSWORD}</ws_password>\n <pid>870971-tsart:34310815</pid>\n <userMail>kb@reload.dk</userMail>\n <agencyId>775100</agencyId>\n</placeCopyRequest>`
    }
  );
  return response;
};

export default {};
