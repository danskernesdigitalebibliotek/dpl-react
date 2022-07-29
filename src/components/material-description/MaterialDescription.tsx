import React from "react";
import { useGetManifestationQuery } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";

export interface MaterialDescriptionProps {
  pid: Pid;
}

const MaterialDescription: React.FC<MaterialDescriptionProps> = ({ pid }) => {
  const { data, isLoading } = useGetManifestationQuery({ pid });
  const t = useText();
  return (
    <section className="material-description">
      <h2 className="text-header-h4 pb-16">{t("descriptionHeadlineText")}</h2>
      <p className="text-body-large material-description__content">
        {!isLoading && data?.manifestation?.physicalDescriptions[0].summary}
      </p>
      <div className="material-description__links mt-32">
        <div className="text-small-caption horizontal-term-line">
          <p className="text-label-bold">
            Nr. 3 <span className="text-small-caption">i serien</span>
          </p>
          <span>
            <a href="/" className="link-tag">
              Vejen til Jerusalem
            </a>
          </span>
        </div>
        <div className="text-small-caption horizontal-term-line">
          <p className="text-label-bold">I samme serie</p>
          <span>
            <a href="/" className="link-tag">
              Tempelridderen
            </a>
          </span>
          <span>
            <a href="/" className="link-tag">
              Riget ved vejens ende
            </a>
          </span>
          <span>
            <a href="/" className="link-tag">
              Arven efter Arn
            </a>
          </span>
        </div>
        <div className="text-small-caption horizontal-term-line">
          <p className="text-label-bold">Emneord</p>
          <span>
            <a href="/" className="link-tag">
              Sverige
            </a>
          </span>
          <span>
            <a href="/" className="link-tag">
              historie
            </a>
          </span>
          <span>
            <a href="/" className="link-tag">
              klosterliv
            </a>
          </span>
          <span>
            <a href="/" className="link-tag">
              korstogene
            </a>
          </span>
          <span>
            <a href="/" className="link-tag">
              middelalderen
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default MaterialDescription;
