import React from "react";
import { constructCreatorSearchUrl } from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";
import LinkNoStyle from "../atoms/links/LinkNoStyle";

interface MaterialHeaderTextProps {
  title: string;
  author: string;
  languageIsoCode?: string;
  materialTitleId?: string;
}

const MaterialHeaderText: React.FC<MaterialHeaderTextProps> = ({
  title,
  author,
  languageIsoCode,
  materialTitleId
}) => {
  const t = useText();
  const u = useUrls();
  const searchUrl = u("searchUrl");

  return (
    <>
      <h1
        id={materialTitleId}
        lang={languageIsoCode}
        className="text-header-h1 mb-16"
      >
        {title}
      </h1>
      {author && (
        <p data-cy="material-header-author-text" className="text-body-large">
          <span>{t("materialHeaderAuthorByText")} </span>
          <LinkNoStyle
            url={constructCreatorSearchUrl(searchUrl, author)}
            className="arrow__link"
          >
            {author}
          </LinkNoStyle>
        </p>
      )}
    </>
  );
};

export default MaterialHeaderText;
