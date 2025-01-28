import React, { FC } from "react";
import { ButtonSize } from "../../../../core/utils/types/button";
import LinkButton from "../../../Buttons/LinkButton";
import Link from "../../../atoms/links/Link";

interface MaterialSecondaryLinkProps {
  label: string;
  size: ButtonSize;
  url: URL;
  dataCy?: string;
}

const MaterialSecondaryLink: FC<MaterialSecondaryLinkProps> = ({
  label,
  size,
  url,
  dataCy
}) => {
  if (size !== "small") {
    return (
      <LinkButton
        url={url}
        buttonType="none"
        variant="outline"
        size="large"
        dataCy={dataCy}
      >
        {label}
      </LinkButton>
    );
  }

  return (
    <Link
      href={url}
      className="link-tag text-small-caption material-manifestation-item__find capitalize-all btn-ui"
      data-cy={dataCy}
    >
      {label}
    </Link>
  );
};

export default MaterialSecondaryLink;
