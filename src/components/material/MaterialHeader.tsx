import React from "react";
import { WorkSimpleFragment } from "../../core/dbc-gateway/generated/graphql";
import { Pid } from "../../core/utils/types/ids";
import { AvailabilityLabel } from "../availability-label/availability-label";
import { AvailabiltityLabels } from "../availability-label/availability-labels";
import ButtonFavourite from "../button-favourite/button-favourite";
import { Button } from "../Buttons/Button";
import { Cover } from "../cover/cover";
import MaterialHeaderText from "./MaterialHeaderText";
import MaterialPeriodikumSelect from "./MaterialPeriodikumSelect";

interface MaterialHeaderProps {
  pid: Pid;
  work: WorkSimpleFragment;
  showPeriodikumSelect?: boolean;
}

const MaterialHeader: React.FC<MaterialHeaderProps> = ({
  pid,
  work: { titles, creators, manifestations },
  showPeriodikumSelect = false
}) => {
  const title = titles.full[0];
  const allAuthorsString = creators.map((author) => author.display).join(", ");

  return (
    <header className="material-header">
      <div className="material-header__cover">
        <Cover materialId={pid} size="large" animate={false} />
      </div>
      <div className="material-header__content">
        <ButtonFavourite materialId={pid} />
        <MaterialHeaderText title={title} author={allAuthorsString} />
        <div className="material-header__availability-label">
          <AvailabiltityLabels manifestations={manifestations} />
        </div>
        {showPeriodikumSelect && <MaterialPeriodikumSelect />}
        <div className="material-header__button">
          <Button
            label="RESERVER BOG"
            buttonType="none"
            variant="filled"
            disabled={false}
            collapsible={false}
            size="large"
          />
          <Button
            label="FIND PÅ HYLDEN"
            buttonType="none"
            variant="outline"
            disabled={false}
            collapsible={false}
            size="large"
          />
        </div>
      </div>
    </header>
  );
};

export default MaterialHeader;
