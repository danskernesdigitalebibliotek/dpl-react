import React, { FC, ReactNode } from "react";
import Arrow from "../atoms/icons/arrow/arrow";
import MediaImage from "../media-container/MediaImage";

type ContentListItemProps = {
  url: string;
  title: string;
  image?: string;
  tags?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
};

const ContentListItem: FC<ContentListItemProps> = ({
  url,
  title,
  image,
  tags,
  meta,
  children
}) => (
  <li className="content-list__item">
    <a
      className="content-list-item content-list-item-grid arrow__hover--right-small"
      href={url}
    >
      <div className="content-list-item__image-container">
        <MediaImage src={image} />
      </div>
      <div className="content-list-item__content">
        <div className="content-list-item__tag-container">{tags}</div>
        <div className="content-list-item__content-top-container">
          <div className="content-list-item__content-top-container__inner">
            <h2 className="content-list-item__title">{title}</h2>
            {children && (
              <div className="content-list-item__description">{children}</div>
            )}
          </div>
          <div className="content-list-item__content-top-container__meta">
            {meta}
          </div>
        </div>
        <div className="content-list-item__content-bottom-container" />
      </div>
      <Arrow />
    </a>
  </li>
);

export default ContentListItem;
