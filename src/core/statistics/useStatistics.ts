import { useConfig } from "../utils/config";
import { isUrlValid, redirectTo } from "../utils/helpers/url";
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
    // eslint-disable-next-line no-underscore-dangle
    window._ti = window._ti || {};
    // eslint-disable-next-line no-underscore-dangle
    window._ti[parameterName as string] = trackedData;
  };

  const resetAndCollectPageStatistics = ({
    parameterName,
    trackedData
  }: EventData) => {
    // eslint-disable-next-line no-underscore-dangle
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
    // Wait time based on intuition — not strictly calculated.
    // I've used 1000, 2500, and even 5000ms on the work page
    setTimeout(() => {
      if (window.location.href.includes("dapple-cms")) {
        // eslint-disable-next-line no-console
        console.warn("⚠️ Mapp tracking is not enabled for dapple-cms");
        // eslint-disable-next-line no-console, no-underscore-dangle
        console.log("Tracking: send, page", JSON.stringify(window._ti));
        return;
      }
      if (!domain || !id) {
        // eslint-disable-next-line no-console
        console.warn("⚠️ Mapp Domain or ID is not defined");
        // This is to simulate the tracking request like the code in above for
        // click events. Because domain and id are set as empty strings in Storybook
        // The tracking script are not enabled. And therefore we console log the data
        // eslint-disable-next-line no-console, no-underscore-dangle
        console.log("Tracking: send, page", JSON.stringify(window._ti));
        return;
      }

      // eslint-disable-next-line no-underscore-dangle
      const hasCollectedData = window._ti
        ? // eslint-disable-next-line no-underscore-dangle
          Object.values(window._ti).some(
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

export const useEventStatistics = () => {
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

// URL tracking
// This function redirects to a campaign URL with a specified parameter `u_navigatedby` and value.
// When the Mapp script is loaded, this URL parameter will automatically be captured
// and sent in the same way as page parameters.s
export const useUrlStatistics = () => {
  const redirectWithUrlTracking = ({
    campaignUrl,
    parameterValue,
    openInNewTab = true
  }: {
    campaignUrl: string;
    parameterValue: string;
    openInNewTab?: boolean;
  }) => {
    if (!isUrlValid(campaignUrl)) {
      return;
    }

    const url = new URL(campaignUrl);
    const params = new URLSearchParams(url.search);
    params.set("u_navigatedby", parameterValue);
    url.search = params.toString();

    redirectTo(url, openInNewTab);
  };

  return { redirectWithUrlTracking };
};

export default {};
