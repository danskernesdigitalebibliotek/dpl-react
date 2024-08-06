import { ManifestationMaterialType } from "./material-type";

const articleTypes = [
  ManifestationMaterialType.article,
  ManifestationMaterialType.paperArticle,
  ManifestationMaterialType.onlineArticle,
  ManifestationMaterialType.earticle
] as const;

export default articleTypes;
