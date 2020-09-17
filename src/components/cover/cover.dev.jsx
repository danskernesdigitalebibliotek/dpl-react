import React from "react";
import Cover from "./cover";

export default {
  title: "Atoms/Cover"
};

const Template = args => <Cover {...args} />;

export const Base = Template.bind({});
Base.args = {
  status: "retrieved",
  src:
    "https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg",
  alt: "Value",
  className: "",
  coverClassName: ""
};

export const Initial = Template.bind({});
Initial.args = {
  status: "initial",
  alt: "Loading...",
  coverClassName: ""
};
