import React from "react";
import {
  creatorsToString,
  flattenCreators
} from "../../../core/utils/helpers/general";
import { constructMaterialUrl } from "../../../core/utils/helpers/url";
import { useText } from "../../../core/utils/text";
import { Work } from "../../../core/utils/types/entities";
import { useUrls } from "../../../core/utils/url";
import MaterialSearchBaseError from "./MaterialSearchBaseError";

interface MaterialTypeNotFoundErrorProps {
  work: Work;
}

const MaterialTypeNotFoundError: React.FC<MaterialTypeNotFoundErrorProps> = ({
  work: {
    titles: { full: fullTitle },
    creators,
    workId: wid
  }
}) => {
  const u = useUrls();
  const t = useText();
  const materialUrl = u("materialUrl");

  const url = constructMaterialUrl(materialUrl, wid);
  const authors = creatorsToString(flattenCreators(creators), t);

  return (
    <MaterialSearchBaseError>
      <div className="material-search__error-content">
        <p className="material-search__error-description">
          {t("materialSearchErrorMaterialTypeNotFoundText")}
        </p>
        <div className="material-search__error-material-content">
          <div className="material-search__error-item">
            <span className="material-search__error-term">
              {t("materialSearchErrorTitleText")}:
            </span>
            <span className="material-search__error-detail">{fullTitle}</span>
          </div>
          <div className="material-search__error-item">
            <span className="material-search__error-term">
              {t("materialSearchErrorAuthorText")}:
            </span>
            <span className="material-search__error-detail">{authors}</span>
          </div>
          <div className="material-search__error-item">
            <span className="material-search__error-term">
              {t("materialSearchErrorLinkText")}:
            </span>
            <a
              href={url.href}
              target="_blank"
              className="material-search__error-link"
              rel="noreferrer noopener"
            >
              {url.href}
            </a>
          </div>
        </div>
      </div>
    </MaterialSearchBaseError>
  );
};

export default MaterialTypeNotFoundError;
