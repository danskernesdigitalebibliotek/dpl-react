import React, { FC } from "react";

interface MenuNavigationData {
  name: string;
  link: string;
  dataId: string;
}

interface MenuNavigationListProps {
  menuNavigationData: MenuNavigationData[];
  loansCount: number;
  reservationCount: number;
  feeCount: number;
}

const MenuNavigationList: FC<MenuNavigationListProps> = ({
  menuNavigationData,
  loansCount,
  reservationCount,
  feeCount
}) => {
  /*
  TODO: elaborate mapping of menu content and data-sources.
  As the menu content from drupal and the data-sources
  providing the number of items from diverse data endpoints are noncoherent, we need a way to
  map x menu-content to y data-content.
  */
  const dataMap: { [key: string]: number } = {
    "1": loansCount, // Loans
    "2": reservationCount, // Reservations
    "3": 0, // TODO: Get count of "My List"
    "4": feeCount // Fees & Replacement costs
  };
  return (
    <>
      {menuNavigationData.map(({ name, link, dataId }: MenuNavigationData) => (
          <div className="link-filters__tag-wrapper">
            <a href={link} className="link-tag link-tag link-filters__tag">
              {name}
            </a>
            {dataMap[dataId] !== 0 && (
              <span className="link-filters__counter">{dataMap[dataId]}</span>
            )}
          </div>
        );
      })}
    </>
  );
};
export default MenuNavigationList;
