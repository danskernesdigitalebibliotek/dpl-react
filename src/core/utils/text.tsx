import { RootState, useSelector } from "../store";
import { addTextEntries } from "../text.slice";
import withSuffix from "./withSuffix";

type Placeholders = Record<string, string>;
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
  }
) => string;

const isAJsonObjectString = (str: string) => str.match(/^\{.*\}$/);

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

  const textDefinitionError = "Error in text definition";

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
        // We deliberately want to write an error to the console:
        // eslint-disable-next-line no-console
        console.error(
          "Simple text definitions must have exactly one text entry"
        );
        textDefinition.text = [textDefinitionError];
      }

      if (["plural"].includes(type) && text.length !== 2) {
        // We deliberately want to write an error to the console:
        // eslint-disable-next-line no-console
        console.error(
          "Plural text definitions must have exactly two text entries"
        );
        textDefinition.text = [textDefinitionError, textDefinitionError];
      }

      return textDefinition;
    }
    // If we were able to parse the rawText string,
    // but it did not match the expected format,
    // we make sure to log an error.
    // eslint-disable-next-line no-console
    console.error(`Unknown text definition format: ${rawText}`);

    // We do not want to break the app if we are unable to parse the rawText string.
  } catch (error: unknown) {
    // Instead we are logging an error to the console.
    const message = error instanceof Error ? error.message : "Unknown error";
    // eslint-disable-next-line no-console
    console.error(
      `Could not parse rawText text format: ${rawText}. Message: ${message}`
    );
  }

  return {
    type: "simple",
    text: [textDefinitionError]
  };
};

const processTexts = (texts: string[], placeholders: Placeholders) =>
  texts.map((text: string) =>
    text.replace(/@\w+/g, (match) => {
      return placeholders[match] || match;
    })
  );

export const useText = (): UseTextFunction => {
  const { data } = useSelector((state: RootState) => state.text);

  return (key: string, { placeholders, count } = {}) => {
    const textDefinition = constructTextDefinitionFromRawTextTextEntry(
      data?.[key] ?? key
    );
    const processedTexts = placeholders
      ? processTexts(textDefinition.text, placeholders)
      : textDefinition.text;

    switch (textDefinition.type) {
      case "plural":
        // If count is 1 we select the first text entry
        // otherwise we select the second text entry.
        return processedTexts[1 % (count ?? 1)];
      case "simple":
      default:
        return processedTexts[0];
    }
  };
};

export const withText = <T,>(Component: React.ComponentType<T>) => {
  return withSuffix(Component, "Text", addTextEntries);
};
