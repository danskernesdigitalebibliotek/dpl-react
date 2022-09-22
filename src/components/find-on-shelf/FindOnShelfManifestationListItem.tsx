import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";
import { Manifestation } from "../../core/utils/types/entities";

export interface FindOnShelfManifestationListItemProps {
  shelfmark: Manifestation["shelfmark"];
  department: string | undefined;
  location: string | undefined;
  sublocation: string | undefined;
  title: string;
  publicationYear: string;
  numberAvailable: number;
}

const FindOnShelfManifestationListItem: FC<
  FindOnShelfManifestationListItemProps
> = ({
  shelfmark,
  department,
  location,
  sublocation,
  title,
  publicationYear,
  numberAvailable
}) => {
  const t = useText();

  const shelfmarkString = shelfmark
    ? `${shelfmark.shelfmark} ${shelfmark.postfix}`
    : undefined;

  const locationArray = [
    shelfmarkString,
    department,
    sublocation,
    location
  ].filter((el) => el);

  return (
    <li className="find-on-shelf__row text-body-medium-regular">
      <span className="find-on-shelf__material-text">
        {title}
        {publicationYear ? `, ${publicationYear}` : ""}
      </span>
      <span>
        {locationArray.length
          ? locationArray.join(" · ")
          : t("findOnShelfModalNoLocationSpecifiedText")}
      </span>
      <span className="find-on-shelf__item-count-text">
        {numberAvailable}
        <span className="hide-visually--on-desktop">{` ${t(
          "findOnShelfModalListItemCountText"
        )}`}</span>
      </span>
    </li>
  );
};

export default FindOnShelfManifestationListItem;
