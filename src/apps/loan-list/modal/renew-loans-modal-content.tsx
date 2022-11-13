import React, { useState, useEffect, FC, useCallback } from "react";
import { useInView } from "react-hook-inview";
import SelectableMaterial from "../materials/selectable-material";
import { useRenewLoansV2 } from "../../../core/fbs/fbs";
import {
  getRenewableMaterials,
  getAmountOfRenewableLoans
} from "../../../core/utils/helpers/general";
import { Button } from "../../../components/Buttons/Button";
import { LoanType } from "../../../core/utils/types/loan-type";
import usePager from "../../../components/result-pager/use-pager";
import { FaustId } from "../../../core/utils/types/ids";
import CheckBox from "../../../components/checkbox/Checkbox";
import modalIdsConf from "../../../core/configuration/modal-ids.json";
import { useModalButtonHandler } from "../../../core/utils/modal";

interface RenewLoansModalContentProps {
  loansModal: LoanType[];
  buttonLabel: string;
  checkboxLabel: string;
  buttonBottomLabel: string;
  checkboxBottomLabel: string;
  pageSize: number;
}

const RenewLoansModalContent: FC<RenewLoansModalContentProps> = ({
  loansModal,
  checkboxLabel,
  buttonLabel,
  buttonBottomLabel,
  pageSize,
  checkboxBottomLabel
}) => {
  const { mutate } = useRenewLoansV2();
  const { close } = useModalButtonHandler();
  const { itemsShown, PagerComponent } = usePager(loansModal.length, pageSize);
  // TODO: Investigate if we can use useIntersection instead of useInView
  // and then we can remove the react-hook-inview dependency.
  // useIntersection documentation:
  // https://github.com/streamich/react-use/blob/master/docs/useIntersection.md#useintersection
  const [ref, isVisible] = useInView({ threshold: 0 });
  const [materialsToRenew, setMaterialsToRenew] = useState<FaustId[]>([]);
  const [renewableMaterials, setRenewableMaterials] = useState<number>(0);
  const [displayedLoans, setDisplayedLoans] = useState<LoanType[]>([]);

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
            close(modalIdsConf.allLoansId);
          }
        },
        // todo error handling, missing in figma
        onError: () => {}
      }
    );
  }, [close, materialsToRenew, mutate]);

  useEffect(() => {
    setMaterialsToRenew(getRenewableMaterials(loansModal));
    setRenewableMaterials(getAmountOfRenewableLoans(loansModal));
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
          selected={materialsToRenew.length === renewableMaterials}
          id="checkbox-select-all"
          onChecked={() => selectAll()}
          label={checkboxLabel}
        />
        <Button
          label={`${buttonLabel} (${renewableMaterials})`}
          buttonType="none"
          id="renew-several"
          variant="filled"
          disabled={renewableMaterials === 0}
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
              onChecked={() => selectAll()}
              id="checkbox-select-all"
              label={checkboxBottomLabel}
            />
            <Button
              label={`${buttonBottomLabel} (${renewableMaterials})`}
              buttonType="none"
              variant="filled"
              disabled={renewableMaterials === 0}
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
