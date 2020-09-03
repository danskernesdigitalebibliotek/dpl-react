import React from "react";
import RelatedMaterials from "./related-materials.entry";
import "./related-materials.scss";

export default {
  title: "Apps/Related materials",
  argTypes: {
    amount: {
      control: {
        type: "range",
        min: 0,
        max: 50
      }
    },
    maxTries: {
      control: {
        type: "range",
        min: 0,
        max: 10
      }
    }
  }
};

const Template = args => <RelatedMaterials {...args} />;

export const Entry = Template.bind({});
Entry.args = {
  subjects: "magi,troldmænd",
  categories: "børnematerialer",
  sources:
    "bibliotekskatalog,ereolen,ereolen global,comics plus,ebook central,rbdigital magazines",
  excludeTitle: "harry potter og fønixordenen",
  searchUrl: "https://lollandbib.dk/search/ting/:query?sort=:sort",
  materialUrl: "https://lollandbib.dk/ting/object/:pid",
  coverServiceUrl: "https://cover.dandigbib.org/api/v2",
  titleText: "Forslag",
  searchText: "Søg",
  amount: 10,
  maxTries: 5,
  agencyId: "736000"
};
