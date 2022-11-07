export function useStatistics() {
  // If the global wts object doesn't exist, it means we are in dev environment.
  // Here instead of actually tracking we just log the data to the console.
  if (!window.wts) {
    window.wts = {
      push(trackingProps: [string, string, { [key: string]: string }]) {
        // eslint-disable-next-line no-console
        console.log(
          `Tracking: ${trackingProps[0]}, ${trackingProps[1]}, ${JSON.stringify(
            trackingProps[2]
          )}`
        );
      }
    };
  }

  return {
    track: (trackedData: { [key: string]: string }) => {
      window.wts.push(["send", "page", trackedData]);
    }
  };
}

export default {};
