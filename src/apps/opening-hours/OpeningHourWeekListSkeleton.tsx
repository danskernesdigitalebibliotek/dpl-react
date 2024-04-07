import React from "react";
import clsx from "clsx";

const OpeningHourWeekListSkeleton = () => {
  return (
    <ul className="opening-hours__content">
      {[...Array(5)].map(() => (
        <li className="opening-hours__row">
          <div className="opening-hours__individual-day ssc-line ssc-line-headline" />
          <ul>
            {[...Array(3)].map((_, index) => {
              const isOdd = index % 2 === 0;
              return (
                <li>
                  <div
                    className={clsx("ssc-line", {
                      "ssc-line--odd": !isOdd
                    })}
                  />
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default OpeningHourWeekListSkeleton;
