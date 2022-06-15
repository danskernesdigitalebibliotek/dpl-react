import * as React from "react";
import HelloWorld from "./hello-world";
import {
  useAddItem,
  useGetList
} from "../../core/material-list-api/material-list";

export interface HelloWorldEntryProps {
  titleText: string;
  introductionText: string;
}

const HelloWorldEntry: React.FC<HelloWorldEntryProps> = ({
  titleText,
  introductionText
}) => {
  const test = useGetList("default");
  // const test2 = useAddItem({
  //   mutation: { listId: "default", itemId: "123456-basis:123456789" }
  // });
  console.log(test);

  return <HelloWorld title={titleText} introduction={introductionText} />;
};

export default HelloWorldEntry;
