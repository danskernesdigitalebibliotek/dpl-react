import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import DemoModal, { DemoModalEntryProps } from "./demo-modal.entry";
import globalTextArgs, {
  GlobalEntryTextProps
} from "../../core/storybook/globalTextArgs";

export default {
  title: "Apps / Demo modal",
  component: DemoModal,
  decorators: [withQuery],
  parameters: {
    query: {
      modal: "demo-modal-one"
    }
  },
  argTypes: {
    ...globalTextArgs,
    ariaLabelModalOneText: {
      defaultValue: "Luk dialog et"
    },
    ariaLabelModalTwoText: {
      defaultValue: "Luk dialog to"
    },
    screenReaderModalDescriptionText: {
      defaultValue: "Denne modal dækker sidens indhold, og er en demo"
    }
  }
} as ComponentMeta<typeof DemoModal>;

export const App: ComponentStory<typeof DemoModal> = (
  props: DemoModalEntryProps & GlobalEntryTextProps
) => <DemoModal {...props} />;
