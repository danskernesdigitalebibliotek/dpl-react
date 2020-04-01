import React from "react";
import { text, withKnobs, number } from "@storybook/addon-knobs";
import RelatedMaterialsEntry from "./related-materials.entry";
import "./related-materials.scss";

export default {
  title: "Apps|Related materials",
  decorators: [withKnobs]
};

export function Entry() {
  return (
    <RelatedMaterialsEntry
      subjects={text("Subjects to include in search", "magi troldmænd")}
      categories={text("Categories to include in search", "børnematerialer")}
      sources={text(
        "Sources to include in search",
        "bibliotekskatalog 'ereolen' 'ereolen global' 'comics plus' 'ebook central' 'rbdigital magazines'"
      )}
      excludeTitle={text(
        "Title not to include",
        "'harry potter og fønixordenen'"
      )}
      searchUrl={text(
        "Search URL",
        "https://lollandbib.dk/search/ting/:query?sort=:sort"
      )}
      materialUrl={text(
        "Material URL",
        "https://lollandbib.dk/ting/object/:pid"
      )}
      coverServiceUrl={text(
        "Cover Service URL",
        "https://cover.dandigbib.org/api"
      )}
      titleText={text("Title text", "Forslag")}
      searchText={text("Search text", "Søg")}
      amount={number("Amount of materials", 10)}
      maxTries={number("Amount of tries to fetch materials", 5)}
    />
  );
}
