import { RootState, useSelector } from "../store";
import { addTextEntries } from "../text.slice";
import withSuffix from "./withSuffix";

type Placeholders = Record<string, string | number>;
type TextDefinitionTypes = "simple" | "plural";
type TextDefinition = {
  type: TextDefinitionTypes;
  text: string[];
};
export type UseTextFunction = (
  key: string,
  options?: {
    placeholders?: Placeholders;
    count?: number;
    default?: string
  }
) => string;

const isAJsonObjectString = (str: string) => str.match(/^\{.*\}$/);

class TextDefinitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TextDefinitionError";
  }
}

// This function is trying to convert a text string given to an application
// into a text definition object.
//
// If the text string is a Json object it will be validated.
// If it is valid it will be returned as is
// or otherwise transformed into a text definition object with an error.
//
// If the text string is a string it will be converted to a "simple" text definition.
const constructTextDefinitionFromRawTextTextEntry = (
  rawText: string
): TextDefinition => {
  // String converted to "simple" text definition.
  if (!isAJsonObjectString(rawText)) {
    return {
      type: "simple",
      text: [rawText]
    };
  }

  // Let's try to parse the string as a Json object.
  try {
    const textDefinition = JSON.parse(rawText);

    // Validate the text definition object.
    if (
      typeof textDefinition === "object" &&
      Object.keys(textDefinition).length === 2 &&
      Object.keys(textDefinition).includes("type") &&
      Object.keys(textDefinition).includes("text") &&
      ["simple", "plural"].includes(textDefinition?.type ?? "") &&
      Array.isArray(textDefinition?.text)
    ) {
      const type = textDefinition?.type;
      const text = textDefinition?.text ?? [];

      if (["simple"].includes(type) && text.length !== 1) {
        throw new TextDefinitionError(
          "Simple text definitions must have exactly one text entry"
        );
      }

      if (["plural"].includes(type) && text.length !== 2) {
        throw new TextDefinitionError(
          "Plural text definitions must have exactly two text entries"
        );
      }

      return textDefinition;
    }
  } catch (error: unknown) {
    // Instead we are logging an error to the console.
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new TextDefinitionError(
      `Could not parse rawText text format: ${rawText}. Message: ${message}`
    );
  }

  // If we got this far the text definition is invalid.
  return {
    type: "simple",
    text: ["Unknown text entry"]
  };
};

const processTexts = (texts: string[], placeholders: Placeholders) =>
  texts.map((text: string) =>
    text.replace(/@\w+/g, (match) => {
      // If the placeholder value is zero we need to handle it specifically.
      if (placeholders[match] === 0) {
        return "0";
      }
      // Otherwise we check if we have a value for the placeholder.
      // We return the value of the placeholder if found.
      // Otherwise we return the placeholder itself
      // to show that the placeholder value cannot be found.
      return String(placeholders[match] || match);
    })
  );

interface MissingPhrases {
  [index: string]: boolean
};

let _missingPhrases : MissingPhrases = {};
export const useText = (): UseTextFunction => {
  const { data } = useSelector<{ data: Record<string, string> }>(
    (state: RootState) => state.text
  );

  return (key: string, { placeholders, count, default: _defaultValue } = { count: 0 }) => {
    if (!data) {
      throw new Error(`The translation store is broken.`);
    }
    if (data[key] === undefined) {
      if (_missingPhrases[key] == null) {
        console.warn(`The translation for ${key} is not defined.`);

        _missingPhrases[key] = true;
      }

      return _defaultValue || key;
    }
    const textDefinition = constructTextDefinitionFromRawTextTextEntry(
      data[key]
    );

    const textPlaceholders = { ...(placeholders ?? {}) };
    // If we are in plural mode we make sure
    // that we do not also need to specify a count placeholder.
    if (textDefinition.type === "plural") {
      textPlaceholders["@count"] = String(count);
    }

    const processedTexts = textPlaceholders
      ? processTexts(textDefinition.text, textPlaceholders)
      : textDefinition.text;

    switch (textDefinition.type) {
      case "plural":
        // If count is 0 we need the second text because it is the plural form.
        if (count === 0) {
          return processedTexts[1];
        }
        // If count is 1 we select the first text entry
        // otherwise we select the second text entry.
        return processedTexts[1 % (count ?? 1)];
      case "simple":
      default:
        return processedTexts[0];
    }
  };
};

export const withText = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return withSuffix(Component, "Text", addTextEntries);
};
