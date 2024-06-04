import * as React from "react";
import { FC } from "react";

export interface MessageProps {
  children?: React.ReactNode;
  title: string;
  subTitle: string;
}

const Message: FC<MessageProps> = ({ children, title, subTitle }) => (
  <>
    <h2 data-cy="message-title" className="text-header-h2">
      {title}
    </h2>
    <div className="color-secondary-gray text-body-medium-regular mt-48">
      <p data-cy="message-subtitle">{subTitle}</p>
    </div>
    {children && <div>{children}</div>}
  </>
);

export default Message;
