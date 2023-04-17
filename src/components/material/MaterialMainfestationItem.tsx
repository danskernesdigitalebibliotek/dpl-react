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
import MaterialDetailsList, { ListData } from "./MaterialDetailsList";
import MaterialButtons from "./material-buttons/MaterialButtons";
import { Manifestation } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";
import {
  getManifestationAudience,
  getManifestationContributors,
  getManifestationEdition,
  getManifestationGenreAndForm,
  getManifestationIsbn,
  getManifestationLanguageIsoCode,
  getManifestationLanguages,
  getManifestationMaterialTypes,
  getManifestationNumberOfPages,
  getManifestationOriginalTitle,
  getManifestationPublisher
} from "../../apps/material/helper";

export interface MaterialMainfestationItemProps {
  manifestation: Manifestation;
  workId: WorkId;
}

const MaterialMainfestationItem: FC<MaterialMainfestationItemProps> = ({
  manifestation: { materialTypes, pid, titles, creators, identifiers, edition },
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
  const languageIsoCode = getManifestationLanguageIsoCode([manifestation]);

  const detailsListData: ListData = [
    {
      label: t("detailsListTypeText"),
      value: getManifestationMaterialTypes(manifestation),
      type: "standard"
    },
    {
      label: t("detailsListLanguageText"),
      value: getManifestationLanguages(manifestation),
      type: "standard"
    },
    {
      label: t("detailsListGenreAndFormText"),
      value: getManifestationGenreAndForm(manifestation),
      type: "standard"
    },
    {
      label: t("detailsListContributorsText"),
      value: getManifestationContributors(manifestation),
      type: "link"
    },
    {
      label: t("detailsListOriginalTitleText"),
      value: getManifestationOriginalTitle(manifestation),
      type: "standard"
    },
    {
      label: t("detailsListIsbnText"),
      value: getManifestationIsbn(manifestation),
      type: "standard"
    },
    {
      label: t("detailsListEditionText"),
      value: getManifestationEdition(manifestation),
      type: "standard"
    },
    {
      label: t("detailsListScopeText"),
      value: getManifestationNumberOfPages(manifestation),
      type: "standard"
    },
    {
      label: t("detailsListPublisherText"),
      value: getManifestationPublisher(manifestation),
      type: "standard"
    },
    {
      label: t("detailsListAudienceText"),
      value: getManifestationAudience(manifestation),
      type: "standard"
    }
  ];

  const accessTypesCodes = manifestation.accessTypes.map((item) => item.code);
  const detailsId = `material-details-${pid}`;

  return (
    <div className="material-manifestation-item">
      <div className="material-manifestation-item__availability">
        <AvailabilityLabel
          manifestText={materialTypes[0]?.specific}
          faustIds={[faustId]}
          isbns={identifiers.map((identifier) => identifier.value)}
          accessTypes={accessTypesCodes}
        />
      </div>
      <div className="material-manifestation-item__cover">
        <Cover id={pid} size="small" animate={false} />
      </div>
      <div className="material-manifestation-item__text">
        <h3
          lang={languageIsoCode}
          className="material-manifestation-item__title text-header-h4"
        >
          {titles?.main[0]}
        </h3>
        <p className="text-small-caption">
          {t("materialHeaderAuthorByText")} {creatorsText}
          {edition?.publicationYear?.display &&
            ` (${edition.publicationYear.display})`}
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
          aria-controls={detailsId}
          aria-expanded={isOpen}
        >
          <p className="link-tag text-small-caption">
            {t("detailsOfTheMaterialText")}
          </p>
          <img src={ExpandIcon} alt="" />
        </div>
        {isOpen && (
          <MaterialDetailsList
            id={detailsId}
            className="mt-24"
            data={detailsListData}
          />
        )}
      </div>
      <div className="material-manifestation-item__buttons">
        <MaterialButtons
          manifestations={[manifestation]}
          size="small"
          workId={workId}
        />
      </div>
    </div>
  );
};

export default MaterialMainfestationItem;
