import ValuesContext from "@/contexts/valuesContext";
import { Box, Chip, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Link from "next/link";
import TypographySecondary from "@/components/Common/TypographySecondary";
import Container from "@/components/Result/Container/Container";

export default function Result() {
  const router = useRouter();
  const values = useContext(ValuesContext);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (!values ||
        !values.marca ||
        !values.modelo ||
        !values.anoModelo ||
        !values.valor)
    ) {
      router.replace("/");
    }
  }, [values]);

  return (
    <main
      style={{
        backgroundColor: "#DCF5F2",
        padding: "24px",
      }}
    >
      <Link href="/">
        <ArrowBackIosRoundedIcon color="primary" />
      </Link>
      <Container>
        <TypographySecondary>
          Tabela Fipe: Preço {values.marca} {values.modelo} {values.anoModelo}
        </TypographySecondary>
        <Chip
          color="success"
          label={`${values.valor}`}
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            padding: "15px 8px",
          }}
        />
        <Typography
          sx={{ fontSize: "12px", color: "#97ABBB", textAlign: "center" }}
        >
          Este é o preço de compra do veículo
        </Typography>
      </Container>
    </main>
  );
}
