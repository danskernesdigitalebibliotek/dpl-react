import React, { FC, useState, useEffect } from "react";
import SelectableMaterial from "../../apps/loan-list/materials/selectable-material/selectable-material";
import { formatDate } from "../../apps/loan-list/utils/helpers";
import { useText } from "../../core/utils/text";
import { LoanType } from "../../core/utils/types/loan-type";
import usePager from "../result-pager/use-pager";
import StatusMessage from "../../apps/loan-list/materials/selectable-material/StatusMessage";
import StatusBadge from "../../apps/loan-list/materials/utils/status-badge";

export interface GroupModalLoansListProps {
  materials: LoanType[];
  pageSize: number;
  selectedMaterials: string[];
  selectMaterials: (materialIds: string[]) => void;
  openDetailsModal: (modalId: string) => void;
}

const GroupModalLoansList: FC<GroupModalLoansListProps> = ({
  materials,
  selectedMaterials,
  openDetailsModal,
  selectMaterials,
  pageSize
}) => {
  const t = useText();
  const [displayedMaterials, setDisplayedMaterials] = useState<LoanType[]>([]);
  const { itemsShown, PagerComponent } = usePager({
    hitcount: materials.length,
    pageSize
  });

  useEffect(() => {
    setDisplayedMaterials([...materials].splice(0, itemsShown));
  }, [itemsShown, materials]);

  const onMaterialChecked = (id: string) => {
    const selectedMaterialsCopy = [...selectedMaterials];

    const indexOfItemToRemove = selectedMaterials.indexOf(id);
    if (indexOfItemToRemove > -1) {
      selectedMaterialsCopy.splice(indexOfItemToRemove, 1);
    } else {
      selectedMaterialsCopy.push(id);
    }
    selectMaterials(selectedMaterialsCopy);
  };

  return (
    <>
      <ul className="modal-loan__list-materials">
        {displayedMaterials.map((loanType) => (
          <SelectableMaterial
            statusBadgeComponent={
              <StatusBadge
                badgeDate={loanType.dueDate}
                neutralText={
                  loanType.dueDate
                    ? t("groupModalDueDateMaterialText", {
                        placeholders: { "@date": formatDate(loanType.dueDate) }
                      })
                    : ""
                }
              />
            }
            statusMessageComponentDesktop={
              <StatusMessage
                className="list-materials__status__note-desktop"
                loanType={loanType.loanType}
                renewalStatusList={loanType.renewalStatusList}
              />
            }
            statusMessageComponentMobile={
              <StatusMessage
                className="list-materials__status__note-mobile"
                loanType={loanType.loanType}
                renewalStatusList={loanType.renewalStatusList}
              />
            }
            faust={loanType.faust}
            identifier={loanType.identifier}
            openDetailsModal={openDetailsModal}
            key={loanType.faust}
            selected={Boolean(
              selectedMaterials?.indexOf(String(loanType.loanId) || "") > -1
            )}
            onMaterialChecked={onMaterialChecked}
            disabled={!loanType.isRenewable}
            id={String(loanType.loanId)}
          />
        ))}
      </ul>
      <PagerComponent />
    </>
  );
};

export default GroupModalLoansList;
