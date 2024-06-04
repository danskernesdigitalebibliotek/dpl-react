import React from "react";
import clsx from "clsx";
import { PromoBarIcon, PromoBarIconType } from "./PromoBarIcon";

type PromoBarProps = {
  text: string;
  classNames?: string;
  type?: PromoBarIconType;
  sticky?: boolean;
  theme?: "dark";
};

const PromoBar: React.FunctionComponent<PromoBarProps> = ({
  text,
  classNames,
  type,
  sticky,
  theme
}) => {
  return (
    <section
      className={clsx("promo-bar", classNames, {
        "promo-bar--sticky": sticky,
        "promo-bar--dark": theme === "dark"
      })}
    >
      {type && <PromoBarIcon type={type} />}
      <p className="text-small-caption">{text}</p>
    </section>
  );
};

export default PromoBar;
