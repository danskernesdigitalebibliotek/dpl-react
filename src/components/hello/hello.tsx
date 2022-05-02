import * as React from "react";

export interface HelloProps {
  // This is an example of a list of known strings.
  // By specifying the possibilities the code becomes more strict.
  what: "world" | "human" | "animal";
  shouldBeEmphasized: boolean;
}

export const Hello: React.FC<HelloProps> = ({ shouldBeEmphasized, what }) => (
  <>Hello {shouldBeEmphasized ? <strong>{what}</strong> : what}!</>
);

export default Hello;
