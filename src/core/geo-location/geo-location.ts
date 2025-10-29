export const getCurrentPosition = (errorMessages: {
  notSupported: string;
  permissionDenied: string;
  positionUnavailable: string;
  timeout: string;
  default: string;
}): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error(errorMessages.notSupported));
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
        let errorMessage = errorMessages.default;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = errorMessages.permissionDenied;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = errorMessages.positionUnavailable;
            break;
          case error.TIMEOUT:
            errorMessage = errorMessages.timeout;
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
