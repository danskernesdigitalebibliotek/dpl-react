import React, { FC } from "react";

export interface MenuNavigationDataType {
  name: string;
  link: string;
  dataId: string;
}

interface MenuNavigationItemProps {
  loansCount: number;
  reservationCount: number;
  feeCount: number;
  menuNavigationItem: MenuNavigationDataType;
  dataCy?: string;
}

const MenuNavigationItem: FC<MenuNavigationItemProps> = ({
  loansCount,
  reservationCount,
  feeCount,
  menuNavigationItem,
  dataCy = "menu-navigation-item"
}) => {
  /*
  TODO: elaborate mapping of menu content and data-sources.
  As the menu content from drupal and the data-sources
  providing the number of items from diverse data endpoints are noncoherent, we need a way to
  map x menu-content to y data-content.
  */
  const dataMap: { [key: string]: number } = {
    "1": loansCount, // Loans.
    "2": reservationCount, // Reservations.
    // TODO: Get count of "My List".
    "4": feeCount // Fees & Replacement costs.
  };

  const { link, name, dataId } = menuNavigationItem;

  return (
    <li
      data-cy={`${dataCy}-${name.toLowerCase()}`}
      className="link-filters mb-16"
    >
      <div className="link-filters__tag-wrapper">
        <a
          href={link}
          className="link-tag link-tag link-filters__tag"
          aria-label={`${name} ${dataMap[dataId] || ""}`}
        >
          {name}
        </a>
        {dataMap[dataId] !== 0 && (
          <span className="link-filters__counter" aria-hidden="true">
            {dataMap[dataId]}
          </span>
        )}
      </div>
    </li>
  );
};
export default MenuNavigationItem;
