export type DawaAddress = {
  vejnavn: string;
  betegnelse: string;
  x: number;
  y: number;
  id: string;
  postnr: string;
  postnrnavn: string;
  lat?: number;
  lng?: number;
};

const DAWA_BASE_URL = "https://api.dataforsyningen.dk";

export const getReverseGeocode = async (
  lat: number,
  lng: number,
  errorMessages?: {
    fetchError?: string;
  }
): Promise<DawaAddress | null> => {
  const messages = {
    fetchError: errorMessages?.fetchError ?? "Could not fetch address"
  };

  try {
    const response = await fetch(
      `${DAWA_BASE_URL}/adgangsadresser/reverse?x=${lng}&y=${lat}&struktur=mini`
    );

    if (!response.ok) {
      throw new Error(messages.fetchError);
    }

    const data = await response.json();

    if (data) {
      return {
        ...data,
        lat,
        lng
      };
    }

    return null;
  } catch {
    throw new Error(messages.fetchError);
  }
};

export async function getAddressesFromLocationQuery(query: string) {
  try {
    const response = await fetch(
      `${DAWA_BASE_URL}/adresser?q=${query}&struktur=mini&fuzzy&per_side=10`
    );
    const addresses = await response.json();
    // Add lat/lng from x/y coordinates (DAWA returns both WGS84 and ETRS89)
    return addresses.map((address: DawaAddress) => ({
      ...address,
      lat: address.y, // In mini structure, y is latitude
      lng: address.x // In mini structure, x is longitude
    }));
  } catch {
    return [];
  }
}
