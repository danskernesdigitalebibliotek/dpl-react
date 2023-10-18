import { serviceUrlKeys } from "../utils/reduxMiddleware/extractServiceBaseUrls";

export default {
  [serviceUrlKeys.fbs]: {
    name: "Base url for the FBS API",
    defaultValue: process.env.FBS_BASEURL ?? "https://fbs-openplatform.dbc.dk",
    control: { type: "text" }
  },
  [serviceUrlKeys.publizon]: {
    name: "Base url for the Publizon API",
    defaultValue:
      process.env.PUBLIZON_BASEURL ?? "https://pubhub-openplatform.dbc.dk",
    control: { type: "text" }
  },
  [serviceUrlKeys.dplCms]: {
    name: "Base url for the DPL CMS API",
    defaultValue: "https://dpl-cms.docker",
    control: { type: "text" }
  },
  [serviceUrlKeys.cover]: {
    name: "Base url for the cover service",
    defaultValue: "https://cover.dandigbib.org",
    control: { type: "text" }
  },
  [serviceUrlKeys.materialList]: {
    name: "Base url for the material list service",
    defaultValue: "https://prod.materiallist.dandigbib.org",
    control: { type: "text" }
  },
  [serviceUrlKeys.fbi]: {
    name: "Base url for the FBI API",
    defaultValue: "https://fbi-api.dbc.dk/next/graphql",
    control: { type: "text" }
  }
};
