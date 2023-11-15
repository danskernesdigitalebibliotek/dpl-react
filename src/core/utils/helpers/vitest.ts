export const isVitestEnvironment =
  typeof process !== "undefined" && process.env && process.env.VITEST;

export default {};
