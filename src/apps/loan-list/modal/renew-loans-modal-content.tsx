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
import { LoanType } from "../../../core/utils/types/loan-type";
import usePager from "../../../components/result-pager/use-pager";
import { mapFBSRenewedLoanToLoanType } from "../../../core/utils/helpers/list-mapper";
import { FaustId } from "../../../core/utils/types/ids";

interface RenewLoansModalContentProps {
  loansModal: LoanType[];
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
  const [materialsToRenew, setMaterialsToRenew] = useState<FaustId[]>([]);
  const [allRenewableMaterials, setAllRenewableMaterials] = useState<
    number | null
  >(0);
  const [loans, setLoans] = useState<LoanType[]>([]);
  const [displayedLoans, setDisplayedLoans] = useState<LoanType[]>([]);
  const [renewedLoans, setRenewedLoans] = useState<LoanType[]>([]);

  const renewSelected = useCallback(() => {
    const numberMaterialIds = materialsToRenew.map((materialId) =>
      parseInt(materialId, 10)
    );
    mutate(
      {
        data: numberMaterialIds
      },
      {
        onSuccess: (result) => {
          if (result) {
            const renewedIds = result.map(
              ({ loanDetails }) => loanDetails.recordId
            );
            const filteredLoans = loans.filter(({ faust }) => {
              if (faust) {
                return renewedIds.indexOf(faust) === -1;
              }
              return false;
            });
            setMaterialsToRenew([]);
            setLoans(filteredLoans);

            setRenewedLoans(mapFBSRenewedLoanToLoanType(result));
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

  const onChecked = (faust: FaustId) => {
    const materialsToRenewCopy = [...materialsToRenew];

    const indexOfItemToRemove = materialsToRenew.indexOf(faust);
    if (indexOfItemToRemove > -1) {
      materialsToRenewCopy.splice(indexOfItemToRemove, 1);
    } else {
      materialsToRenewCopy.push(faust);
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
          {renewedLoans.map((loanType) => {
            return (
              <SelectableMaterial
                key={loanType.faust}
                faust={loanType.faust}
                identifier={loanType.identifier}
                disabled
                onChecked={onChecked}
                loan={loanType}
              />
            );
          })}
          {displayedLoans.map((loanType) => {
            return (
              <SelectableMaterial
                faust={loanType.faust}
                identifier={loanType.identifier}
                key={loanType.faust}
                materialsToRenew={materialsToRenew}
                onChecked={onChecked}
                disabled={!loanType.isRenewable}
                loan={loanType}
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
