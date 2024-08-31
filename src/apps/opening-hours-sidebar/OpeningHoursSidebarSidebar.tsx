import React, { FC } from "react";
import iconWatch from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-watch-static.svg";
import DisclosureControllable from "../../components/Disclosures/DisclosureControllable";
import OpeningHoursSidebarSummary from "./OpeningHoursSidebarSummary";
import OpeningHoursSidebarDetails from "./OpeningHoursSidebarDetails";
import { LibraryType, toDayString } from "./helper";
import { useText } from "../../core/utils/text";

const OpeningHoursSidebarSidebar: FC<{ libraries: LibraryType[] }> = ({
  libraries
}) => {
  const t = useText();
  return (
    <section className="opening-hours-sidebar">
      <header className="opening-hours-sidebar__header">
        <img src={iconWatch} className="opening-hours-sidebar__icon" alt="" />
        <div className="opening-hours-sidebar__texts">
          <h2 className="opening-hours-sidebar__title">
            {t("openingHoursText")}
          </h2>
          <p className="opening-hours-sidebar__date">
            {t("openingHoursSidebarTodayText", {
              placeholders: {
                "@toDayString": toDayString()
              }
            })}
          </p>
        </div>
      </header>

      {libraries.map(({ branch_id, name, openingHoursData, link }, i) => (
        <DisclosureControllable
          showContent={i === 0}
          key={branch_id}
          id={branch_id}
          detailsClassName="opening-hours-sidebar-details"
          summaryClassName="opening-hours-sidebar-summary"
          summary={<OpeningHoursSidebarSummary name={name} />}
        >
          <OpeningHoursSidebarDetails
            openingHoursData={openingHoursData}
            link={link}
          />
        </DisclosureControllable>
      ))}
    </section>
  );
};

export default OpeningHoursSidebarSidebar;
