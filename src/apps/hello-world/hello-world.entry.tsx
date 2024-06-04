import React from "react";
import { withText } from "../../core/utils/text";
import HelloWorld from "./hello-world";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";

export interface HelloWorldEntryProps {
  titleText: string;
  introductionText: string;
  whatText: string;
}

const HelloWorldEntry: React.FC<
  HelloWorldEntryProps & GlobalEntryTextProps
> = () => <HelloWorld />;

export default withText(HelloWorldEntry);
