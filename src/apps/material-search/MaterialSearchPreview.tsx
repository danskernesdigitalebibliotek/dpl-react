import React, { FC, useEffect, useState } from "react";
import { Cover } from "../../components/cover/cover";
import {
  creatorsToString,
  flattenCreators
} from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import {
  getManifestationBasedOnType,
  getManifestationTitle
} from "../material/helper";
import MaterialTypeNotFoundError from "./Errors/MaterialTypeNotFoundError";
import WorkNotFoundError from "./Errors/WorkNotFoundError";
import ErrorState from "./Errors/errorState";
import MaterialSearchLoading from "./MaterialSearchLoading";

type MaterialSearchPreviewProps = {
  work: Work | null;
  selectedMaterialType: ManifestationMaterialType | null;
  isLoading: boolean;
  errorState: ErrorState;
};

const MaterialSearchPreview: FC<MaterialSearchPreviewProps> = ({
  work,
  selectedMaterialType,
  isLoading,
  errorState
}) => {
  const t = useText();

  const [materialForDisplay, setMaterialForDisplay] =
    useState<Manifestation | null>(null);

  useEffect(() => {
    if (!work) return;

    if (!selectedMaterialType) {
      setMaterialForDisplay(work.manifestations.bestRepresentation);
      return;
    }

    const manifestation = getManifestationBasedOnType(
      work,
      selectedMaterialType
    );
    setMaterialForDisplay(manifestation);
  }, [work, selectedMaterialType]);

  if (isLoading) {
    return (
      <div className="material-search__preview">
        <div className="material-search__preview-loading">
          <MaterialSearchLoading loadingText={t("materialSearchLoadingText")} />
        </div>
      </div>
    );
  }
  if (errorState === ErrorState.WorkError) {
    return <WorkNotFoundError />;
  }

  if (work && errorState === ErrorState.MaterialTypeError) {
    return <MaterialTypeNotFoundError work={work} />;
  }

  if (!work || !materialForDisplay) {
    return (
      <div className="material-search__preview">
        <div className="material-search__preview-empty">
          {t("materialSearchNoMaterialSelectedText")}
        </div>
      </div>
    );
  }

  const author = creatorsToString(flattenCreators(work.creators), t);

  return (
    <div className="material-search__preview">
      <div className="material-search__preview-material">
        <Cover
          pid={materialForDisplay.pid}
          size="large"
          displaySize="small"
          animate
          alt={`Cover for ${getManifestationTitle(materialForDisplay)}`}
          shadow="small"
        />
        <div>
          <div className="material-search__preview-item">
            <span className="material-search__preview-term">
              {t("materialSearchPreviewTitleText")}:
            </span>
            <span className="material-search__preview-detail">
              {getManifestationTitle(materialForDisplay)}
            </span>
          </div>
          <div className="material-search__preview-item">
            <span className="material-search__preview-term">
              {t("materialSearchPreviewAuthorText")}:
            </span>
            <span className="material-search__preview-detail">{author}</span>
          </div>
          <div className="material-search__preview-item">
            <span className="material-search__preview-term">
              {t("materialSearchPreviewPublicationYearText")}:
            </span>
            <span className="material-search__preview-detail">
              {materialForDisplay.edition?.publicationYear?.display}
            </span>
          </div>
          <div className="material-search__preview-item">
            <span className="material-search__preview-term">
              {t("materialSearchPreviewSourceText")}:
            </span>
            <span className="material-search__preview-detail">
              {materialForDisplay.source}
            </span>
          </div>
          <div className="material-search__preview-item">
            <span className="material-search__preview-term">
              {t("materialSearchPreviewWorkIdText")}:
            </span>
            <span className="material-search__preview-detail">
              {work.workId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialSearchPreview;
