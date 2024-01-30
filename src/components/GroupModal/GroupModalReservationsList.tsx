import React, { FC, useState, useEffect } from "react";
import { isEqual } from "lodash";
import SelectableMaterial from "../../apps/loan-list/materials/selectable-material/selectable-material";
import { useText } from "../../core/utils/text";
import usePager from "../result-pager/use-pager";
import {
  reservationId,
  ReservationType
} from "../../core/utils/types/reservation-type";
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

    const indexOfItemToRemove = selectedMaterials.findIndex((obj) => {
      if (item.faust !== null) {
        return obj.faust === item.faust;
      }
      if (item.identifier !== undefined) {
        return obj.identifier === item.identifier;
      }
      return -1;
    });

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
            reservationIds
          } = material;
          const selected = selectedMaterials?.some((selectedMaterial) =>
            isEqual(selectedMaterial, material)
          );
          return (
            (identifier || reservationIds || faust) && (
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
                key={reservationId(material)}
                selected={selected}
                onMaterialChecked={onMaterialChecked}
                disabled={false}
                statusMessageComponentMobile={null}
                statusMessageComponentDesktop={null}
              />
            )
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
