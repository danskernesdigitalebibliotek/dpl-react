import React from "react";
import TextField from "./textfield";

export default {
  title: "Atoms/TextField"
};

const Template = args => <TextField {...args} />;

export const Base = Template.bind({});
Base.args = {
  label: "Some label",
  defaultValue: "Value"
};

export const Error = Template.bind({});
Error.args = {
  label: "Some label",
  defaultValue: "Value",
  error: "Something is wrong"
};
