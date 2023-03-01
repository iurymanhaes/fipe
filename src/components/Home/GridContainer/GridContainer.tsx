import { Grid } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode;
  };

export default function GridContainer({ children }: Props) {
  return (
    <Grid
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{
          height: "100vh",
          padding: "24px",
        }}
      >
        {children}
      </Grid>
  )
}
