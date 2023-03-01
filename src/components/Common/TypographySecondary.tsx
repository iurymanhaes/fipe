import { Typography } from "@mui/material";

import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

export default function TypographySecondary({ children }: Props) {
  return (
    <Typography
      color="secondary"
      component="h1"
      sx={{
        fontSize: "30px",
        fontWeight: "700",
        textAlign: "center",
      }}
    >
      {children}
    </Typography>
  );
}
