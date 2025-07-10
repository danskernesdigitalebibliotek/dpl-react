import type { Meta, StoryObj } from "@storybook/react-webpack5";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import OpeningHoursEditor from "./OpeningHoursEditor.entry";

const meta: Meta<typeof OpeningHoursEditor> = {
  title: "Apps / Opening Hours Editor",
  component: OpeningHoursEditor,
  argTypes: {
    ...serviceUrlArgTypes,
    openingHoursRemoveEventButtonText: {
      description: "Opening hours remove event button",
      control: { type: "text" }
    },
    openingHoursInvalidEventText: {
      description: "Opening hours invalid event text",
      control: { type: "text" }
    },
    openingHoursEditorCategoriesConfig: {
      description: "Opening hours categories",
      control: { type: "text" }
    },
    openingHoursBranchIdConfig: {
      description: "Opening hours branch id",
      control: { type: "text" }
    },
    initialDate: {
      description: "Initial date to show",
      control: { type: "date" }
    },
    openingHoursEventFormCategoryText: {
      description: "Opening hours event form category",
      control: { type: "text" }
    },
    openingHoursEventFormStartTimeText: {
      description: "Opening hours event form start time",
      control: { type: "text" }
    },
    openingHoursEventFormEndTimeText: {
      description: "Opening hours event form end time",
      control: { type: "text" }
    },
    openingHoursEventFormSubmitText: {
      description: "Opening hours event form submit",
      control: { type: "text" }
    },
    openingHoursEventFormRepeatedText: {
      description: "Opening hours event form repeated",
      control: { type: "text" }
    },
    openingHoursEventFormEndDateText: {
      description: "Opening hours event to end date",
      control: { type: "text" }
    },
    openingHoursEventFormStartDateText: {
      description: "Opening hours event form start date",
      control: { type: "text" }
    },
    openingHoursEventFormEveryWeekdayText: {
      description: "Opening hours event form every weekday",
      control: { type: "text" }
    },
    openingHoursConfirmAddRepeatedText: {
      description: "Opening hours confirm add repeated",
      control: { type: "text" }
    },
    openingHoursConfirmAddRepeatedCancelText: {
      description: "Opening hours confirm add repeated cancel",
      control: { type: "text" }
    },
    openingHoursConfirmRepeatedSubmitText: {
      description: "Opening hours confirm add repeated submit",
      control: { type: "text" }
    },
    openingHoursRepeatedIconAltText: {
      description: "Opening hours repeated icon alt text",
      control: { type: "text" }
    },
    openingHoursEditEventConfirmOptionThisText: {
      description: "Opening hours remove event confirm option this",
      control: { type: "text" }
    },
    openingHoursEditEventConfirmOptionAllText: {
      description: "Opening hours remove event confirm option all",
      control: { type: "text" }
    },
    openingHoursRemoveEventTitleText: {
      description: "Opening hours remove event title",
      control: { type: "text" }
    },
    openingHoursEditEventTitleText: {
      description: "Opening hours edit event title",
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof OpeningHoursEditor>;

export const Primary: Story = {
  args: {
    ...serviceUrlArgs,
    openingHoursRemoveEventButtonText: "Remove event",
    openingHoursInvalidEventText: "Invalid event. No start or end time",
    openingHoursEditorCategoriesConfig:
      '[{"title":"\\u00c5bent","color":"#B3DC6C"},{"title":"Telefontid","color":"#FBE983"},{"title":"Borgerservice","color":"lightblue"}]',
    openingHoursBranchIdConfig: "12",
    initialDate: new Date("2024-03-25"),
    openingHoursEventFormCategoryText: "Opening hour",
    openingHoursEventFormStartTimeText: "Start time",
    openingHoursEventFormEndTimeText: "End time",
    openingHoursEventFormSubmitText: "Submit",
    openingHoursEventFormRepeatedText:
      "Repeat opening hour weekly every @weekDayName from @startDate",
    openingHoursEventFormEndDateText: "End date",
    openingHoursEventFormStartDateText: "Start date",
    openingHoursEventFormEveryWeekdayText: "Every",
    openingHoursConfirmAddRepeatedText:
      "Do you want to add this repeated opening hour?",
    openingHoursConfirmAddRepeatedCancelText: "Cancel",
    openingHoursConfirmRepeatedSubmitText: "I'm sure",
    openingHoursRepeatedIconAltText: "Repeated opening hour",
    openingHoursEditEventConfirmOptionThisText: "Only this instance",
    openingHoursEditEventConfirmOptionAllText: "This and future instances",
    openingHoursRemoveEventTitleText: "Remove opening hour",
    openingHoursEditEventTitleText: "Edit opening hour"
  }
};
