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
import ButtonSmallFilled from "../Buttons/ButtonSmallFilled";
import { ManifestationsSimpleFieldsFragment } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { getCurrentLocation } from "../../core/utils/helpers/url";
import MaterialDetailsList, { ListData } from "./MaterialDetailsList";

export interface MaterialMainfestationItemProps {
  manifestation: ManifestationsSimpleFieldsFragment;
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
    physicalDescriptions,
    genreAndForm
  }
}) => {
  const t = useText();
  const [isOpen, setIsOpen] = useState(false);
  const faustId = convertPostIdToFaustId(pid as Pid);

  const creatorsText = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );

  const allContributors = String(
    contributors.map((contributor) => contributor.display)
  );

  const allLanguages = String(
    languages?.main?.map((language) => language.display).join(", ")
  );

  const listDescriptionData: ListData = [
    {
      label: t("typeText"),
      value: materialTypes?.[0]?.specific ?? "",
      type: "standard"
    },
    {
      label: t("languageText"),
      value: allLanguages ?? "",
      type: "standard"
    },
    {
      label: t("genreAndFormText"),
      value: genreAndForm?.[0] ?? "",
      type: "standard"
    },
    {
      label: t("contributorsText"),
      value: allContributors ?? "",
      type: "link"
    },
    {
      label: t("originalTitleText"),
      value: titles?.original?.[0] ?? "",
      type: "standard"
    },
    {
      label: t("isbnText"),
      value: identifiers?.[0].value ?? "",
      type: "standard"
    },
    {
      label: t("editionText"),
      value: edition?.summary ?? "",
      type: "standard"
    },
    {
      label: t("scopeText"),
      value: String(physicalDescriptions?.[0]?.numberOfPages ?? ""),
      type: "standard"
    },
    {
      label: t("publisherText"),
      value: hostPublication?.publisher ?? "",
      type: "standard"
    },
    {
      label: t("audienceText"),
      value: audience?.generalAudience[0] ?? "",
      type: "standard"
    }
  ];

  return (
    <div className="material-manifestation-item">
      <div className="material-manifestation-item__availability">
        {faustId && (
          <AvailabilityLabel
            manifestText={materialTypes[0]?.specific}
            url={new URL("/", getCurrentLocation())} // TODO the correct link must be added
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
          <MaterialDetailsList className="mt-24" data={listDescriptionData} />
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
