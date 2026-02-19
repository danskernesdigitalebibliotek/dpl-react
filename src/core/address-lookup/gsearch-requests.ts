import {
  wgs84ToUtm32n,
  utm32nToWgs84
} from "../utils/helpers/coordinate-projection";
import { calculateDistance } from "../utils/helpers/distance";

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

const findClosestAddress = (
  lat: number,
  lng: number,
  addresses: AddressWithCoordinates[]
): AddressWithCoordinates => {
  return addresses.reduce((closest, address) => {
    const distClosest = calculateDistance(lat, lng, closest.lat, closest.lng);
    const distAddress = calculateDistance(lat, lng, address.lat, address.lng);
    return distAddress < distClosest ? address : closest;
  });
};

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
      // Convert API results to internal format, discarding any with missing coordinates.
      // The API returns EPSG:25832 coordinates (no srid param), so convert to WGS84.
      const addresses = data
        .map((result: GSearchAddress) => convertGSearchToAddress(result))
        .filter((a): a is AddressWithCoordinates => a !== null)
        .map((a) => {
          const wgs84 = utm32nToWgs84(a.lng, a.lat);
          return { ...a, lat: wgs84.lat, lng: wgs84.lng };
        });

      if (addresses.length === 0) return null;

      return findClosestAddress(lat, lng, addresses);
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
