/**
 * Calculate the distance between two coordinates using the Haversine formula.
 *
 * @returns Distance in kilometers.
 */
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Format a distance in km using Danish number format (comma as decimal separator).
 */
export const formatDistance = (distance: number): string =>
  `${distance.toFixed(1).replace(".", ",")} km`;

/**
 * Parse optional string lat/lng into numeric coordinates.
 * Returns null if either value is missing or invalid.
 */
export const parseCoordinates = (
  lat?: string | null,
  lng?: string | null
): { lat: number; lng: number } | null => {
  if (!lat || !lng) return null;
  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);
  if (Number.isNaN(parsedLat) || Number.isNaN(parsedLng)) return null;
  return { lat: parsedLat, lng: parsedLng };
};

/**
 * Sort comparator for items with a nullable distance.
 * Items without a distance are pushed to the end.
 */
export const compareByDistance = (
  a: { distance: number | null },
  b: { distance: number | null }
): number => {
  if (a.distance === null) return 1;
  if (b.distance === null) return -1;
  return a.distance - b.distance;
};
