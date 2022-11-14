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
  const dataMap: { [key: string]: number } = {
    "1": loansCount, // Loans
    "2": reservationCount, // Reservations
    "3": 0, // TODO: Get count of "Huskeliste"
    "4": feeCount // Fees & Replacement costs
  };
  return (
    <>
      {menuNavigationData.map(({ name, link, dataId }: MenuNavigationData) => {
        return (
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
