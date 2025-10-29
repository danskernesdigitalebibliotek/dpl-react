export const getCurrentPosition = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      // TODO: translate
      reject(new Error("Geolocation er ikke understøttet af din browser."));
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
        let errorMessage = "Der opstod en fejl ved hentning af din lokation.";

        switch (error.code) {
          // TODO: translate
          case error.PERMISSION_DENIED:
            errorMessage =
              "Du har afvist adgang til din lokation. Tillad lokationsadgang i din browser.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Din lokation er ikke tilgængelig i øjeblikket.";
            break;
          case error.TIMEOUT:
            errorMessage =
              "Anmodningen om din lokation fik timeout. Prøv igen.";
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
