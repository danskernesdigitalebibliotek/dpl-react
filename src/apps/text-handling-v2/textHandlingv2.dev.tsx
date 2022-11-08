import React from "react";
import { useText, withText } from "../../core/utils/text";

export default {
  title: "Apps / Text Handling v2",
  argTypes: {
    "version-2SimpleText": {
      name: "Version 2 simple text",
      defaultValue: "This is a @simple test",
      control: { type: "text" }
    },
    "version-2PlaceholdersText": {
      name: "Version 2 placeholders text",
      defaultValue:
        '{"type":"simple","text":["This is a text with a @placeholder embedded. Does it work? @result it does!"]}',
      control: { type: "text" }
    },
    "version-2PluralText": {
      name: "Version 2 plural text",
      defaultValue:
        '{"type":"plural","text":["You have 1 material on the waiting list","You have @count materials on the waiting list"]}',
      control: { type: "text" }
    }
  }
};

const Template = () => {
  const t = useText();
  const simple = t("version-2SimpleText", {
    placeholders: {
      "@simple": "simple"
    }
  });
  const placeholders = t("version-2PlaceholdersText", {
    placeholders: {
      "@placeholder": "teddy bear",
      "@result": "Yes"
    }
  });
  const plural1 = t("version-2PluralText", {
    count: 1,
    placeholders: {
      "@count": "1"
    }
  });
  const plural2 = t("version-2PluralText", {
    count: 10,
    placeholders: {
      "@count": "10"
    }
  });
  return (
    <pre>
      {JSON.stringify({ simple, placeholders, plural1, plural2 }, null, 2)}
    </pre>
  );
};

export const Demo = withText(Template);
