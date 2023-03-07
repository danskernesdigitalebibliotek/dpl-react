import React, { useState, FC, useEffect } from "react";
import UserInfo from "./UserInfo";

interface CreatePatronProps {
  userToken: string;
}

const CreatePatron: FC<CreatePatronProps> = ({ userToken }) => {
  const [cpr, setCpr] = useState<string>("");

  fetch(`https://login.bib.dk/userinfo`, {
    method: "get",
    headers: { Authorization: `Bearer ${userToken}` }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });

  const confirmHandler = () => {
    // todo figure out how this flow works
    // Call adgangsplatformen -> hwo much does this handle
    setCpr("123");
  };

  return <UserInfo />;
};

export default CreatePatron;
