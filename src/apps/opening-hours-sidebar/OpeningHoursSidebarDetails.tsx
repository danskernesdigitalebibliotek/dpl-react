import React, { FC } from "react";
import { LibraryType } from "./helper";
import { useText } from "../../core/utils/text";

const OpeningHoursSidebarDetails: FC<
  Pick<LibraryType, "openingHoursData" | "link" | "name">
> = ({ openingHoursData, link, name }) => {
  const t = useText();
  return (
    <div className="opening-hours-sidebar-details__content">
      <dl className="opening-hours-sidebar-details__list">
        {openingHoursData.map(({ term, description }, i) => (
          <div key={i} className="opening-hours-sidebar-details__item">
            <dt className="opening-hours-sidebar-details__term">{term}</dt>
            <dd className="opening-hours-sidebar-details__description">
              {description}
            </dd>
          </div>
        ))}
      </dl>
      <a href={link} className="opening-hours-sidebar__link">
        {t("openingHoursSidebarLinkText", {
          placeholders: {
            "@branchName": name
          }
        })}
      </a>
    </div>
  );
};

export default OpeningHoursSidebarDetails;
