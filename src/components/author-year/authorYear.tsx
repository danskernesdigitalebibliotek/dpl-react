import * as React from "react";
import { FC } from "react";

export interface ButtonSmallFilledProps {
  author: string;
  year: string;
}

const AuthorYear: FC<ButtonSmallFilledProps> = ({ author, year }) => {
  return (
    <>
      {author && author}
      {year && <>({year})</>}
    </>
  );
};

export default AuthorYear;
