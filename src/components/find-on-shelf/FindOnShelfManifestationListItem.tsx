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
  publicationYear: string | null;
  numberAvailable: number;
  author: string;
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
  numberAvailable,
  author
}) => {
  const t = useText();

  const shelfmarkFullText = shelfmark
    ? `${shelfmark.shelfmark} ${shelfmark.postfix}`
    : undefined;

  const locationArray = [
    department,
    location,
    sublocation,
    shelfmarkFullText
  ].filter((el) => el);

  return (
    <li className="find-on-shelf__row text-body-medium-regular" role="row">
      <span className="find-on-shelf__material-text" role="cell">
        {title}
        {publicationYear && ` (${publicationYear})`}
      </span>
      <span role="cell">
        {locationArray.length
          ? `${locationArray.join(" · ")}${
              author && author !== "undefined" ? ` · ${author}` : ""
            }`
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
