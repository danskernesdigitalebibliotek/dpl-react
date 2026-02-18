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
 * Reverse geocode: convert coordinates to address
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

  try {
    const response = await fetch(
      `${GSEARCH_BASE_URL}/adgangsadresse_reverse?x=${lng}&y=${lat}&srid=4326&token=${token}`
    );

    if (!response.ok) {
      throw new Error(fetchError);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const result = convertGSearchToAddress(data[0]);
      return result;
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
