import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";
import { Manifestation } from "../../core/utils/types/entities";
import { getFindOnShelfLocationText } from "./helper";

export interface FindOnShelfManifestationListItemProps {
  shelfmark: Manifestation["shelfmark"];
  locationArray: string[];
  title: string;
  publicationYear: string | null;
  numberAvailable: number;
  author: string;
}

const FindOnShelfManifestationListItem: FC<
  FindOnShelfManifestationListItemProps
> = ({
  shelfmark,
  locationArray,
  title,
  publicationYear,
  numberAvailable,
  author
}) => {
  const t = useText();

  const shelfmarkFullText = shelfmark
    ? `${shelfmark.shelfmark} ${shelfmark.postfix}`
    : undefined;

  const locationArrayWithShelfmark = [
    ...locationArray,
    shelfmarkFullText
  ].filter((el) => el);

  return (
    <li className="find-on-shelf__row text-body-medium-regular" role="row">
      <span className="find-on-shelf__material-text" role="cell">
        {title}
        {publicationYear && ` (${publicationYear})`}
      </span>
      <span role="cell">
        {locationArrayWithShelfmark.length
          ? getFindOnShelfLocationText(locationArrayWithShelfmark, author)
          : t("findOnShelfModalNoLocationSpecifiedText")}
      </span>
      <span className="find-on-shelf__item-count-text" role="cell">
        {numberAvailable}{" "}
        <span className="hide-on-desktop">
          {t("findOnShelfModalListItemCountText")}
        </span>
      </span>
    </li>
  );
};

export default FindOnShelfManifestationListItem;
