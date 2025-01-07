import clsx from "clsx";
import * as React from "react";
import { FC } from "react";

export interface ContactInfoInputsProps {
  isInline: boolean;
  children: React.ReactNode;
  dataCy?: string;
  className?: string;
}

// This component wraps the input fields for the contact info section
// depending on the isInline prop.
const ContactInfoInputs: FC<ContactInfoInputsProps> = ({
  isInline,
  children,
  dataCy = "contact-info-input",
  className = undefined
}) => {
  if (!isInline) {
    return (
      <div className={className} data-cy={dataCy}>
        {children}
      </div>
    );
  }

  const renderableChildren = React.Children.toArray(children);
  return (
    <div
      className={clsx(className, {
        "dpl-input__flex": isInline
      })}
      data-cy={dataCy}
    >
      {renderableChildren.map((child, i) => {
        const childClassName = clsx("patron__input--desktop", {
          "mr-16": i < renderableChildren.length - 1
        });
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className={childClassName}>
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default ContactInfoInputs;
