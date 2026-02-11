import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import DateRangeInput from "./DateRangeInput";

const meta: Meta<typeof DateRangeInput> = {
  title: "Components / Date Range Input",
  component: DateRangeInput,
  argTypes: {
    label: {
      control: { type: "text" }
    },
    placeholder: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof DateRangeInput>;

// Wrapper component to handle state
const DateRangeInputWithState = (
  args: React.ComponentProps<typeof DateRangeInput>
) => {
  const [startDate, setStartDate] = useState<string>(args.startDate || "");
  const [endDate, setEndDate] = useState<string>(args.endDate || "");

  return (
    <DateRangeInput
      {...args}
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
};

export const Default: Story = {
  render: (args) => <DateRangeInputWithState {...args} />,
  args: {
    label: "Select date range",
    placeholder: "Choose dates",
    startDate: "",
    endDate: ""
  }
};

export const WithSelectedRange: Story = {
  render: (args) => <DateRangeInputWithState {...args} />,
  args: {
    label: "Select date range",
    placeholder: "Choose dates",
    startDate: "2035-03-15",
    endDate: "2035-03-20"
  }
};

// Regression test: User has expired pause period from the past
// The calendar should always open at the current month, not at the expired dates
export const WithExpiredDates: Story = {
  render: (args) => <DateRangeInputWithState {...args} />,
  args: {
    label: "Pause period",
    placeholder: "Select start and end date",
    startDate: "2024-08-01",
    endDate: "2024-08-31"
  }
};
