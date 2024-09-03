export const argTypes = {
  errorMessagesConfig: {
    name: "Configuration for error messages behaviour",
    control: { type: "text" }
  }
};

export default {
  errorMessagesConfig:
    '{"containerId":"dpl-react-apps-error-messages","shouldOnlyShowOneError":true,"showCloseButton":true}'
};

export interface GlobalConfigProps {
  errorMessagesConfig: string;
}
