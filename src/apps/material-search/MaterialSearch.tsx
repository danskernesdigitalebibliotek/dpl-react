import React, { FC } from "react";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import MaterialSearchInputs from "./MaterialSearchInputs";
import MaterialSearchList from "./MaterialSearchList";
import MaterialSearchPreview from "./MaterialSearchPreview";
import useGetMaterialListSearch from "./useGetMaterialListSearch";
import useGetSelectedWork from "./useGetSelectedWork";
import useUpdateFields from "./useUpdateFields";

type MaterialSearchProps = {
  previouslySelectedWorkId: WorkId | null;
  previouslySelectedMaterialType: ManifestationMaterialType | null;
  uniqueIdentifier: string;
};

const MaterialSearch: FC<MaterialSearchProps> = ({
  previouslySelectedWorkId,
  previouslySelectedMaterialType,
  uniqueIdentifier
}) => {
  const {
    availableMaterialTypes,
    work,
    isSelectedWorkLoading,
    selectedWorkId,
    setSelectedWorkId,
    selectedMaterialType,
    setSelectedMaterialType,
    errorState
  } = useGetSelectedWork({
    previouslySelectedWorkId,
    previouslySelectedMaterialType
  });

  const {
    searchInput,
    setSearchInput,
    searchListData,
    isLoading: isSearchResultsLoading,
    hitCount,
    loadMore
  } = useGetMaterialListSearch();

  const { handleUpdateWorkId, handleUpdateMaterialType } = useUpdateFields({
    updateSelectedWorkId: setSelectedWorkId,
    updateSelectedMaterialType: setSelectedMaterialType,
    uniqueIdentifier
  });

  return (
    <div className="material-search">
      <MaterialSearchInputs
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        availableMaterialTypes={availableMaterialTypes}
        selectedMaterialType={selectedMaterialType}
        handleUpdateMaterialType={handleUpdateMaterialType}
        work={work}
        uniqueIdentifier={uniqueIdentifier}
      />
      <MaterialSearchPreview
        work={work}
        isLoading={isSelectedWorkLoading}
        selectedMaterialType={selectedMaterialType}
        errorState={errorState}
      />
      <MaterialSearchList
        data={searchListData}
        isLoading={isSearchResultsLoading}
        onWorkIdSelect={(id) => handleUpdateWorkId(id)}
        selectedWorkId={selectedWorkId}
        loadMore={loadMore}
        hitCount={hitCount}
      />
    </div>
  );
};

export default MaterialSearch;
