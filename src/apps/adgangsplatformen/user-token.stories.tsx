import type { Meta, StoryFn } from "@storybook/react-webpack5";
import React from "react";
import UserToken from "./user-token";

export default {
  title: "SB Utilities / Set User Token",
  component: UserToken
} as Meta<typeof UserToken>;

export const UserTokenApp: StoryFn<typeof UserToken> = () => {
  return <UserToken />;
};
