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

### Simple example

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

### Placeholder example

It is also possible to use placeholders in the text strings.
They can be handy when you want dynamic values embedded in the text.

A classic example is the welcome message to the authenticated user.
Let's say you have a text with the key: `welcomeMessageText`.
The value from the data prop is: `Welcome @username, today is @date`.
You would the need to reference it like this:

```tsx
import * as React from "react";
import { useText } from "../../core/utils/text";

const HelloUser: React.FC = () => {
  const t = useText();
  const username = getUsername();
  const currentDate = getCurrentDate();

  const message = t("welcomeMessageText", {
    placeholders: {
      "@user": username,
      "@date": currentDate
    }
  });

  return (
    <div>{message}</div>
  );
};
export default HelloUser;

```

### Plural example

Some times you want two versions of a text be shown
depending on if you have one or multiple items being referenced in the text.

That can be accommodated by using the plural text definition.

Let's say that the authenticated user has a list of unread message in an inbox.
You could have a text key called: `inboxStatusText`.
The value from the data prop is:

```json
{"type":"plural","text":["You have 1 message in the inbox",
"You have @count messages in the inbox"]}.
```

You would the need to reference it like this:

```tsx
import * as React from "react";
import { useText } from "../../core/utils/text";

const InboxStatus: React.FC = () => {
  const t = useText();
  const user = getUser();
  const inboxMessageCount = getUserInboxMessageCount(user);

  const status = t("inboxStatusText", {
    count: inboxMessageCount,
    placeholders: {
      "@count": inboxMessageCount
    }
  });

  return (
    <div>{status}</div>
    // If count == 1 the texts will be:
    // "You have 1 message in the inbox"

    // If count == 5  the texts will be:
    // "You have 5 messages in the inbox"
  );
};
export default InboxStatus;

```
