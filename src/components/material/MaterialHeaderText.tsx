import React from "react";
import { constructCreatorSearchUrl } from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { useUrls } from "../../core/utils/url";
import LinkNoStyle from "../atoms/links/LinkNoStyle";
import { WorkSmall } from "../../core/utils/types/entities";
import { cleanCreatorName } from "./helper";

interface MaterialHeaderTextProps {
  title: string;
  creators: WorkSmall["creators"];
  languageIsoCode?: string;
  materialTitleId?: string;
}

const MaterialHeaderText: React.FC<MaterialHeaderTextProps> = ({
  title,
  creators,
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
      {creators.length && (
        <p data-cy="material-header-author-text" className="text-body-large">
          <span>{t("materialHeaderAuthorByText")} </span>
          {creators.map((creator, index) => (
            <React.Fragment key={creator.display}>
              <LinkNoStyle
                url={constructCreatorSearchUrl(
                  searchUrl,
                  cleanCreatorName(creator.display)
                )}
                className="arrow__link"
              >
                {creator.display}
              </LinkNoStyle>
              {index < creators.length - 1 && ", "}
            </React.Fragment>
          ))}
        </p>
      )}
    </>
  );
};

export default MaterialHeaderText;
