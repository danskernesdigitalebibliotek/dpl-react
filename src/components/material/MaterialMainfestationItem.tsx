import React, { useId, FC, useState } from "react";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { AvailabilityLabel } from "../availability-label/availability-label";
import { Cover } from "../cover/cover";
import {
  convertPostIdToFaustId,
  creatorsToString,
  flattenCreators
} from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import MaterialDetailsList, { ListData } from "./MaterialDetailsList";
import MaterialButtons from "./material-buttons/MaterialButtons";
import { Manifestation } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";
import {
  getManifestationAudience,
  getManifestationAuthors,
  getManifestationContributors,
  getManifestationEdition,
  getManifestationGenreAndForm,
  getManifestationIsbn,
  getManifestationLanguageIsoCode,
  getManifestationLanguages,
  getManifestationMaterialTypes,
  getManifestationNotes,
  getManifestationNumberOfPages,
  getManifestationOriginalTitle,
  getManifestationPhysicalDescription,
  getManifestationPublisher,
  getManifestationSource
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
  const mainfestationTitleId = useId();
  const t = useText();
  const [isOpen, setIsOpen] = useState(false);
  const faustId = convertPostIdToFaustId(pid);
  const author = creatorsToString(flattenCreators(creators), t);

  const languageIsoCode = getManifestationLanguageIsoCode([manifestation]);

  const detailsListData: ListData = [
    {
      label: t("detailsListTypeText"),
      value: getManifestationMaterialTypes(manifestation)
    },
    {
      label: t("detailsListLanguageText"),
      value: getManifestationLanguages(manifestation)
    },
    {
      label: t("detailsListGenreAndFormText"),
      value: getManifestationGenreAndForm(manifestation)
    },
    {
      label: t("detailsListContributorsText"),
      value: getManifestationContributors(manifestation)
    },
    {
      label: t("detailsListOriginalTitleText"),
      value: getManifestationOriginalTitle(manifestation)
    },
    {
      label: t("detailsListIsbnText"),
      value: getManifestationIsbn(manifestation)
    },
    {
      label: t("detailsListEditionText"),
      value: getManifestationEdition(manifestation)
    },
    {
      label: t("detailsListScopeText"),
      value: getManifestationNumberOfPages(manifestation)
    },
    {
      label: t("detailsListPublisherText"),
      value: getManifestationPublisher(manifestation)
    },
    {
      label: t("detailsListAudienceText"),
      value: getManifestationAudience(manifestation, t)
    },
    {
      label: t("detailsListAuthorsText"),
      value: getManifestationAuthors(manifestation)
    },
    {
      label: t("detailsListPhysicalDescriptionText"),
      value: getManifestationPhysicalDescription(manifestation)
    },
    {
      label: t("detailsListNotesText"),
      value: getManifestationNotes(manifestation)
    },
    {
      label: t("detailsListSourceText"),
      value: getManifestationSource(manifestation)
    }
  ];

  const accessTypesCodes = manifestation.accessTypes.map((item) => item.code);
  const access = manifestation.access.map((acc) => acc.__typename);
  const detailsId = `material-details-${pid}`;

  return (
    <div className="material-manifestation-item">
      <div className="material-manifestation-item__availability">
        <AvailabilityLabel
          key={`${faustId}-material-manifestation-item`}
          manifestText={materialTypes[0]?.materialTypeSpecific.display}
          faustIds={[faustId]}
          isbns={identifiers.map((identifier) => identifier.value)}
          accessTypes={accessTypesCodes}
          access={access}
          isVisualOnly
        />
      </div>
      <div className="material-manifestation-item__cover">
        <Cover ids={[pid]} size="small" animate={false} />
      </div>
      <div className="material-manifestation-item__text">
        <h3
          lang={languageIsoCode}
          id={mainfestationTitleId}
          className="material-manifestation-item__title text-header-h4"
        >
          {titles?.main[0]}
        </h3>
        <p className="text-small-caption">
          {t("materialHeaderAuthorByText")} {author}
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
          materialTitleId={mainfestationTitleId}
        />
      </div>
    </div>
  );
};

export default MaterialMainfestationItem;
