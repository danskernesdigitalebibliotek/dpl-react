export type FaustId = `${number}`;
export type Pid = `${number}-${string}:${FaustId}`;
export type WorkId = `work-of:${number}-${string}:${FaustId}`;
export type App = "material" | "search-header" | "search-result";
