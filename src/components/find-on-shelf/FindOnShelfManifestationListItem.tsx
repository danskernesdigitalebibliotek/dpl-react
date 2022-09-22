import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";

export interface FindOnShelfManifestationListItemProps {
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
  department,
  location,
  sublocation,
  title,
  publicationYear,
  numberAvailable
}) => {
  const t = useText();

  return (
    <li className="find-on-shelf__row text-body-medium-regular">
      <span className="find-on-shelf__material-text">
        {title}
        {publicationYear ? `, ${publicationYear}` : ""}
      </span>
      <span>
        {`${department ? `${department}` : ""}
      ${(department && sublocation) || (department && location) ? " · " : ""}
      ${sublocation ? `${sublocation}` : ""}
      ${(sublocation && location) || (department && location) ? " · " : ""}
      ${location ? `${location}` : ""}`}
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
