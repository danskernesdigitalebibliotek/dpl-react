import React from "react";
import Alert from "./alert";

export default { title: "Components|Alert" };

export function Info() {
  return <Alert />;
}

export function Warning() {
  return <Alert variant="warning" message="Noget git galt" />;
}

export function Success() {
  return <Alert variant="success" message="Det lykkedes" />;
}
