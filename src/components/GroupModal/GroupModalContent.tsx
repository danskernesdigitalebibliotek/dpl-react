import React, { FC, useRef, ReactNode } from "react";
import { useIntersection } from "react-use";
import CheckBox from "../checkbox/Checkbox";
import { useText } from "../../core/utils/text";
import { getRenewableMaterials } from "../../core/utils/helpers/general";

interface GroupModalContentProps {
  amountOfSelectableMaterials: number;
  selectableMaterials?: string[];
  selectedMaterials?: string[];
  buttonComponent: ReactNode;
  selectMaterials?: (materialIds: string[]) => void;
  children: ReactNode;
}

const GroupModalContent: FC<GroupModalContentProps> = ({
  amountOfSelectableMaterials,
  selectableMaterials = [],
  selectedMaterials = [],
  selectMaterials,
  buttonComponent,
  children
}) => {
  const t = useText();

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0
  });

  const selectAllPossible = () => {
    if (selectMaterials) {
      if (selectedMaterials.length === amountOfSelectableMaterials) {
        selectMaterials(getRenewableMaterials([]));
      } else {
        selectMaterials(selectableMaterials);
      }
    }
  };

  const checkBoxComponent =
    selectMaterials !== undefined ? (
      <CheckBox
        selected={
          amountOfSelectableMaterials !== 0 &&
          selectedMaterials.length === amountOfSelectableMaterials
        }
        disabled={amountOfSelectableMaterials === 0}
        id="checkbox-select-all"
        onChecked={() => selectAllPossible()}
        label={t("groupModalCheckboxText")}
      />
    ) : null;

  return (
    <>
      <div className="button-box" ref={intersectionRef}>
        {checkBoxComponent}
        {buttonComponent}
      </div>
      <div className="modal-loan__list">{children}</div>
      {!intersection?.isIntersecting && (
        <div className="button-box button-box--sticky-bottom">
          {checkBoxComponent}
          {buttonComponent}
        </div>
      )}
    </>
  );
};

export default GroupModalContent;
