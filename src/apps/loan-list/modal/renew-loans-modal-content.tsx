import React, { useState, useEffect, FC, useCallback } from "react";
import { useIntersection } from "react-use";
import { useQueryClient } from "react-query";
import { useRenewLoansV2, getGetLoansV2QueryKey } from "../../../core/fbs/fbs";
import {
  getAmountOfRenewableLoans,
  getRenewableMaterials
} from "../../../core/utils/helpers/general";
import { Button } from "../../../components/Buttons/Button";
import { LoanType } from "../../../core/utils/types/loan-type";
import { LoanId } from "../../../core/utils/types/ids";
import usePager from "../../../components/result-pager/use-pager";
import CheckBox from "../../../components/checkbox/Checkbox";
import modalIdsConf from "../../../core/configuration/modal-ids.json";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import SelectableMaterial from "../materials/selectable-material/selectable-material";

interface RenewLoansModalContentProps {
  loansModal: LoanType[];
  openLoanDetailsModal: (modalId: string) => void;
  pageSize: number;
}

const RenewLoansModalContent: FC<RenewLoansModalContentProps> = ({
  loansModal,
  pageSize,
  openLoanDetailsModal
}) => {
  const { mutate } = useRenewLoansV2();
  const t = useText();
  const queryClient = useQueryClient();
  const { close } = useModalButtonHandler();
  const renewableMaterials = getAmountOfRenewableLoans(loansModal);
  const { itemsShown, PagerComponent } = usePager(loansModal.length, pageSize);
  const intersectionRef = React.useRef(null);
  const { isIntersecting: isVisible } = useIntersection(intersectionRef, {
    threshold: 0
  }) || { isIntersecting: false };
  const [materialsToRenew, setMaterialsToRenew] = useState<number[]>([]);
  const [displayedLoans, setDisplayedLoans] = useState<LoanType[]>([]);

  const renewSelected = useCallback(() => {
    mutate(
      {
        data: materialsToRenew
      },
      {
        onSuccess: (result) => {
          if (result) {
            queryClient.invalidateQueries(getGetLoansV2QueryKey());
            close(modalIdsConf.allLoansId);
          }
        },
        // todo error handling, missing in figma
        onError: () => {}
      }
    );
  }, [close, materialsToRenew, mutate, queryClient]);

  useEffect(() => {
    setMaterialsToRenew(getRenewableMaterials(loansModal));
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

  const onChecked = (loanId: LoanId) => {
    const materialsToRenewCopy = [...materialsToRenew];

    const indexOfItemToRemove = materialsToRenew.indexOf(loanId);
    if (indexOfItemToRemove > -1) {
      materialsToRenewCopy.splice(indexOfItemToRemove, 1);
    } else {
      materialsToRenewCopy.push(loanId);
    }
    setMaterialsToRenew(materialsToRenewCopy);
  };

  return (
    <>
      <div className="modal-loan__buttons" ref={intersectionRef}>
        <CheckBox
          selected={
            renewableMaterials !== 0 &&
            materialsToRenew.length === renewableMaterials
          }
          disabled={renewableMaterials === 0}
          id="checkbox-select-all"
          onChecked={() => selectAll()}
          label={t("groupModalCheckboxText")}
        />
        <Button
          label={t("groupModalButtonText", {
            count: renewableMaterials,
            placeholders: { "@count": renewableMaterials }
          })}
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
                openLoanDetailsModal={openLoanDetailsModal}
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
              selected={
                renewableMaterials !== 0 &&
                materialsToRenew.length === renewableMaterials
              }
              disabled={renewableMaterials === 0}
              id="checkbox-select-all"
              onChecked={() => selectAll()}
              label={t("groupModalCheckboxText")}
            />
            <Button
              label={t("groupModalButtonText", {
                count: renewableMaterials,
                placeholders: { "@count": renewableMaterials }
              })}
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
