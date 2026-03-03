import proj4 from "proj4";

proj4.defs(
  "EPSG:25832",
  "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
);

/**
 * Convert WGS84 (lat/lng in degrees) to EPSG:25832 (ETRS89 / UTM zone 32N).
 * GSearch spatial filters require coordinates in EPSG:25832.
 */
export const wgs84ToUtm32n = (
  latDeg: number,
  lngDeg: number
): { x: number; y: number } => {
  // proj4 uses [lng, lat] order for geographic coordinates
  const [x, y] = proj4("EPSG:4326", "EPSG:25832", [lngDeg, latDeg]);
  return { x, y };
};

/**
 * Convert EPSG:25832 (ETRS89 / UTM zone 32N) to WGS84 (lat/lng in degrees).
 * Inverse of wgs84ToUtm32n.
 */
export const utm32nToWgs84 = (
  easting: number,
  northing: number
): { lat: number; lng: number } => {
  const [lng, lat] = proj4("EPSG:25832", "EPSG:4326", [easting, northing]);
  return { lat, lng };
};
