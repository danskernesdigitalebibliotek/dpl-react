// Useful resources for Mapp tracking:
// https://documentation.mapp.com/1.0/en/manual-track-request-25105181.html
// https://documentation.mapp.com/1.0/en/how-to-send-manual-tracking-requests-page-updates-7240681.html

export type CustomClickParameter = Record<
  number,
  number | Record<number, string> | Record<string, string>
>;

export interface EventData {
  [key: string]: string | number | Record<string, unknown>;
}
export interface EventDataWithCustomClickParameter extends EventData {
  customClickParameter: CustomClickParameter;
}

// 1. page - when a page request is simulated
// 2. click - for measuring actions that don't cause page load;
// 3. link - clicking a link that triggers a new page load
// 4. pageupdate - information on the page changes without a new page load
export type EventType = "page" | "click" | "link" | "pageupdate";

export type TrackParameters = {
  id: number;
  name: string;
  trackedData: string | number | string[];
};

export type EventAction = "send";

export function useStatistics() {
  // If the global wts object doesn't exist, it means we are in dev environment.
  // Here instead of actually tracking we just log the data to the console.
  if (!window.wts) {
    window.wts = {
      push(trackingProps: [EventAction, EventType, EventData]) {
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
    track: (eventType: EventType, trackParameters: TrackParameters) => {
      const eventData: EventDataWithCustomClickParameter = {
        linkId: trackParameters.name,
        customClickParameter: {}
      };
      eventData.customClickParameter[trackParameters.id] =
        trackParameters.trackedData;
      window.wts.push(["send", eventType, eventData]);
    }
  };
}

export default {};
