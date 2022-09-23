import React, { useState, useEffect, FC, useCallback } from "react";
import { useInView } from "react-hook-inview";
import CheckBox from "../materials/utils/checkbox";
import SelectableMaterial from "../materials/selectable-material";
import { useRenewLoansV2 } from "../../../core/fbs/fbs";
import {
  getRenewableMaterials,
  getAmountOfRenewableLoans
} from "../../../core/utils/helpers/general";
import { Button } from "../../../components/Buttons/Button";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import {
  mapFBSRenewedLoanToLoanMetaDataType,
  getRenewedIds,
  removeLoansWithIds
} from "../utils/helpers";
import { MetaDataType } from "../../../core/utils/types/meta-data-type";

interface RenewLoansModalContentProps {
  loansModal: MetaDataType<LoanMetaDataType>[];
  buttonLabel: string;
  checkboxLabel: string;
  buttonBottomLabel: string;
  checkboxBottomLabel: string;
}

const RenewLoansModalContent: FC<RenewLoansModalContentProps> = ({
  loansModal,
  checkboxLabel,
  buttonLabel,
  buttonBottomLabel,
  checkboxBottomLabel
}) => {
  const { mutate } = useRenewLoansV2();
  const [ref, isVisible] = useInView({
    threshold: 0
  });
  const [materialsToRenew, setMaterialsToRenew] = useState<number[]>([]);
  const [allRenewableMaterials, setAllRenewableMaterials] = useState<
    number | null
  >(0);
  const [loans, setLoans] = useState<MetaDataType<LoanMetaDataType>[]>([]);
  const [renewedLoans, setRenewedLoans] = useState<
    MetaDataType<LoanMetaDataType>[]
  >([]);

  const renewSelected = useCallback(() => {
    mutate(
      {
        data: materialsToRenew
      },
      {
        onSuccess: (result) => {
          if (result) {
            const renewedIds = getRenewedIds(result);
            const filteredLoans = removeLoansWithIds(loans, renewedIds);
            setMaterialsToRenew([]);
            setLoans(filteredLoans);

            setRenewedLoans(mapFBSRenewedLoanToLoanMetaDataType(result));
          }
        },
        // todo error handling, missing in figma
        onError: () => {}
      }
    );
  }, [loans, materialsToRenew, mutate]);

  useEffect(() => {
    setMaterialsToRenew(getRenewableMaterials(loansModal));
    setLoans(loansModal);
    setAllRenewableMaterials(getAmountOfRenewableLoans(loansModal));
  }, [loansModal]);

  const selectAll = () => {
    if (materialsToRenew.length > 0) {
      setMaterialsToRenew([]);
    } else {
      setMaterialsToRenew(getRenewableMaterials(loansModal));
    }
  };

  const onChecked = (faust: string) => {
    const faustNumber = parseInt(faust, 10);
    const materialsToRenewCopy = materialsToRenew;

    const indexOfItemToRemove = materialsToRenew.indexOf(faustNumber);
    if (indexOfItemToRemove > -1) {
      materialsToRenewCopy.splice(indexOfItemToRemove, 1);
    } else {
      materialsToRenewCopy.push(parseInt(faust, 10));
    }
    setMaterialsToRenew(materialsToRenewCopy);
  };

  return (
    <>
      <div className="modal-loan__buttons" ref={ref}>
        <CheckBox
          selected={materialsToRenew.length === allRenewableMaterials}
          id="checkbox-select-all"
          onChecked={selectAll}
          label={checkboxLabel}
        />
        <Button
          label={`${buttonLabel} (${allRenewableMaterials})`}
          buttonType="none"
          id="renew-several"
          variant="filled"
          disabled={allRenewableMaterials === 0}
          collapsible={false}
          onClick={renewSelected}
          size="small"
        />
      </div>
      <div className="modal-loan__list">
        <ul
          className={`modal-loan__list-materials ${
            !isVisible
              ? "modal-loan__list-materials--bottom-buttons-visible"
              : ""
          }`}
        >
          {renewedLoans.map((loanMetaData) => {
            return (
              <SelectableMaterial
                id={loanMetaData.id}
                type={loanMetaData.type}
                key={loanMetaData.id}
                disabled
                onChecked={onChecked}
                loanMetaData={loanMetaData}
              />
            );
          })}
          {loans.map((loanMetaData) => {
            return (
              <SelectableMaterial
                type={loanMetaData.type}
                id={loanMetaData.id}
                key={loanMetaData.id}
                materialsToRenew={materialsToRenew}
                onChecked={onChecked}
                disabled={!loanMetaData.loanSpecific?.isRenewable}
                loanMetaData={loanMetaData}
              />
            );
          })}
        </ul>
        {!isVisible && (
          <div className="modal-loan__buttons modal-loan__buttons--bottom">
            <CheckBox
              onChecked={selectAll}
              id="checkbox-select-all"
              label={checkboxBottomLabel}
            />
            <Button
              label={`${buttonBottomLabel} (${allRenewableMaterials})`}
              buttonType="none"
              variant="filled"
              disabled={allRenewableMaterials === 0}
              collapsible={false}
              onClick={renewSelected}
              size="small"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default RenewLoansModalContent;
