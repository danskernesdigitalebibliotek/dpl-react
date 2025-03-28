import * as React from "react";
import { useText } from "../../../core/utils/text";
import { Button } from "../../Buttons/Button";

export interface ReservationFormProps {
  title: string;
  description: string[];
  children?: React.ReactNode;
  onSubmit: () => void;
  buttonLabel?: string;
  disabledButton?: boolean;
  cyData?: string;
}

const ReservationForm = ({
  title,
  description,
  children,
  onSubmit,
  buttonLabel,
  disabledButton,
  cyData = "reservation-form"
}: ReservationFormProps) => {
  const t = useText();

  return (
    <section className="reservation-modal reservation-form">
      <div className="reservation-form__content">
        <div className="reservation-form__header">
          <h3 className="text-header-h3 mb-35" data-cy={`${cyData}-title`}>
            {title}
          </h3>
          {description.map((paragraph, index) => (
            <p
              key={index}
              className="text-body-large"
              data-cy={`${cyData}-description`}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <form>
          {children && (
            <div className="reservation-form__body mt-35">{children}</div>
          )}
          <div className="reservation-form__footer mt-48">
            <Button
              label={buttonLabel || t("saveButtonText")}
              buttonType="none"
              disabled={disabledButton ?? false}
              collapsible={false}
              size="xlarge"
              variant="filled"
              onClick={onSubmit}
              dataCy={`${cyData}-button`}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReservationForm;
