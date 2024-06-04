import * as React from "react";
import { FC } from "react";

export interface ButtonSmallFilledProps {
  author: string | null;
  year: string | null;
}

const AuthorYear: FC<ButtonSmallFilledProps> = ({ author, year }) => {
  return (
    <>
      {author && author}
      {year && <> ({year})</>}
    </>
  );
};

export default AuthorYear;
