import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import DemoModal, { DemoModalProps } from "./demo-modal";

export default {
  title: "Demo modal",
  component: DemoModal,
  decorators: [withQuery],
  parameters: {
    query: {
      "demo-modal-one": "true"
    }
  },
  argTypes: {
    ariaLabelModalOne: {
      defaultValue: "Luk dialog et"
    },
    ariaLabelModalTwo: {
      defaultValue: "Luk dialog to"
    }
  }
} as ComponentMeta<typeof DemoModal>;

export const App: ComponentStory<typeof DemoModal> = (
  props: DemoModalProps
) => <DemoModal {...props} />;
