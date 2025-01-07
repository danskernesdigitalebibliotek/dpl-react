// Test Fix Lint Javascript
const allowedUrls = ["dpl-", "dapple-cms"];

const features = [
  { name: "exampleFeature", active: false },
  { name: "readerPlayer", active: true }
] as const;

type FeatureNameType = typeof features[number]["name"];

const featureFlag = {
  features,

  isActive(name: FeatureNameType): boolean {
    const feature = this.features.find((f) => f.name === name);
    if (!feature) return false;

    const isAllowedUrl = allowedUrls.some((url) =>
      window.location.href.includes(url)
    );

    return feature.active && isAllowedUrl;
  }
};

export default featureFlag;
