export const getCurrentPosition = (errorMessages?: {
  notSupported?: string;
  permissionDenied?: string;
  positionUnavailable?: string;
  timeout?: string;
  default?: string;
}): Promise<{
  latitude: number;
  longitude: number;
}> => {
  const messages = {
    notSupported:
      errorMessages?.notSupported ??
      "Geolocation is not supported by your browser.",
    permissionDenied:
      errorMessages?.permissionDenied ??
      "You have denied access to your location. Please allow location access in your browser.",
    positionUnavailable:
      errorMessages?.positionUnavailable ??
      "Your location is not available at the moment.",
    timeout:
      errorMessages?.timeout ??
      "The request for your location timed out. Please try again.",
    default:
      errorMessages?.default ??
      "An error occurred while fetching your location."
  };

  const getPosition = (
    enableHighAccuracy: boolean
  ): Promise<{ latitude: number; longitude: number }> =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        reject,
        { enableHighAccuracy, timeout: 10000, maximumAge: 0 }
      );
    });

  if (!navigator.geolocation) {
    return Promise.reject(new Error(messages.notSupported));
  }

  // Try high accuracy (GPS) first, fall back to low accuracy (Wi-Fi/IP)
  // for desktops that lack GPS hardware.
  return getPosition(true)
    .catch((error) => {
      if (
        error instanceof GeolocationPositionError &&
        error.code === error.POSITION_UNAVAILABLE
      ) {
        return getPosition(false);
      }
      throw error;
    })
    .catch((error) => {
      let errorMessage = messages.default;

      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = messages.permissionDenied;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = messages.positionUnavailable;
            break;
          case error.TIMEOUT:
            errorMessage = messages.timeout;
            break;
        }
      }

      throw new Error(errorMessage);
    });
};
