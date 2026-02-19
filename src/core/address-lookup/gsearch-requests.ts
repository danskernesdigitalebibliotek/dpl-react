export type GSearchAddress = {
  id: string;
  vejnavn: string;
  husnummer: string;
  postnummer: string;
  postnummernavn: string;
  visningstekst: string;
  geometri: {
    type: string;
    coordinates: number[][];
  };
};

export type AddressWithCoordinates = {
  id: string;
  betegnelse: string;
  lat: number;
  lng: number;
};

const GSEARCH_BASE_URL = "https://api.dataforsyningen.dk/rest/gsearch/v2.0";

/**
 * Convert GSearch address result to our internal format
 */
const convertGSearchToAddress = (
  result: GSearchAddress
): AddressWithCoordinates | null => {
  const coords = result.geometri?.coordinates?.[0];

  if (!coords || coords.length < 2) {
    return null;
  }

  const [lng, lat] = coords;

  return {
    id: result.id,
    betegnelse: result.visningstekst,
    lat,
    lng
  };
};

/**
 * Convert WGS84 (lat/lng in degrees) to EPSG:25832 (ETRS89 / UTM zone 32N).
 * GSearch spatial filters require coordinates in EPSG:25832.
 */
const wgs84ToUtm32n = (
  latDeg: number,
  lngDeg: number
): { x: number; y: number } => {
  const a = 6378137.0;
  const f = 1 / 298.257223563;
  const b = a * (1 - f);
  const e2 = (a ** 2 - b ** 2) / a ** 2;
  const ePrime2 = (a ** 2 - b ** 2) / b ** 2;
  const k0 = 0.9996;
  const lng0 = 9.0; // central meridian for zone 32
  const falseEasting = 500000;

  const lat = (latDeg * Math.PI) / 180;
  const lng = (lngDeg * Math.PI) / 180;
  const lng0Rad = (lng0 * Math.PI) / 180;

  const sinLat = Math.sin(lat);
  const cosLat = Math.cos(lat);
  const tanLat = Math.tan(lat);

  const N = a / Math.sqrt(1 - e2 * sinLat ** 2);
  const T = tanLat ** 2;
  const C = ePrime2 * cosLat ** 2;
  const A = (lng - lng0Rad) * cosLat;

  const e4 = e2 ** 2;
  const e6 = e2 ** 3;
  const M =
    a *
    ((1 - e2 / 4 - (3 * e4) / 64 - (5 * e6) / 256) * lat -
      ((3 * e2) / 8 + (3 * e4) / 32 + (45 * e6) / 1024) * Math.sin(2 * lat) +
      ((15 * e4) / 256 + (45 * e6) / 1024) * Math.sin(4 * lat) -
      ((35 * e6) / 3072) * Math.sin(6 * lat));

  const x =
    falseEasting +
    k0 *
      N *
      (A +
        ((1 - T + C) * A ** 3) / 6 +
        ((5 - 18 * T + T ** 2 + 72 * C - 58 * ePrime2) * A ** 5) / 120);

  const y =
    k0 *
    (M +
      N *
        tanLat *
        (A ** 2 / 2 +
          ((5 - T + 9 * C + 4 * C ** 2) * A ** 4) / 24 +
          ((61 - 58 * T + T ** 2 + 600 * C - 330 * ePrime2) * A ** 6) / 720));

  return { x, y };
};

/**
 * Reverse geocode: convert coordinates to the nearest address.
 * Uses GSearch with a BBOX spatial filter around the given coordinates.
 */
export const getReverseGeocode = async ({
  lat,
  lng,
  errorMessages,
  token = ""
}: {
  lat: number;
  lng: number;
  errorMessages?: { fetchError?: string };
  token?: string;
}): Promise<AddressWithCoordinates | null> => {
  const fetchError = errorMessages?.fetchError ?? "Could not fetch address";
  const bboxRadius = 25; // meters

  try {
    const { x, y } = wgs84ToUtm32n(lat, lng);
    const bbox = `${x - bboxRadius},${y - bboxRadius},${x + bboxRadius},${y + bboxRadius}`;
    const filter = `BBOX(geometri,${bbox},'epsg:25832')`;

    const url = `${GSEARCH_BASE_URL}/adresse?q=1&filter=${encodeURIComponent(filter)}&limit=10&token=${token}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(fetchError);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      return convertGSearchToAddress(data[0]);
    }

    return null;
  } catch {
    throw new Error(fetchError);
  }
};

/**
 * Search for addresses using a query string
 */
export async function getAddressesFromLocationQuery({
  query,
  token = ""
}: {
  query: string;
  token?: string;
}): Promise<AddressWithCoordinates[]> {
  try {
    const url = `${GSEARCH_BASE_URL}/adresse?q=${encodeURIComponent(query)}&limit=10&srid=4326&token=${token}`;
    const response = await fetch(url);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data
        .map((result: GSearchAddress) => convertGSearchToAddress(result))
        .filter(
          (address: AddressWithCoordinates | null) => address !== null
        ) as AddressWithCoordinates[];
    }

    return [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching addresses:", error);
    return [];
  }
}
