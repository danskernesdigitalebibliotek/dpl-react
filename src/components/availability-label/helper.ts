import clsx from "clsx";
import { AccessTypeCodeEnum } from "../../core/dbc-gateway/generated/graphql";
import articleTypes from "../../core/utils/types/article-types";
import { AccessTypes } from "../../core/utils/types/entities";

type GetParrentAvailabilityLabelClassProps = {
  selected?: boolean;
  cursorPointer?: boolean;
};

export const isOnline = (accessTypes: AccessTypeCodeEnum[]): boolean =>
  accessTypes?.includes(AccessTypeCodeEnum.Online) ?? false;

/**
 * Determines if a material should be treated as non-physical for the availability label.
 *
 * Non-physical materials are:
 * - Materials with ONLINE access type
 * - Materials delivered via Digital Article Service
 */
export const isNonPhysicalForAvailabilityLabel = (
  accessTypes: AccessTypeCodeEnum[],
  access: AccessTypes[]
): boolean => {
  // Online materials are always non-physical
  if (isOnline(accessTypes)) {
    return true;
  }

  // Digital Article Service materials are treated as non-physical
  if (access?.includes("DigitalArticleService")) {
    return true;
  }

  return false;
};

export const isArticleByLabelText = (manifestText: string): boolean =>
  articleTypes.some((type) => manifestText.toLowerCase() === type);

export const getParentAvailabilityLabelClass = ({
  selected,
  cursorPointer
}: GetParrentAvailabilityLabelClassProps) =>
  clsx(
    {
      "pagefold-parent--none availability-label--selected": selected
    },
    {
      "pagefold-parent--xsmall availability-label--unselected": !selected
    },
    { "cursor-pointer": cursorPointer },
    "text-label",
    "availability-label"
  );

export default {};
