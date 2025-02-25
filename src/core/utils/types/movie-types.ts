import { ManifestationMaterialType } from "./material-type";

const movieTypes = [
  ManifestationMaterialType.movieBluRay,
  ManifestationMaterialType.movie,
  ManifestationMaterialType.movieDvd
] as const;

export default movieTypes;
