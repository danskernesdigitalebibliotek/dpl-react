import clsx from "clsx";
import { AccessTypeCode } from "../../core/dbc-gateway/generated/graphql";
import articleTypes from "../../core/utils/types/article-types";

type GetParrentAvailabilityLabelClassProps = {
  selected?: boolean;
  cursorPointer?: boolean;
};

export const isOnline = (accessTypes: AccessTypeCode[]): boolean =>
  accessTypes?.includes(AccessTypeCode.Online) ?? false;

export const isArticle = (manifestText: string): boolean =>
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
