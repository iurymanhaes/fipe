import { Card } from "@mui/material";
import React, { ReactNode } from "react";
import { CardCustom } from "./index";
type Props = {
  children: ReactNode;
};
export default function CardHome({ children }: Props) {
  return (
    <CardCustom>
      {children}
    </CardCustom>
  );
}
