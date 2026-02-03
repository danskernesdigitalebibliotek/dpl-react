import addMount from "../../core/addMount";
import SearchResultV2 from "../search-result/SearchResult.entry";

// Using V2 component with sidebar facets
addMount({ appName: "search-result", app: SearchResultV2 });
