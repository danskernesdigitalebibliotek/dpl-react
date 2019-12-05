import React from "react";
import Alert from "./alert";

export default { title: "Components|Alert" };

export function Info() {
  return <Alert />;
}

export function Warning() {
  return <Alert variant="warning" />;
}

export function Success() {
  return <Alert variant="success" />;
}
