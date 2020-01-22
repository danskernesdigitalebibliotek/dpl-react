import React from "react";
import { text } from "@storybook/addon-knobs";
import Searchlist from "./searchlist.entry";
import "./searchlist.scss";

export default { title: "Apps|Searchlist" };

export function Entry() {
  return (
    <Searchlist
      followSearchesUrl={text(
        "FollowSearches URL",
        "https://stage.followsearches.dandigbib.org"
      )}
      searchUrl={text("Search URL", "https://lollandbib.dk/search/ting/:query")}
    />
  );
}
