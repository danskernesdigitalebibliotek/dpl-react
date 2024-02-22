import React from "react";
import Link from "../../../components/atoms/links/Link";
import { useUrls } from "../../../core/utils/url";
import { useText } from "../../../core/utils/text";

const MenuUserUnregisteredContent = () => {
  const t = useText();
  const u = useUrls();
  const logoutUrl = u("logoutUrl");

  return (
    <div className="modal-login modal-login--anonymous">
      <Link
        className="btn-primary btn-filled btn-large arrow__hover--right-small"
        href={logoutUrl}
      >
        {t("menuLogOutText")}
      </Link>
    </div>
  );
};

export default MenuUserUnregisteredContent;
