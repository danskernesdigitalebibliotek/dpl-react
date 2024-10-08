import Alert from "./alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    variant: {
      options: ["info", "warning", "success"],
      control: { type: "radio" }
    }
  }
};

export default meta;

export const Info = {
  args: {
    variant: "info",
    message: "Hov, der opstod en fejl!"
  }
};

export const Warning = {
  args: {
    variant: "warning",
    message: "Noget gik galt"
  }
};

export const Success = {
  args: {
    variant: "success",
    message: "Det lykkedes"
  }
};
