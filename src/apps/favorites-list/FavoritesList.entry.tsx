import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import FavoritesList from "./FavoritesList";

interface FavoritesListConfigEntryProps {
  fbsBaseUrlConfig: string;
}
// TODO: Make a global interface for the urls at src/core/utils/types, to avoid redefining the same props over and over again.
interface FavoritesListUrlEntryProps {
  materialUrl: string;
  searchUrl: string;
  fbsBaseUrl: string;
  materialOverdueUrl: string;
  feesPageUrl: string;
  publizonBaseUrl: string;
  dplCmsBaseUrl: string;
  coverBaseUrl: string;
  materialBaseUrl: string;
  fbiBaseUrl: string;
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
