import * as React from "react";
import { FC } from "react";
import SelectUserType from "./SelectUserType";
import UserInfo from "./UserInfo";

const CreatePatron: FC = () => {
  const confirmHandler = () => {
    // todo call nemid
  };

  return <SelectUserType confirmHandler={confirmHandler} />;
  //   return <UserInfo />;
};

export default CreatePatron;
