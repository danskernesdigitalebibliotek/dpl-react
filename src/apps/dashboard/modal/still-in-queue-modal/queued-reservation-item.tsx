import * as React from "react";
import { FC } from "react";
import CheckBox from "../../../../components/checkbox/Checkbox";
import { useText } from "../../../../core/utils/text";
import { FaustId } from "../../../../core/utils/types/ids";
import fetchDigitalMaterial from "../../../loan-list/materials/utils/digital-material-fetch-hoc";
import fetchMaterial, {
  MaterialProps
} from "../../../loan-list/materials/utils/material-fetch-hoc";
import AuthorYear from "../../../../components/author-year/authorYear";

export interface QueuedReservationItemProps {
  numberInQueue: number;
  faust?: FaustId;
  identifier?: string;
  selectedReservations: {
    [key: string]: string;
  }[];
  setCustomSelection: (elementId: string, reservationId: string) => void;
  reservationId: string;
}

const QueuedReservationItem: FC<QueuedReservationItemProps & MaterialProps> = ({
  material,
  numberInQueue,
  faust = "",
  identifier = "",
  selectedReservations,
  setCustomSelection,
  reservationId
}) => {
  const t = useText();
  const { title, authors = "", year = "", materialType } = material || {};
  return (
    <li>
      <div className="list-materials">
        <div className="list-materials__checkbox mr-32">
          <CheckBox
            id={faust || identifier}
            label=""
            selected={Object.keys(selectedReservations).includes(
              faust || identifier
            )}
            onChecked={() => {
              setCustomSelection(faust || identifier, reservationId);
            }}
          />
        </div>
        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="status-label status-label--outline ">
              {materialType}
            </div>
          </div>
          <p className="text-header-h5 mt-8">{title}</p>
          <p className="text-small-caption">
            <AuthorYear author={authors} year={year} />
          </p>
        </div>
        <div className="list-materials__status">
          <div className="status-label status-label--neutral ">
            {t("dashboardNumberInLineText", {
              count: numberInQueue,
              placeholders: { "@count": numberInQueue }
            })}
          </div>
        </div>
      </div>
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(QueuedReservationItem));
