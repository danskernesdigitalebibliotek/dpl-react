import React, { useState, useEffect, FC, useRef, ReactNode } from "react";
import { useIntersection } from "react-use";
import { LoanType } from "../../../core/utils/types/loan-type";
import usePager from "../../../components/result-pager/use-pager";
import CheckBox from "../../../components/checkbox/Checkbox";
import { useText } from "../../../core/utils/text";
import SelectableMaterial from "../materials/selectable-material/selectable-material";
import { formatDate } from "../utils/helpers";

interface GroupModalContentProps {
  loansModal: LoanType[];
  openLoanDetailsModal: (modalId: string) => void;
  pageSize: number;
  selectAll: () => void;
  amountOfSelectableMaterials: number;
  selectableMaterials: number[];
  onMaterialChecked: (id: number) => void;
  children: ReactNode;
}

const GroupModalContent: FC<GroupModalContentProps> = ({
  loansModal,
  pageSize,
  openLoanDetailsModal,
  selectAll,
  amountOfSelectableMaterials,
  selectableMaterials,
  onMaterialChecked,
  children
}) => {
  const t = useText();
  const [displayedLoans, setDisplayedLoans] = useState<LoanType[]>([]);
  const { itemsShown, PagerComponent } = usePager({
    hitcount: loansModal.length,
    pageSize
  });
  const intersectionRef = useRef(null);
  const { isIntersecting: isVisible } = useIntersection(intersectionRef, {
    threshold: 0
  }) || { isIntersecting: false };

  useEffect(() => {
    setDisplayedLoans([...loansModal].splice(0, itemsShown));
  }, [itemsShown, loansModal]);

  return (
    <>
      <div className="modal-loan__buttons" ref={intersectionRef}>
        <CheckBox
          selected={
            amountOfSelectableMaterials !== 0 &&
            selectableMaterials.length === amountOfSelectableMaterials
          }
          disabled={amountOfSelectableMaterials === 0}
          id="checkbox-select-all"
          onChecked={() => selectAll()}
          label={t("groupModalCheckboxText")}
        />
        {children}
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
                badgeDate={loanType.dueDate}
                badgeText={
                  loanType.dueDate
                    ? t("groupModalDueDateMaterialText", {
                        placeholders: { "@date": formatDate(loanType.dueDate) }
                      })
                    : ""
                }
                openDetailsModal={openLoanDetailsModal}
                faust={loanType.faust}
                identifier={loanType.identifier}
                key={loanType.faust}
                selectedMaterials={selectableMaterials}
                onMaterialChecked={onMaterialChecked}
                disabled={!loanType.isRenewable}
                id={loanType.loanId}
                loanType={loanType.loanType}
                renewalStatusList={loanType.renewalStatusList}
              />
            );
          })}
        </ul>
        <PagerComponent />
        {!isVisible && (
          <div className="modal-loan__buttons modal-loan__buttons--bottom">
            <CheckBox
              selected={
                amountOfSelectableMaterials !== 0 &&
                selectableMaterials.length === amountOfSelectableMaterials
              }
              disabled={amountOfSelectableMaterials === 0}
              id="checkbox-select-all"
              onChecked={() => selectAll()}
              label={t("groupModalCheckboxText")}
            />
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default GroupModalContent;
