import { serviceUrlKeys } from "../utils/reduxMiddleware/extractServiceBaseUrls";

export const argTypes = {
  [serviceUrlKeys.fbs]: {
    description: "Base url for the FBS API",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://fbs-openplatform.dbc.dk"
      }
    }
  },
  [serviceUrlKeys.publizon]: {
    description: "Base url for the Publizon API",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://pubhub-openplatform.dbc.dk"
      }
    }
  },
  [serviceUrlKeys.dplCms]: {
    description: "Base url for the DPL CMS API",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://dpl-cms.docker"
      }
    }
  },
  [serviceUrlKeys.cover]: {
    description: "Base url for the cover service",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://cover.dandigbib.org"
      }
    }
  },
  [serviceUrlKeys.materialList]: {
    description: "Base url for the material list service",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://prod.materiallist.dandigbib.org"
      }
    }
  },
  [serviceUrlKeys.fbi]: {
    description: "Base url for the FBI API",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://temp.fbi-api.dbc.dk/next-present/graphql"
      }
    }
  },
  [serviceUrlKeys.fbiLocal]: {
    description: "Base url for the FBI API (local inventory)",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://temp.fbi-api.dbc.dk/next/graphql"
      }
    }
  },
  [serviceUrlKeys.fbiGlobal]: {
    description: "Base url for the FBI API (global inventory)",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://temp.fbi-api.dbc.dk/next-present/graphql"
      }
    }
  },
  userinfoUrl: {
    description: "Adgangsplatfomen userinfo url",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "https://login.bib.dk/userinfo"
      }
    }
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
  [serviceUrlKeys.fbi]: "https://temp.fbi-api.dbc.dk/next-present/graphql",
  [serviceUrlKeys.fbiLocal]: "https://temp.fbi-api.dbc.dk/next/graphql",
  [serviceUrlKeys.fbiGlobal]:
    "https://temp.fbi-api.dbc.dk/next-present/graphql",
  userinfoUrl: "https://login.bib.dk/userinfo"
};
