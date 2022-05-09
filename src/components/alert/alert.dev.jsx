import React from "react";
import Alert from "./alert";

export default { title: "Components/Alert" };

const Template = (args) => <Alert {...args} />;

export const Info = Template.bind({});

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
  message: "Noget gik galt"
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  message: "Det lykkedes"
};
