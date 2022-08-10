import * as React from "react";
import { FC, useState } from "react";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { AvailabilityLabel } from "../availability-label/availability-label";
import { Cover } from "../cover/cover";
import {
  convertPostIdToFaustId,
  creatorsToString,
  filterCreators,
  flattenCreators
} from "../../core/utils/helpers/general";
import { Pid } from "../../core/utils/types/ids";
import ListDescription, {
  ListData
} from "../list-description/list-description";
import ButtonSmallFilled from "../Buttons/ButtonSmallFilled";
import { ManifestationsSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";

export interface MaterialMainfestationItemProps {
  manifestation: ManifestationsSimpleFragment["all"][0];
}

const MaterialMainfestationItem: FC<MaterialMainfestationItemProps> = ({
  manifestation: {
    materialTypes,
    pid,
    titles,
    creators,
    hostPublication,
    languages,
    identifiers,
    contributors,
    edition,
    audience,
    physicalDescriptions
  }
}) => {
  const t = useText();
  const [isOpen, setIsOpen] = useState(false);
  const faustId = convertPostIdToFaustId(pid as Pid);

  const creatorsText = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );

  const allContributors = contributors.map(
    (contributor) => contributor.display
  );

  const allLanguages = languages?.main
    ?.map((language) => language.display)
    .join(", ");

  const listDescriptionData = {
    [t("typeText")]: { value: materialTypes?.[0]?.specific, type: "standard" },
    [t("languageText")]: {
      value: allLanguages,
      type: "standard"
    },
    [t("contributorsText")]: { value: allContributors, type: "link" },
    [t("originalTitleText")]: { value: titles?.original, type: "standard" },
    [t("isbnText")]: { value: identifiers?.[0].value, type: "standard" },
    [t("editionText")]: { value: edition?.summary, type: "standard" },
    [t("scopeText")]: {
      value: physicalDescriptions[0].numberOfPages,
      type: "standard"
    },
    [t("publisherText")]: {
      value: hostPublication?.publisher,
      type: "standard"
    },
    [t("audienceText")]: { value: audience?.generalAudience, type: "standard" }
  };

  return (
    <div className="material-manifestation-item">
      <div className="material-manifestation-item__availability">
        {faustId && (
          <AvailabilityLabel
            manifestText={materialTypes[0]?.specific}
            link="/" // TODO the correct link must be added
            faustIds={[faustId]}
          />
        )}
      </div>
      <div className="material-manifestation-item__cover">
        <Cover pid={pid as Pid} size="small" animate={false} />
      </div>
      <div className="material-manifestation-item__text">
        <h2 className="material-manifestation-item__title text-header-h4">
          {titles?.main[0]}
        </h2>
        <p className="text-small-caption">
          {t("materialHeaderAuthorByText")} {creatorsText} (
          {hostPublication?.year?.year})
        </p>

        <div
          className={`material-manifestation-item__details ${
            isOpen ? "expanded" : ""
          }`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          onKeyPress={() => {
            setIsOpen(!isOpen);
          }}
          role="button"
          tabIndex={0}
        >
          <p className="link-tag text-small-caption">
            {t("detailsOfTheMaterialText")}
          </p>
          <img src={ExpandIcon} alt="" />
        </div>
        {isOpen && (
          <ListDescription
            className="mt-24"
            data={listDescriptionData as ListData}
          />
        )}
      </div>
      <div className="material-manifestation-item__buttons">
        <ButtonSmallFilled label={t("reserveText")} disabled={false} />
        {/* TODO The button has no functionality so far. This will come later */}
        <span className="link-tag text-small-caption material-manifestation-item__find">
          {t("findOnBookshelfText")}
        </span>
      </div>
    </div>
  );
};

export default MaterialMainfestationItem;
