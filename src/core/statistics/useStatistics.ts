/* eslint-disable no-underscore-dangle */
import { useConfig } from "../utils/config";
import { injectMappScript, removeMappScript } from "./tiLoader.min";
// Useful resources for Mapp tracking:
// https://documentation.mapp.com/1.0/en/manual-track-request-25105181.html
// https://documentation.mapp.com/1.0/en/how-to-send-manual-tracking-requests-page-updates-7240681.html

declare global {
  interface Window {
    _ti: Record<string, unknown>;
  }
}

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

export const useCollectPageStatistics = () => {
  const collectPageStatistics = ({ parameterName, trackedData }: EventData) => {
    window._ti = window._ti || {};
    window._ti[parameterName as string] = trackedData;
  };

  const resetAndCollectPageStatistics = ({
    parameterName,
    trackedData
  }: EventData) => {
    window._ti = {};
    collectPageStatistics({ parameterName, trackedData });
  };

  return {
    collectPageStatistics,
    resetAndCollectPageStatistics
  };
};

export function usePageStatistics() {
  const config = useConfig();
  const domain = config("mappDomainConfig");
  const id = config("mappIdConfig");

  const sendPageStatistics = ({ waitTime }: { waitTime: number }) => {
    setTimeout(() => {
      if (!domain || !id) {
        // eslint-disable-next-line no-console
        console.warn("⚠️ Mapp Domain or ID is not defined");
        // This is to simulate the tracking request like the code in above for
        // click events. Because domain and id are set as empty strings in Storybook
        // The tracking script are not enabled. And therefore we console log the data
        // eslint-disable-next-line no-console
        console.log("Tracking: send, page", JSON.stringify(window._ti));
        return;
      }

      const hasCollectedData = window._ti
        ? Object.values(window._ti).every(
            (val) => typeof val === "string" && val.trim() !== ""
          )
        : false;

      if (!document.getElementById("tiLoader") && hasCollectedData) {
        injectMappScript({ domain, id });
      }
    }, waitTime);
  };

  const updatePageStatistics = ({ waitTime }: { waitTime: number }) => {
    removeMappScript();
    sendPageStatistics({ waitTime });
  };

  return {
    sendPageStatistics,
    updatePageStatistics
  };
}

export const useTrackStatistics = () => {
  // If the global wts object doesn't exist, it means we are in dev environment.
  // Here instead of actually tracking we just log the data to the console.
  if (!window.wts) {
    window.wts = {
      push([action, type, data]: [EventAction, EventType, EventData]) {
        // eslint-disable-next-line no-console
        console.log(`Tracking: ${action}, ${type}, ${JSON.stringify(data)}`);
      }
    };
  }

  const track = (eventType: EventType, trackParameters: TrackParameters) => {
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
  };

  return {
    track
  };
};

export default {};
