import React, { FC, useEffect, useState } from "react";
import { Cover } from "../../components/cover/cover";
import {
  creatorsToString,
  flattenCreators
} from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import { getManifestationBasedOnType } from "../material/helper";
import MaterialTypeNotFoundError from "./Errors/MaterialTypeNotFoundError";
import WorkNotFoundError from "./Errors/WorkNotFoundError";
import MaterialSearchLoading from "./MaterialSearchLoading";
import { WorkErrorType } from "./useGetSelectedWork";

type MaterialSearchPreviewProps = {
  work: Work | null;
  selectedMaterialType: ManifestationMaterialType | null;
  isLoading: boolean;
  workError: WorkErrorType;
};

const MaterialSearchPreview: FC<MaterialSearchPreviewProps> = ({
  work,
  selectedMaterialType,
  isLoading,
  workError
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
  if (workError === "work-not-found") {
    return <WorkNotFoundError />;
  }

  if (work && workError === "material-type-not-found") {
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
          ids={[materialForDisplay.pid]}
          size="large"
          displaySize="small"
          animate
          alt={`Cover for ${materialForDisplay.titles.main}`}
          shadow="small"
        />
        <div>
          <div className="material-search__preview-item">
            <span className="material-search__preview-term">
              {t("materialSearchPreviewTitleText")}:
            </span>
            <span className="material-search__preview-detail">
              {materialForDisplay.titles.main}
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
