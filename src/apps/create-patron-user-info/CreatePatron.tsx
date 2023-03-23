import React, { useState, FC } from "react";
import UserInfo from "./UserInfo";

interface CreatePatronProps {
  userToken: string;
}

const CreatePatron: FC<CreatePatronProps> = ({ userToken }) => {
  const [cpr, setCpr] = useState<string | null>(null);

  fetch(`https://login.bib.dk/userinfo`, {
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
