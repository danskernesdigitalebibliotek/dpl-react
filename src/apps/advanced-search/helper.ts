export const copyTextToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export default {};
