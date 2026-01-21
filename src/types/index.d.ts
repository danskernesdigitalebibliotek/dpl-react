interface DplReactSettings {
  urls: {
    "fee-page": string;
    "physical-loans": string;
    userinfo: string;
    "dpl-cms-base": string;
    search: string;
    "advanced-search": string;
    material: string;
    logout: string;
    auth: string;
    dashboard: string;
    "view-fees-and-compensation-rates": string;
    "zero-hits-search": string;
    reservations: string;
  };
  texts: Record<string, string>;
  configs: {
    agency: string;
    "reservation-details": string;
    "error-messages": string;
  };
}

interface DplReact {
  settings: DplReactSettings;
}

declare global {
  interface Window {
    wts: {
      push(props: ["send", EventType, EventData]): void;
    };
    dplReact: DplReact;
  }
}
export {};
