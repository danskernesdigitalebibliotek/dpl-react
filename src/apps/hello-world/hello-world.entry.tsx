import * as React from "react";
import HelloWorld from "./hello-world";

export interface HelloWorldEntryProps {
  titleText: string;
  introductionText: string;
}

const HelloWorldEntry: React.FC<HelloWorldEntryProps> = ({
  titleText,
  introductionText
}) => {
  return <HelloWorld title={titleText} introduction={introductionText} />;
};

export default HelloWorldEntry;
