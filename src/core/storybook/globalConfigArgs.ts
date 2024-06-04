export default {
  errorMessagesConfig: {
    name: "Configuration for error messages behaviour",
    defaultValue:
      '{"containerId":"dpl-react-apps-error-messages","shouldOnlyShowOneError":true,"showCloseButton":true}',
    control: { type: "text" }
  }
};

export interface GlobalConfigProps {
  errorMessagesConfig: string;
}
