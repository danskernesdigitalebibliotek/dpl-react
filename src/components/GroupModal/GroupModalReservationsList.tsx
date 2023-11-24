import React, { FC, useState, useEffect } from "react";
import SelectableMaterial from "../../apps/loan-list/materials/selectable-material/selectable-material";
import { useText } from "../../core/utils/text";
import usePager from "../result-pager/use-pager";
import { ReservationType } from "../../core/utils/types/reservation-type";
import StatusBadge from "../../apps/loan-list/materials/utils/status-badge";
import { ListType } from "../../core/utils/types/list-type";

export interface GroupModalReservationsListProps {
  materials: ReservationType[];
  pageSize: number;
  selectedMaterials: ReservationType[];
  header: string;
  selectMaterials: (materialIds: ListType[]) => void;
  marginBottonPager: boolean;
  openDetailsModal: (reservation: ReservationType) => void;
}

const GroupModalReservationsList: FC<GroupModalReservationsListProps> = ({
  materials,
  selectedMaterials,
  selectMaterials,
  pageSize,
  header,
  marginBottonPager,
  openDetailsModal
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

  if (displayedMaterials.length === 0) return null;

  return (
    <>
      <h3 className="text-body-medium-regular">{header}</h3>
      <ul className="modal-loan__list-materials">
        {displayedMaterials.map((material, i) => {
          const {
            expiryDate,
            faust,
            identifier,
            numberInQueue,
            reservationId
          } = material;
          return (
            <>
              {(identifier || reservationId || faust) && (
                <SelectableMaterial
                  item={material}
                  displayedMaterial={material}
                  focused={i === firstInNewPage}
                  statusBadgeComponent={
                    faust && (
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
                        infoText=""
                      />
                    )
                  }
                  openDetailsModal={openDetailsModal}
                  key={faust || identifier}
                  selected={selectedMaterials?.includes(material)}
                  onMaterialChecked={onMaterialChecked}
                  disabled={false}
                  statusMessageComponentMobile={null}
                  statusMessageComponentDesktop={null}
                />
              )}
              {!identifier && null}
            </>
          );
        })}
      </ul>
      <PagerComponent
        classNames={marginBottonPager ? "result-pager--margin-bottom" : ""}
      />
    </>
  );
};

export default GroupModalReservationsList;
