import type { Meta, StoryFn } from "@storybook/react-webpack5";
import React from "react";
import LibraryToken from "./library-token";

export default {
  title: "SB Utilities / Set Library Token",
  component: LibraryToken
} as Meta<typeof LibraryToken>;

export const LibraryTokenApp: StoryFn<typeof LibraryToken> = () => {
  return <LibraryToken />;
};
