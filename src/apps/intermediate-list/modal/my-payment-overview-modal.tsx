import React, { FC, ReactNode } from "react";
import ExternalLinkIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { Link } from "../../../components/atoms/link";

interface MyPaymentOverviewModalProps {
  children: ReactNode;
}

const MyPaymentOverviewModal: FC<MyPaymentOverviewModalProps> = ({
  children
}) => {
  const t = useText();
  const openInNewTab = (url: URL) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Modal
      modalId="123"
      closeModalAriaLabelText="test"
      screenReaderModalDescriptionText="test"
      classNames="modal-cta"
    >
      <div className="modal-cta__container">
        <h2 className="text-header-h2">Ubetalte gebyrer efter 27/10 2020</h2>
        <div className="mt-48 color-secondary-gray">
          <p className="text-body-medium-regular">
            Du sendes videre til betaling i Mit betalingsoverblik
          </p>
          <p className="text-links mt-24">
            Betalte gebyrer registreres først op til 24 timer efter din betaling
            lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <div className="modal-cta__buttons mt-48">
          <button
            type="button"
            className="btn-primary btn-filled btn-large arrow__hover--right-small undefined"
            onClick={() =>
              openInNewTab(
                new URL(
                  "https://www.borger.dk/vaelg-kommune?actionPageId=065ca8f9-a1f5-4946-ada7-12e163f568df&selfserviceId=7200a519-38ad-48b9-b19a-6e5783e39999"
                )
              )
            }
          >
            Gå til Mit Betalingsoverblik{" "}
            <img src={ExternalLinkIcon} className="btn-icon invert" alt="" />
          </button>
          <div className="modal-cta__link">
            <Link
              aria-describedby="modal-123"
              href={new URL("https://www.mitbetalingsoverblik.dk")}
              className="link-tag color-secondary-gray ml-8 btn-ui modal-btn-close"
            >
              Annuller
            </Link>
          </div>
        </div>
      </div>
      {children}
    </Modal>
  );
};

export default MyPaymentOverviewModal;
