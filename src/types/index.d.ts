declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
    wts: {
      push(props: ["send", EventType, EventData]): void;
    };
  }
}
export {};
