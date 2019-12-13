import React from "react";
import { text } from "@storybook/addon-knobs";
import Searchlist from "./searchlist.entry";
import "./searchlist.scss";

export default { title: "Apps|Searchlist" };

export function Entry() {
  return (
    <Searchlist
      searchUrl={text("Search URL", "https://lollandbib.dk/search/ting/:query")}
      materialUrl={text(
        "Material URL",
        "https://lollandbib.dk/ting/object/:pid"
      )}
      authorUrl={text(
        "Author URL",
        'https://lollandbib.dk/search/ting/phrase.creator=":author"'
      )}
    />
  );
}
