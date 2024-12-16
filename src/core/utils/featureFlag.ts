type FeatureFlagType = "readerPlayer";

const isVisible = (name: FeatureFlagType): boolean => {
  const allowedUrls = ["dpl-", "dapple-cms"];

  if (name === "readerPlayer") {
    return allowedUrls.some((url) => window.location.href.includes(url));
  }

  return false;
};

export default isVisible;
