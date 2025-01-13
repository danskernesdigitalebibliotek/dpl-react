import { replaceInFile } from "replace-in-file";

const args: string[] = process.argv.slice(2);
const pathToGeneratedFile = args[0] ?? null;

if (!pathToGeneratedFile) {
  throw new Error("Missing path to generated file!");
}

// Remove deprecated enum values because eslint is complaining over duplicate keys:
replaceInFile({
  files: pathToGeneratedFile,
  from: /export enum SortOrder \{([\s\S]*?)\/\*\* @deprecated No longer supported \*\/[^}]+}/g,
  to: "export enum SortOrder {$1}"
})
  .then((results: unknown) => {
    // eslint-disable-next-line no-console
    console.log("Replacement results:", results);
  })
  .catch((error: unknown) => {
    console.error("Error occurred:", error);
  })
  .finally(() => {
    // Graphql code generator leaves some names with underscore and a number.
    // This removes the underscores:
    replaceInFile({
      files: pathToGeneratedFile,
      from: /_([0-9]+)/g,
      to: "$1"
    })
      .then((results: unknown) => {
        // eslint-disable-next-line no-console
        console.log("Replacement results:", results);
      })
      .catch((error: unknown) => {
        console.error("Error occurred:", error);
      });
  });

export {};
