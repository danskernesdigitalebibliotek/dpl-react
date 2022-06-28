# UI Text Handling

This document describes how to use the text functionality
that is partly defined in src/core/utils/text.tsx and in src/core/text.slice.ts.

## Main Purpose

The main purpose of the functionality is to be able to access strings defined
at app level inside of sub components
without passing them all the way down via props.
You can read more about the decision
and considerations [here](../architecture/adr-002-ui-text-handling.md).

## How to use it

In order to use the system the component that has the text props
needs to be wrapped with the `withText` high order function.
The texts can hereafter be accessed by using the `useText` hook.

### Example of using withText

In this example we have a HelloWorld app with three text props attached:

```tsx
import React from "react";
import { withText } from "../../core/utils/text";
import HelloWorld from "./hello-world";

export interface HelloWorldEntryProps {
  titleText: string;
  introductionText: string;
  whatText: string;
}

const HelloWorldEntry: React.FC<HelloWorldEntryProps> = (
  props: HelloWorldEntryProps
) => <HelloWorld />;

export default withText(HelloWorldEntry);
```

Now it is possible to access the strings like this:

```tsx
import * as React from "react";
import { Hello } from "../../components/hello/hello";
import { useText } from "../../core/utils/text";

const HelloWorld: React.FC = () => {
  const t = useText();
  return (
    <article>
      <h2>{t("titleText")}</h2>
      <p>{t("introductionText")}</p>
      <p>
        <Hello shouldBeEmphasized />
      </p>
    </article>
  );
};
export default HelloWorld;

```
