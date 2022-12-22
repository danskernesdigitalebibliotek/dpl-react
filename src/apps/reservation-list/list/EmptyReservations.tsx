import * as React from "react";
import { FC } from "react";
import EmptyList from "../../../components/empty-list/empty-list";
import { useText } from "../../../core/utils/text";

const EmptyReservations: FC = () => {
  const t = useText();

  return (
    <div className="list-reservation-container m-32">
      <EmptyList emptyListText={t("reservationListAllEmptyText")} />
    </div>
  );
};

export default EmptyReservations;
