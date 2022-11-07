import { RootState, useSelector } from "../store";
import { addTextEntries } from "../text.slice";
import withSuffix from "./withSuffix";

type TextDefinitionTypes = "simple" | "plural";
type TextDefinition = {
  type: TextDefinitionTypes;
  text: string[];
};
const constructTextDefinitionFromEntry = (incoming: string): TextDefinition => {
  const textDefinitionError = "Error in text definition";
  try {
    const textDefinition = JSON.parse(incoming);

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
    // If we were able to parse the incoming string,
    // but it did not match the expected format,
    // we make sure to log an error.
    // eslint-disable-next-line no-console
    console.error(`Unknown text definition format: ${incoming}`);

    // We do not want to break the app if we are unable to parse the incoming string.
  } catch (error: unknown) {
    // Instead we are logging an error to the console.
    const message = error instanceof Error ? error.message : "Unknown error";
    // eslint-disable-next-line no-console
    console.error(
      `Could not parse incoming text format: ${incoming}. Message: ${message}`
    );
  }

  return {
    type: "simple",
    text: [textDefinitionError]
  };
};

export type UseTextFunction = (key: string) => string;
export const useText = (): UseTextFunction => {
  const { data } = useSelector((state: RootState) => state.text);
  return (key: string) => data?.[key] ?? key;
};

type Placeholders = Record<string, string>;

const processTexts = (texts: string[], placeholders: Placeholders) =>
  texts.map((text: string) =>
    text.replace(/@\w+/g, (match) => {
      return placeholders[match] || match;
    })
  );

export const useTextV2 = () => {
  const { data } = useSelector((state: RootState) => state.text);

  return (
    key: string,
    {
      placeholders,
      count
    }: {
      placeholders?: Placeholders;
      count?: number;
    } = {}
  ) => {
    const textDefinition = constructTextDefinitionFromEntry(data?.[key] ?? key);
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
