declare global {
  interface Window {
    wts: {
      push(props: ["send", EventType, EventData]): void;
    };
  }
}
export {};
