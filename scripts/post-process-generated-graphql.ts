const replace = require("replace-in-file");

replace({
  files: "src/generated/graphql.tsx",
  from: /_([0-9]+)/g,
  to: "$1"
})
  .then((results: unknown) => {
    console.log("Replacement results:", results);
  })
  .catch((error: unknown) => {
    console.error("Error occurred:", error);
  });

export {};
