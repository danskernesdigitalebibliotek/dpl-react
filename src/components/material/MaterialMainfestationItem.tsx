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
import { useText } from "../../core/utils/text";
import { getCurrentLocation } from "../../core/utils/helpers/url";
import MaterialDetailsList, { ListData } from "./MaterialDetailsList";
import MaterialButtons from "./material-buttons/MaterialButtons";
import { Manifestation } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";

export interface MaterialMainfestationItemProps {
  manifestation: Manifestation;
  workId: WorkId;
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
  },
  manifestation,
  workId
}) => {
  const t = useText();
  const [isOpen, setIsOpen] = useState(false);
  const faustId = convertPostIdToFaustId(pid);
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
      value: identifiers?.[0]?.value ?? "",
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
        <AvailabilityLabel
          manifestText={materialTypes[0]?.specific}
          url={new URL("/", getCurrentLocation())} // TODO the correct link must be added
          faustIds={[faustId]}
        />
      </div>
      <div className="material-manifestation-item__cover">
        <Cover id={pid} size="small" animate={false} />
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
        <MaterialButtons
          manifestation={manifestation}
          size="small"
          workId={workId}
        />
      </div>
    </div>
  );
};

export default MaterialMainfestationItem;
