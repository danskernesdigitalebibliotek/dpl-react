import React, { FC, useState, useEffect, useMemo } from "react";
import SelectableMaterial from "../../apps/loan-list/materials/selectable-material/selectable-material";
import { useText } from "../../core/utils/text";
import { isLoanType, LoanType } from "../../core/utils/types/loan-type";
import usePager from "../result-pager/use-pager";
import StatusMessage from "../../apps/loan-list/materials/selectable-material/StatusMessage";
import StatusBadge from "../../apps/loan-list/materials/utils/status-badge";
import { formatDate } from "../../core/utils/helpers/date";
import { ListType } from "../../core/utils/types/list-type";
import { getLoanDeliveryDate } from "../../apps/loan-list/utils/helpers";
import { sortLoansByIsRenewableThenDueDate } from "../../core/utils/helpers/general";

export interface GroupModalLoansListProps {
  materials: LoanType[];
  pageSize: number;
  selectedMaterials: ListType[];
  selectMaterials: (materialIds: ListType[]) => void;
  openDetailsModal: (loan: LoanType) => void;
}

const GroupModalLoansList: FC<GroupModalLoansListProps> = ({
  materials,
  selectedMaterials,
  openDetailsModal,
  selectMaterials,
  pageSize
}) => {
  // Memoize groupedMaterials to prevent unnecessary re-computations
  // Because groupedMaterials is a dependency of the useEffect hook
  const groupedMaterials = useMemo(
    () => sortLoansByIsRenewableThenDueDate(materials),
    [materials]
  );
  const t = useText();
  const [displayedMaterials, setDisplayedMaterials] = useState<LoanType[]>([]);
  const { itemsShown, PagerComponent, firstInNewPage } = usePager({
    hitcount: groupedMaterials.length,
    pageSize
  });

  useEffect(() => {
    setDisplayedMaterials([...groupedMaterials].splice(0, itemsShown));
  }, [itemsShown, groupedMaterials]);

  const onMaterialChecked = (item: ListType) => {
    const selectedMaterialsCopy = [...selectedMaterials];

    const indexOfItemToRemove = selectedMaterials.indexOf(item);
    if (indexOfItemToRemove > -1) {
      selectedMaterialsCopy.splice(indexOfItemToRemove, 1);
    } else {
      selectedMaterialsCopy.push(item);
    }
    selectMaterials(selectedMaterialsCopy);
  };

  return (
    <>
      <ul className="modal-loan__list-materials">
        {displayedMaterials.map((loanType, i) => (
          <SelectableMaterial
            focused={firstInNewPage === i}
            statusBadgeComponent={
              <StatusBadge
                badgeDate={loanType.dueDate}
                neutralText={getLoanDeliveryDate(loanType, formatDate, t)}
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
            item={loanType}
            openDetailsModal={(item: ListType) => {
              if (isLoanType(item)) {
                openDetailsModal(item);
              }
            }}
            key={loanType.faust}
            selected={selectedMaterials.includes(loanType)}
            onMaterialChecked={onMaterialChecked}
            disabled={!loanType.isRenewable}
          />
        ))}
      </ul>
      <PagerComponent classNames="result-pager--margin-bottom" />
    </>
  );
};

export default GroupModalLoansList;
