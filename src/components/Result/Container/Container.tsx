import React, { ReactNode } from "react";
import { BoxContainer } from "./index";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <BoxContainer>
      {children}
    </BoxContainer>
  );
}
