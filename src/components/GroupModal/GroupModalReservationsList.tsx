import React, { FC, useState, useEffect } from "react";
import SelectableMaterial from "../../apps/loan-list/materials/selectable-material/selectable-material";
import { formatDate } from "../../apps/loan-list/utils/helpers";
import { useText } from "../../core/utils/text";
import usePager from "../result-pager/use-pager";
import { ReservationType } from "../../core/utils/types/reservation-type";
import StatusBadge from "../../apps/loan-list/materials/utils/status-badge";

export interface GroupModalReservationsListProps {
  materials: ReservationType[];
  pageSize: number;
  selectedMaterials: string[];
  header: string;
  selectMaterials: (materialIds: string[]) => void;
  marginBottonPager: boolean;
}

const GroupModalReservationsList: FC<GroupModalReservationsListProps> = ({
  materials,
  selectedMaterials,
  selectMaterials,
  pageSize,
  header,
  marginBottonPager
}) => {
  const t = useText();
  const [displayedMaterials, setDisplayedMaterials] = useState<
    ReservationType[]
  >([]);
  const { itemsShown, PagerComponent, firstInNewPage } = usePager({
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

  if (displayedMaterials.length === 0) return null;

  return (
    <>
      <h3 className="text-body-medium-regular">{header}</h3>
      <ul className="modal-loan__list-materials">
        {displayedMaterials.map(
          ({ expiryDate, faust, identifier, numberInQueue }, i) => (
            <>
              {(identifier || faust) && (
                <SelectableMaterial
                  focused={i === firstInNewPage}
                  statusBadgeComponent={
                    faust ? (
                      <StatusBadge
                        badgeDate={expiryDate}
                        neutralText={
                          numberInQueue
                            ? t("dashboardNumberInLineText", {
                                count: numberInQueue,
                                placeholders: { "@count": numberInQueue }
                              })
                            : ""
                        }
                        infoText={
                          expiryDate
                            ? t("pickUpLatestText", {
                                placeholders: {
                                  "@date": formatDate(expiryDate)
                                }
                              })
                            : ""
                        }
                      />
                    ) : null
                  }
                  key={faust || identifier}
                  selected={Boolean(
                    selectedMaterials?.indexOf(identifier || faust || "") > -1
                  )}
                  onMaterialChecked={onMaterialChecked}
                  disabled={false}
                  id={identifier || faust}
                  faust={faust}
                  identifier={identifier}
                  statusMessageComponentMobile={null}
                  statusMessageComponentDesktop={null}
                />
              )}
              {!identifier && null}
            </>
          )
        )}
      </ul>
      <PagerComponent
        classNames={marginBottonPager ? "result-pager--margin-bottom" : ""}
      />
    </>
  );
};

export default GroupModalReservationsList;
