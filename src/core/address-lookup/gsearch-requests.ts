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
  vejnavn: string;
  betegnelse: string;
  x: number;
  y: number;
  id: string;
  postnr: string;
  postnrnavn: string;
  lat: number;
  lng: number;
};

const GSEARCH_BASE_URL = "https://api.dataforsyningen.dk/rest/gsearch/v2.0";

/**
 * Get DATAFORSYNINGEN token from environment variables
 */
const getToken = (): string => {
  const token = process.env.STORYBOOK_DATAFORSYNINGEN;
  if (!token) {
    // eslint-disable-next-line no-console
    console.error(
      "DATAFORSYNINGEN token is not set. Please add STORYBOOK_DATAFORSYNINGEN to your .env file."
    );
  }
  return token || "";
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
    vejnavn: result.vejnavn,
    betegnelse: result.visningstekst,
    x: lng,
    y: lat,
    lat,
    lng,
    id: result.id,
    postnr: result.postnummer,
    postnrnavn: result.postnummernavn
  };
};

/**
 * Reverse geocode: convert coordinates to address
 */
export const getReverseGeocode = async (
  lat: number,
  lng: number,
  errorMessages?: {
    fetchError?: string;
  }
): Promise<AddressWithCoordinates | null> => {
  const messages = {
    fetchError: errorMessages?.fetchError ?? "Could not fetch address"
  };

  const token = getToken();
  if (!token) {
    throw new Error(messages.fetchError);
  }

  try {
    const response = await fetch(
      `${GSEARCH_BASE_URL}/adgangsadresse_reverse?x=${lng}&y=${lat}&srid=4326&token=${token}`
    );

    if (!response.ok) {
      throw new Error(messages.fetchError);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const result = convertGSearchToAddress(data[0]);
      return result;
    }

    return null;
  } catch {
    throw new Error(messages.fetchError);
  }
};

/**
 * Search for addresses using a query string
 */
export async function getAddressesFromLocationQuery(
  query: string
): Promise<AddressWithCoordinates[]> {
  const token = getToken();
  if (!token) {
    return [];
  }

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
