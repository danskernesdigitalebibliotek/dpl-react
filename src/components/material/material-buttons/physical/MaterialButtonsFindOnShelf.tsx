import * as React from "react";
import { FC } from "react";
import { useGetAvailabilityV3 } from "../../../../core/fbs/fbs";
import { useText } from "../../../../core/utils/text";
import { FaustId } from "../../../../core/utils/types/ids";
import { Button } from "../../../Buttons/Button";

export interface MaterialButtonsFindOnShelfProps {
  isButton?: boolean;
  faustIds: FaustId[];
}

const MaterialButtonsFindOnShelf: FC<MaterialButtonsFindOnShelfProps> = ({
  isButton,
  faustIds
}) => {
  const t = useText();
  const { data, isLoading, isError } = useGetAvailabilityV3({
    recordid: faustIds
  });

  const onClick = () => {
    // we open the find on shelf modal here
  };

  // If element is currently focused on, we would like to let users open it using enter
  const onKeyUp = (key: string) => {
    if (key === "Enter") {
      onClick();
    }
  };

  if (!data || isError || isLoading) {
    // TODO: handle error here once we handle errors
    return null;
  }

  if (isButton) {
    if (!data[0].available) {
      return (
        <Button
          label={t("materialIsLoanedOutText")}
          buttonType="none"
          variant="outline"
          disabled
          collapsible={false}
          size="large"
        />
      );
    }
    return (
      <Button
        label={t("findOnBookshelfText")}
        buttonType="none"
        variant="outline"
        disabled={false}
        collapsible={false}
        size="large"
        onClick={onClick}
      />
    );
  }

  if (!data[0].available) {
    return (
      <span className="text-small-caption material-manifestation-item__find capitalize-all">
        {t("materialIsLoanedOutText")}
      </span>
    );
  }

  return (
      aria-describedby={t("findOnShelfExpandButtonExplanationText")}
      onClick={onClick}
      onKeyUp={(e) => onKeyUp(e.key)}
      role="button"
      tabIndex={0}
    >
      {t("findOnBookshelfText")}
    </span>
  );
};

export default MaterialButtonsFindOnShelf;
