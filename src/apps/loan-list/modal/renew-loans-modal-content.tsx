import React, { useState, useEffect, FC, useCallback } from "react";
import { useInView } from "react-hook-inview";
import CheckBox from "../materials/utils/checkbox";
import SelectableMaterial from "../materials/selectable-material";
import { useRenewLoansV2 } from "../../../core/fbs/fbs";
import {
  getRenewableMaterials,
  getAmountOfRenewableLoans,
  getPageSizeFromConfiguration
} from "../../../core/utils/helpers/general";
import { Button } from "../../../components/Buttons/Button";
import { LoanMetaDataType } from "../../../core/utils/types/loan-meta-data-type";
import { mapFBSRenewedLoanToLoanMetaDataType } from "../utils/helpers";
import usePager from "../../../components/result-pager/use-pager";

interface RenewLoansModalContentProps {
  loansModal: LoanMetaDataType[];
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
  const { itemsShown, PagerComponent } = usePager(
    loansModal.length,
    getPageSizeFromConfiguration("pageSizeLoanList")
  );
  const [ref, isVisible] = useInView({
    threshold: 0
  });
  const [materialsToRenew, setMaterialsToRenew] = useState<number[]>([]);
  const [allRenewableMaterials, setAllRenewableMaterials] = useState<
    number | null
  >(0);
  const [loans, setLoans] = useState<LoanMetaDataType[]>([]);
  const [displayedLoans, setDisplayedLoans] = useState<LoanMetaDataType[]>([]);
  const [renewedLoans, setRenewedLoans] = useState<LoanMetaDataType[]>([]);

  const renewSelected = useCallback(() => {
    mutate(
      {
        data: materialsToRenew
      },
      {
        onSuccess: (result) => {
          if (result) {
            const renewedIds = result.map(
              ({ loanDetails }) => loanDetails.recordId
            );
            const filteredLoans = loans.filter(({ id }) => {
              return renewedIds.indexOf(id) === -1;
            });
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
    setAllRenewableMaterials(getAmountOfRenewableLoans(loansModal));
  }, [loansModal]);

  useEffect(() => {
    setDisplayedLoans([...loansModal].splice(0, itemsShown));
  }, [itemsShown, loansModal]);

  const selectAll = () => {
    if (materialsToRenew.length > 0) {
      setMaterialsToRenew([]);
    } else {
      setMaterialsToRenew(getRenewableMaterials(loansModal));
    }
  };

  const onChecked = (faust: string) => {
    const faustNumber = parseInt(faust, 10);
    const materialsToRenewCopy = [...materialsToRenew];

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
                key={loanMetaData.id}
                disabled
                onChecked={onChecked}
                loanMetaData={loanMetaData}
              />
            );
          })}
          {displayedLoans.map((loanMetaData) => {
            return (
              <SelectableMaterial
                key={loanMetaData.id}
                materialsToRenew={materialsToRenew}
                onChecked={onChecked}
                disabled={!loanMetaData.isRenewable}
                loanMetaData={loanMetaData}
              />
            );
          })}
          {PagerComponent}
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
