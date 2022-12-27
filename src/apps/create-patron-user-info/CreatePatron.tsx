import React, { useState, FC } from "react";
import SelectUserType from "./SelectUserType";
import UserInfo from "./UserInfo";

const CreatePatron: FC = () => {
  const [cpr, setCpr] = useState<string>("");

  const confirmHandler = () => {
    // todo figure out how this flow works
    // Call adgangsplatformen -> hwo much does this handle
    setCpr("123");
  };

  return (
    <>
      {!cpr && <SelectUserType confirmHandler={confirmHandler} />}
      {cpr && <UserInfo />}
    </>
  );
};

export default CreatePatron;
