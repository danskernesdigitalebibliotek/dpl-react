import { redirectTo } from "../../../core/utils/helpers/url";

export const handleTracking = ({
  e,
  trackClick,
  isNewTab,
  url
}: {
  e:
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>;
  trackClick: () => Promise<unknown>;
  isNewTab: boolean;
  url: URL;
}) => {
  e.preventDefault();
  trackClick().then(() => {
    if (isNewTab) {
      window.open(url.href, "_blank");
    }
    redirectTo(url);
  });
};

export default {};
