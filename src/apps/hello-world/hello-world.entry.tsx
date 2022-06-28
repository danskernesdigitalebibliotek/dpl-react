import React from "react";
import { withText } from "../../core/utils/text";
import HelloWorld from "./hello-world";

export interface HelloWorldEntryProps {
  titleText: string;
  introductionText: string;
  whatText: string;
}

const HelloWorldEntry: React.FC<HelloWorldEntryProps> = () => <HelloWorld />;

export default withText(HelloWorldEntry);
