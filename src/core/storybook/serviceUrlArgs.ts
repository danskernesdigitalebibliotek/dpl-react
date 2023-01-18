import { serviceUrlKeys } from "../utils/reduxMiddleware/extractServiceBaseUrls";

export default {
  [serviceUrlKeys.fbs]: {
    name: "Base url for the FBS API",
    defaultValue: "http://fbs-mock.docker",
    control: { type: "text" }
  },
  [serviceUrlKeys.publizon]: {
    name: "Base url for the Publizon API",
    defaultValue: "http://publizon-mock.docker",
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
    defaultValue: "https://fbi-api.dbc.dk/opac/graphql",
    control: { type: "text" }
  }
};
