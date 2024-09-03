import { serviceUrlKeys } from "../utils/reduxMiddleware/extractServiceBaseUrls";

export const argTypes = {
  [serviceUrlKeys.fbs]: {
    name: "Base url for the FBS API",
    control: { type: "text" }
  },
  [serviceUrlKeys.publizon]: {
    name: "Base url for the Publizon API",
    control: { type: "text" }
  },
  [serviceUrlKeys.dplCms]: {
    name: "Base url for the DPL CMS API",
    control: { type: "text" }
  },
  [serviceUrlKeys.cover]: {
    name: "Base url for the cover service",
    control: { type: "text" }
  },
  [serviceUrlKeys.materialList]: {
    name: "Base url for the material list service",
    control: { type: "text" }
  },
  [serviceUrlKeys.fbi]: {
    name: "Base url for the FBI API",
    control: { type: "text" }
  },
  [serviceUrlKeys.fbiLocal]: {
    name: "Base url for the FBI API (local inventory)",
    control: { type: "text" }
  },
  [serviceUrlKeys.fbiGlobal]: {
    name: "Base url for the FBI API (global inventory)",
    control: { type: "text" }
  }
};

export default {
  [serviceUrlKeys.fbs]:
    process.env.FBS_BASEURL ?? "https://fbs-openplatform.dbc.dk",
  [serviceUrlKeys.publizon]:
    process.env.PUBLIZON_BASEURL ?? "https://pubhub-openplatform.dbc.dk",
  [serviceUrlKeys.dplCms]: process.env.CMS_BASEURL ?? "https://dpl-cms.docker",
  [serviceUrlKeys.cover]: "https://cover.dandigbib.org",
  [serviceUrlKeys.materialList]: "https://prod.materiallist.dandigbib.org",
  [serviceUrlKeys.fbi]: "https://fbi-api.dbc.dk/next-present/graphql",
  [serviceUrlKeys.fbiLocal]: "https://fbi-api.dbc.dk/next/graphql",
  [serviceUrlKeys.fbiGlobal]: "https://fbi-api.dbc.dk/next-present/graphql"
};
