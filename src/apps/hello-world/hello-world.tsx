import * as React from "react";
import Hello from "../../components/hello/hello";

interface HelloWorldProps {
  title: string;
  introduction: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ title, introduction }) => {
  return (
    <article>
      <h2>{title}</h2>
      <p>{introduction}</p>
      <p>
        <Hello what="world" shouldBeEmphasized />
      </p>
    </article>
  );
};

export default HelloWorld;
