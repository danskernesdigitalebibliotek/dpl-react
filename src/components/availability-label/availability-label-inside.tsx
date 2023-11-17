import clsx from "clsx";
import React from "react";
import CheckIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg";
import TextLineSkeleton from "../skeletons/TextLineSkeleton";

type Props = {
  selected?: boolean;
  isLoading: boolean;
  isAvailable?: boolean;
  manifestText: string;
  availabilityText?: string;
  quantity?: number;
};

const AvailabilityLabelInside: React.FunctionComponent<Props> = ({
  selected,
  isLoading,
  isAvailable,
  manifestText,
  availabilityText,
  quantity
}) => {
  const availableTriangleCss = isAvailable ? "success" : "alert";

  const classes = {
    triangle: clsx(
      { "pagefold-triangle--none": selected },
      {
        [`pagefold-triangle--xsmall pagefold-triangle--${availableTriangleCss}`]:
          !selected
      }
    ),
    check: clsx("availability-label__check", selected && "selected")
  };

  return (
    <>
      <div className={classes.triangle} />
      <img className={classes.check} src={CheckIcon} alt="" />
      {manifestText && (
        <>
          <p
            className="availability-label__text text-label-semibold ml-24"
            data-cy="availability-label-type"
          >
            {manifestText}
          </p>
          <div className="availability-label__divider ml-4" />
        </>
      )}
      <p
        className={`availability-label__text text-label-normal ${
          manifestText ? "ml-4" : "ml-24"
        } mr-8`}
        data-cy="availability-label-status"
      >
        {isLoading ? <TextLineSkeleton width={40} /> : availabilityText}
      </p>
      {quantity && (
        <>
          <div className="availability-label--divider ml-4" />
          <p className="text-label-normal mx-8">{quantity} stk</p>
        </>
      )}
    </>
  );
};

export default AvailabilityLabelInside;
