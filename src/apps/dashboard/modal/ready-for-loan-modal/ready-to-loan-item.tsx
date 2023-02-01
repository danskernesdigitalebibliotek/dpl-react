import dayjs from "dayjs";
import * as React from "react";
import { FC } from "react";
import CheckBox from "../../../../components/checkbox/Checkbox";
import { FaustId } from "../../../../core/utils/types/ids";
import fetchDigitalMaterial from "../../../loan-list/materials/utils/digital-material-fetch-hoc";
import fetchMaterial, {
  MaterialProps
} from "../../../loan-list/materials/utils/material-fetch-hoc";
import { dateFormatDefault } from "../../../../core/configuration/date-format.json";
import { useText } from "../../../../core/utils/text";

export interface ReadyToLoanItemProps {
  pickUpByDate: string | null;
  faust?: FaustId;
  identifier?: string;
  selectedReservations: string[];
  setCustomSelection: (elementId: string) => void;
}

const ReadyToLoanItem: FC<ReadyToLoanItemProps & MaterialProps> = ({
  material,
  pickUpByDate,
  faust = "",
  identifier = "",
  selectedReservations,
  setCustomSelection
}) => {
  const t = useText();
  const { title, authors, year, materialType } = material || {};
  const formattedPickupDate = dayjs(pickUpByDate).format(dateFormatDefault);

  return (
    <li>
      <div className="list-materials">
        <div className="list-materials__checkbox mr-32">
          <CheckBox
            id={faust || identifier}
            label=""
            selected={selectedReservations.includes(faust || identifier)}
            onChecked={() => {
              setCustomSelection(faust || identifier);
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
            {authors && authors} {year && year}
          </p>
        </div>
        <div className="list-materials__status">
          <div className="status-label status-label--info ">
            {t("pickUpLatestText")} {formattedPickupDate && formattedPickupDate}
          </div>
        </div>
      </div>
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(ReadyToLoanItem));
