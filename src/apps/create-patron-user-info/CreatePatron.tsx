import React, { useState, FC } from "react";
import UserInfo from "./UserInfo";
import { useUrls } from "../../core/utils/url";

interface CreatePatronProps {
  userToken: string;
}

const CreatePatron: FC<CreatePatronProps> = ({ userToken }) => {
  const [cpr, setCpr] = useState<string | null>(null);
  const { loginUrlConfig } = useUrls();

  fetch(String(loginUrlConfig), {
    method: "get",
    headers: { Authorization: `Bearer ${userToken}` }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data?.attributes?.cpr) {
        setCpr(data.attributes.cpr);
      }
    });

  if (cpr === null) return null;

  return <UserInfo cpr={cpr} />;
};

export default CreatePatron;
