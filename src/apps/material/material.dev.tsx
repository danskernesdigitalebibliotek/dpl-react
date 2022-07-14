import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MaterialEntry, { MaterialEntryProps } from "./material.entry";

export default {
  title: "Apps / Material",
  component: MaterialEntry,
  argTypes: {
    pid: {
      name: "pid",
      defaultValue: "870970-basis:52557240",
      control: { type: "text" }
    },
    materialHeaderAuthorByText: {
      name: "Af forfatter",
      defaultValue: "Af ",
      control: { type: "text" }
    },
    periodikumSelectYearText: {
      name: "År",
      defaultValue: "År",
      control: { type: "text" }
    },
    periodikumSelectWeekText: {
      name: "Uge",
      defaultValue: "Uge",
      control: { type: "text" }
    },
    reserveBookText: {
      name: "Reserve book",
      defaultValue: "RESERVER BOG",
      control: { type: "text" }
    },
    fineOnBookshelfText: {
      name: "Fine on bookshelf",
      defaultValue: "FINE PÅ HYLDEN",
      control: { type: "text" }
    },
    inTheSameSeriesText: {
      name: "In the same series",
      defaultValue: "I samme serie",
      control: { type: "text" }
    },
    subjectsText: {
      name: "Emneord ",
      defaultValue: "Emneord ",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MaterialEntry>;

export const Material: ComponentStory<typeof MaterialEntry> = (
  args: MaterialEntryProps
) => <MaterialEntry {...args} />;
