import * as React from "react";

export interface HelloProps {
  // This is an example of a list of known strings.
  // By specifying the possibilities the code becomes more strict.
  what: "world" | "human" | "animal";
  shouldBeEmphasized: boolean;
}

export const Hello = ({ shouldBeEmphasized, what }: HelloProps) => {
  return <>Hello {shouldBeEmphasized ? <strong>{what}</strong> : what}!</>;
};

export default Hello;
