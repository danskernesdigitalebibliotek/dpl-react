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
  lng: number
): Promise<DawaAddress | null> => {
  try {
    const response = await fetch(
      `${DAWA_BASE_URL}/adgangsadresser/reverse?x=${lng}&y=${lat}&struktur=mini`
    );

    if (!response.ok) {
      // TODO: translate
      throw new Error("Kunne ikke hente adresse");
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
  } catch (error) {
    // TODO: translate
    throw new Error("Kunne ikke konvertere lokation til adresse.");
  }
};

export function getAddressesFromLocationQuery(query: string) {
  return fetch(
    `${DAWA_BASE_URL}/adresser?q=${query}&struktur=mini&fuzzy&per_side=10`
  )
    .then((response) => response.json())
    .then((addresses) => {
      // Add lat/lng from x/y coordinates (DAWA returns both WGS84 and ETRS89)
      return addresses.map((addr: any) => ({
        ...addr,
        lat: addr.y, // In mini structure, y is latitude
        lng: addr.x // In mini structure, x is longitude
      }));
    })
    .catch((error) => {
      return [];
    });
}
