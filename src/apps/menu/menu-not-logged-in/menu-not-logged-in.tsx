import * as React from "react";
import CloseIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import { FC } from "react";
import { useUrls } from "../../../core/utils/url";
import { useText } from "../../../core/utils/text";
import Link from "../../../components/atoms/links/Link";
import { Button } from "../../../components/Buttons/Button";

export interface MenuNotLoggedInContentProps {
  closePatronMenu: () => void;
}

const MenuNotLoggedInContent: FC<MenuNotLoggedInContentProps> = ({
  closePatronMenu
}) => {
  const t = useText();
  const { menuLoginUrl, menuSignUpUrl } = useUrls();
  return (
    <div className="modal modal-show modal-login modal-right modal-padding">
      <div className="modal__screen-reader-description" id="describemodal" />
      <button
        type="button"
        aria-describedby="describemodal"
        className="btn-ui modal-btn-close"
        aria-label="close modal"
        onClick={closePatronMenu}
      >
        <img src={CloseIcon} alt="close modal button" />
      </button>
      <div className="modal-login__container">
        <Link href={menuLoginUrl}>
          <Button
            label={t("menuLoginText")}
            buttonType="default"
            disabled={false}
            collapsible={false}
            size="small"
            variant="outline"
            classNames="btn-primary btn-filled btn-large arrow__hover--right-small"
          />
        </Link>
        <Link
          href={menuSignUpUrl}
          className="link-tag color-secondary-gray modal-login__btn-create-profile"
        >
          {t("menuSignUpText")}
        </Link>
      </div>
    </div>
  );
};

export default MenuNotLoggedInContent;
