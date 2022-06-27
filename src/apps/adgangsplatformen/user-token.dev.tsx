import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import UserToken from "./user-token";

export default {
  title: "SB Utilities / Set User Token",
  component: UserToken
} as ComponentMeta<typeof UserToken>;

export const UserTokenApp: ComponentStory<typeof UserToken> = () => {
  return <UserToken />;
};
