import React, { FC, useEffect } from "react";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import HiddenInputsNotFoundError from "./Errors/HiddenInputsNotFoundError";
import ErrorState from "./Errors/errorState";
import MaterialSearchInputs from "./MaterialSearchInputs";
import MaterialSearchList from "./MaterialSearchList";
import MaterialSearchPreview from "./MaterialSearchPreview";
import useGetMaterialListSearch from "./useGetMaterialListSearch";
import useGetSelectedWork from "./useGetSelectedWork";
import useGetHiddenInputs from "./useGetHiddenInputs";
import useUpdateFields from "./useUpdateFields";

type MaterialSearchProps = {
  uniqueIdentifier: string;
};

const MaterialSearch: FC<MaterialSearchProps> = ({ uniqueIdentifier }) => {
  const {
    availableMaterialTypes,
    work,
    isSelectedWorkLoading,
    selectedWorkId,
    setSelectedWorkId,
    selectedMaterialType,
    setSelectedMaterialType,
    errorState
  } = useGetSelectedWork();

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

  const {
    workIdElement,
    materialTypeElement,
    errorState: hiddenInputErrorState
  } = useGetHiddenInputs(uniqueIdentifier);

  useEffect(() => {
    if (workIdElement && workIdElement.value) {
      setSelectedWorkId(workIdElement.value);
    }

    if (materialTypeElement && materialTypeElement.value) {
      setSelectedMaterialType(
        materialTypeElement.value as ManifestationMaterialType
      );
    }
  }, [
    workIdElement,
    materialTypeElement,
    setSelectedWorkId,
    setSelectedMaterialType
  ]);

  if (hiddenInputErrorState === ErrorState.hiddenInputsNotFoundError) {
    return <HiddenInputsNotFoundError />;
  }
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
