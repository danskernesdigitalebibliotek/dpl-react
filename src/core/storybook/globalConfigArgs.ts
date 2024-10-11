export const argTypes = {
  errorMessagesConfig: {
    description: "Configuration for error messages behaviour",
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary:
          '{"containerId":"dpl-react-apps-error-messages","shouldOnlyShowOneError":true,"showCloseButton":true}'
      }
    }
  }
};

export default {
  errorMessagesConfig:
    '{"containerId":"dpl-react-apps-error-messages","shouldOnlyShowOneError":true,"showCloseButton":true}'
};

export interface GlobalConfigProps {
  errorMessagesConfig: string;
}
