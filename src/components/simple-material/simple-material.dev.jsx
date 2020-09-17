import React from "react";
import SimpleMaterial from "./simple-material";

export default {
  title: "Components/Simple Material"
};

const Template = args => <SimpleMaterial {...args} />;

export const Base = Template.bind({});
Base.args = {
  item: {
    creators: ["Pablo Hidalgo"],
    pid: "870970-basis:52836913",
    title: "Star wars - Rogue One : ultimativ illustreret guide",
    type: "Bog",
    year: "2016"
  },
  coverSize: "small",
  ofText: "Af",
  materialUrl: "https://lollandbib.dk/ting/object/:pid",
  authorUrl: 'https://lollandbib.dk/search/ting/phrase.creator=":author"',
  coverServiceUrl: "https://cover.dandigbib.org/api/v2"
};
