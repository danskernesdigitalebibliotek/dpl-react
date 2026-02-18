export const argTypes = {
  geoLocationErrorNotSupportedText: {
    description: "Geolocation not supported error",
    control: { type: "text" }
  },
  geoLocationErrorPermissionDeniedText: {
    description: "Geolocation permission denied error",
    control: { type: "text" }
  },
  geoLocationErrorPositionUnavailableText: {
    description: "Geolocation position unavailable error",
    control: { type: "text" }
  },
  geoLocationErrorTimeoutText: {
    description: "Geolocation timeout error",
    control: { type: "text" }
  },
  geoLocationErrorDefaultText: {
    description: "Geolocation default error",
    control: { type: "text" }
  },
  reverseGeocodeErrorDefaultText: {
    description: "Reverse geocode default error",
    control: { type: "text" }
  }
};

export default {
  geoLocationErrorNotSupportedText:
    "Geolocation is not supported by your browser.",
  geoLocationErrorPermissionDeniedText:
    "You have denied access to your location.",
  geoLocationErrorPositionUnavailableText:
    "Your location is not available at the moment.",
  geoLocationErrorTimeoutText:
    "The request for your location timed out. Please try again.",
  geoLocationErrorDefaultText:
    "An error occurred while fetching your location.",
  reverseGeocodeErrorDefaultText: "Could not find address for your location."
};

export interface GeoLocationArgs {
  geoLocationErrorNotSupportedText: string;
  geoLocationErrorPermissionDeniedText: string;
  geoLocationErrorPositionUnavailableText: string;
  geoLocationErrorTimeoutText: string;
  geoLocationErrorDefaultText: string;
  reverseGeocodeErrorDefaultText: string;
}
