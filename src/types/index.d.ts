declare global {
  interface Window {
    wts: {
      push(props: [string, string, { [key: string]: string }]): void;
    };
  }
}
export {};
