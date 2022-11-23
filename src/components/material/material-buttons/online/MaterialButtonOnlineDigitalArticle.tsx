import * as React from "react";
import { FC } from "react";
import { useText } from "../../../../core/utils/text";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonOnlineDigitalArticleProps {
  digitalArticleIssn: string;
  size?: ButtonSize;
  dataCy?: string;
}

const MaterialButtonOnlineDigitalArticle: FC<
  MaterialButtonOnlineDigitalArticleProps
> = ({
  digitalArticleIssn,
  size,
  dataCy = "material-button-online-digital-article"
}) => {
  // TODO: A logged in user with municipality registration can access this.
  const isRegistered = true;
  const t = useText();

  if (!isRegistered) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = () => {
    // TODO: open modal and start registering flow for digital articles
    // TODO: this modal will also have to track WorkId on submit of reservation
    // eslint-disable-next-line
    console.log(digitalArticleIssn);
  };

  return (
    <Button
      label={t("orderDigitalCopy")}
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

export default MaterialButtonOnlineDigitalArticle;
