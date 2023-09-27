import FocusTrap from "focus-trap-react";
import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../core/modal.slice";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import { OpenOrderMutation } from "../../core/dbc-gateway/generated/graphql";
import { translateOpenOrderStatus } from "./helper";

type OpenOrderResponseProps = {
  title: string;
  modalId: string;
  openOrderResponse: OpenOrderMutation;
};

const OpenOrderResponse: React.FC<OpenOrderResponseProps> = ({
  modalId,
  title,
  openOrderResponse
}) => {
  const dispatch = useDispatch();
  const t = useText();

  return (
    <FocusTrap
      focusTrapOptions={{
        allowOutsideClick: true
      }}
    >
      <section className="reservation-modal reservation-modal--confirm">
        <h2
          data-cy="reservation-success-title-text"
          className="text-header-h3 pb-48"
        >
          {t("openOrderResponseTitleText")}
        </h2>

        <p className="text-body-medium-regular pb-24">
          {title} {t("openOrderResponseIsReservedForYouText")}
        </p>

        {openOrderResponse.submitOrder?.status && (
          <p
            data-cy="open-oprder-response-status-text"
            className="text-body-medium-regular pb-24"
          >
            {translateOpenOrderStatus(openOrderResponse.submitOrder?.status, t)}
          </p>
        )}

        <Button
          dataCy="reservation-success-close-button"
          classNames="reservation-modal__confirm-button"
          label={t("okButtonText")}
          buttonType="none"
          disabled={false}
          collapsible={false}
          size="small"
          variant="filled"
          onClick={() => {
            dispatch(closeModal({ modalId }));
          }}
        />
      </section>
    </FocusTrap>
  );
};

export default OpenOrderResponse;
