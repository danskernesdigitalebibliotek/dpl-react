import React from "react";
import { useGetManifestationQuery } from "../../core/dbc-gateway/generated/graphql";
import { generateMapId } from "../../core/utils/helpers";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";

export interface MaterialDescriptionProps {
  pid: Pid;
  searchUrl: string;
}

const MaterialDescription: React.FC<MaterialDescriptionProps> = ({
  pid,
  searchUrl
}) => {
  const { data, isLoading } = useGetManifestationQuery({ pid });
  const t = useText();
  const identifierText = t("identifierText");
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
        {!isLoading && data?.manifestation?.identifiers && (
          <div className="text-small-caption horizontal-term-line">
            <p className="text-label-bold">{identifierText}</p>
            {data.manifestation.identifiers.map((identifier, index) => {
              return (
                <span key={generateMapId(index)}>
                  <a
                    href={`${searchUrl}?q=${identifier.value}`}
                    className="link-tag"
                  >
                    {identifier.value}
                  </a>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MaterialDescription;
