// Useful resources for Mapp tracking:
// https://documentation.mapp.com/1.0/en/manual-track-request-25105181.html
// https://documentation.mapp.com/1.0/en/how-to-send-manual-tracking-requests-page-updates-7240681.html

export interface EventData {
  [key: string]: string | number | Record<string, unknown>;
}
export interface EventDataWithCustomClickParameter extends EventData {
  customClickParameter: Record<number, string>;
}

// There are four kinds of event types:
// 1. page - when a page request is simulated
// 2. click - for measuring actions that don't cause page load;
// 3. link - clicking a link that triggers a new page load
// 4. pageupdate - information on the page changes without a new page load
// We currently only support click and link, as we don't track any page or pageupdate data.
export type EventType = "click" | "link";

export type TrackParameters = {
  // id here is the WTK id for an event - specified to us by the project owners (DDF)
  // each specific event they want to track has a corresponding id.
  id: number;
  // The name of the tracked event is also provided to us by DDF - it helps them
  // distinguish the tracked data.
  name: string;
  // trackedData encapsulates desired content to be tracked.
  trackedData: string;
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

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
        }, 500);
      });
    }
  };
}

export default {};
