import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import LibraryToken from "./library-token";

export default {
  title: "SB Utilities / Set Library Token",
  component: LibraryToken
} as ComponentMeta<typeof LibraryToken>;

export const LibraryTokenApp: ComponentStory<typeof LibraryToken> = () => {
  return <LibraryToken />;
};
