import * as React from "react";
import CloseIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import { FC } from "react";
import { useUrls } from "../../../core/utils/url";
import ArrowIcon from "../../../components/atoms/icons/arrow/arrow-white";
import { useText } from "../../../core/utils/text";

export interface MenuNotLoggedInContentProps {
  closeLoanerMenu: () => void;
}

const MenuNotLoggedInContent: FC<MenuNotLoggedInContentProps> = ({
  closeLoanerMenu
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
        onClick={closeLoanerMenu}
      >
        <img src={CloseIcon} alt="close modal button" />
      </button>
      <div className="modal-login__container">
        <Link href={menuLoginUrl}>
          <button
            type="button"
            className="btn-primary btn-filled btn-large arrow__hover--right-small"
          >
            {t("menuLoginText")}
            <ArrowIcon />
          </button>
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
