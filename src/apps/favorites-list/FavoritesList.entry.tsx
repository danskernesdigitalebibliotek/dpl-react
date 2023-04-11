import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import FavoritesList from "./FavoritesList";

interface FavoritesListConfigEntryProps {
  fbsBaseUrlConfig: string;
  blacklistedAvailabilityBranchesConfig: string;
  branchesConfig: string;
}
interface FavoritesListUrlEntryProps {
  materialUrl: string;
  searchUrl: string;
}
interface FavoritesListTextEntryProps {
  favoritesListMaterialsText: string;
  favoritesListHeaderText: string;
  byAuthorText: string;
  etAlText: string;
  showMoreText: string;
  resultPagerStatusText: string;
  favoritesListEmptyText: string;
  inSeriesText: string;
  numberDescriptionText: string;
}

export interface FavoritesListEntryProps
  extends FavoritesListConfigEntryProps,
    FavoritesListTextEntryProps,
    FavoritesListUrlEntryProps {
  pageSizeDesktop?: number;
  pageSizeMobile?: number;
}

const FavoritesListEntry: FC<FavoritesListEntryProps> = ({
  pageSizeDesktop,
  pageSizeMobile
}) => {
  // Get number of result items to be shown.
  // If the number of items has been defined with data attributes use those
  // otherwise get them from the configuration.
  const pageSize = pageSizeGlobal({
    desktop: pageSizeDesktop,
    mobile: pageSizeMobile
  });

  return <FavoritesList pageSize={pageSize} />;
};
export default withConfig(withUrls(withText(FavoritesListEntry)));
