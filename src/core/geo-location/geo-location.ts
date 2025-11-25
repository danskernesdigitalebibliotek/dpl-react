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

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error(messages.notSupported));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        resolve(coords);
      },
      (error) => {
        let errorMessage = messages.default;

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

        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};
