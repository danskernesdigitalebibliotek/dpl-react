import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import OpeningHoursEditor from "./OpeningHoursEditor.entry";

export default {
  title: "Apps / Opening Hours Editor",
  component: OpeningHoursEditor,
  argTypes: {
    ...serviceUrlArgs,
    openingHoursRemoveEventButtonText: {
      name: "Opening hours remove event button",
      defaultValue: "Remove event",
      control: { type: "text" }
    },
    openingHoursInvalidEventText: {
      name: "Opening hours invalid event text",
      defaultValue: "Invalid event. No start or end time",
      control: { type: "text" }
    },
    openingHoursEditorCategoriesConfig: {
      name: "Opening hours categories",
      defaultValue:
        '[{"title":"\\u00c5bent","color":"#B3DC6C"},{"title":"Telefontid","color":"#FBE983"},{"title":"Borgerservice","color":"lightblue"}]',
      control: { type: "text" }
    },
    openingHoursBranchIdConfig: {
      name: "Opening hours branch id",
      defaultValue: "12",
      control: { type: "text" }
    },
    initialDate: {
      name: "Initial date to show",
      // This date is aligned with the wiremock data
      defaultValue: new Date("2024-03-25"),
      control: { type: "date" }
    },
    openingHoursEventFormCategoryText: {
      name: "Opening hours event form category",
      defaultValue: "Opening hour",
      control: { type: "text" }
    },
    openingHoursEventFormStartTimeText: {
      name: "Opening hours event form start time",
      defaultValue: "Start time",
      control: { type: "text" }
    },
    openingHoursEventFormEndTimeText: {
      name: "Opening hours event form end time",
      defaultValue: "End time",
      control: { type: "text" }
    },
    openingHoursEventFormSubmitText: {
      name: "Opening hours event form submit",
      defaultValue: "Submit",
      control: { type: "text" }
    },
    openingHoursEventFormRepeatedText: {
      name: "Opening hours event form repeated",
      defaultValue:
        "Repeat opening hour weekly every @weekDayName from @startDate",
      control: { type: "text" }
    },
    openingHoursEventFormEndDateText: {
      name: "Opening hours event to end date",
      defaultValue: "End date",
      control: { type: "text" }
    },
    openingHoursEventFormStartDateText: {
      name: "Opening hours event form start date",
      defaultValue: "Start date",
      control: { type: "text" }
    },
    openingHoursEventFormEveryWeekdayText: {
      name: "Opening hours event form every weekday",
      defaultValue: "Every",
      control: { type: "text" }
    },
    openingHoursConfirmAddRepeatedText: {
      name: "Opening hours confirm add repeated",
      defaultValue: "Do you want to add this repeated opening hour?",
      control: { type: "text" }
    },
    openingHoursConfirmAddRepeatedCancelText: {
      name: "Opening hours confirm add repeated cancel",
      defaultValue: "Cancel",
      control: { type: "text" }
    },
    openingHoursConfirmRepeatedSubmitText: {
      name: "Opening hours confirm add repeated submit",
      defaultValue: "I'm sure",
      control: { type: "text" }
    },
    openingHoursRepeatedIconAltText: {
      name: "Opening hours repeated icon alt text",
      defaultValue: "Repeated opening hour",
      control: { type: "text" }
    },
    openingHoursEditEventConfirmOptionThisText: {
      name: "Opening hours remove event confirm option this",
      defaultValue: "Only this instance",
      control: { type: "text" }
    },
    openingHoursEditEventConfirmOptionAllText: {
      name: "Opening hours remove event confirm option all",
      defaultValue: "This and future instances",
      control: { type: "text" }
    },
    openingHoursRemoveEventTitleText: {
      name: "Opening hours remove event title",
      defaultValue: "Remove opening hour",
      control: { type: "text" }
    },
    openingHoursEditEventTitleText: {
      name: "Opening hours edit event title",
      defaultValue: "Edit opening hour",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof OpeningHoursEditor>;

export const App: ComponentStory<typeof OpeningHoursEditor> = (args) => (
  <OpeningHoursEditor {...args} />
);
