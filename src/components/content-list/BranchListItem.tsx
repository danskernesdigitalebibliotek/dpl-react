import React, { FC, ReactNode } from "react";
import Arrow from "../atoms/icons/arrow/arrow";
import MediaImage from "../media-container/MediaImage";

type BranchListItemProps = {
  url: string;
  title: string;
  image?: string;
  address?: string;
  city?: string;
  distance?: ReactNode;
};

const BranchListItem: FC<BranchListItemProps> = ({
  url,
  title,
  image,
  address,
  city,
  distance
}) => (
  <a
    className="content-list-item content-list-item-grid content-list-item-grid--branch arrow__hover--right-small"
    href={url}
  >
    <div className="content-list-item__image-container">
      <MediaImage src={image} />
    </div>
    <div className="content-list-item__content">
      <div className="content-list-item__branch-info">
        <h2 className="content-list-item__title">{title}</h2>
        {(address || city) && (
          <address>
            {address}
            <br />
            {city}
          </address>
        )}
      </div>
      {distance && (
        <div className="content-list-item__branch-distance">{distance}</div>
      )}
    </div>
    <Arrow />
  </a>
);

export default BranchListItem;
