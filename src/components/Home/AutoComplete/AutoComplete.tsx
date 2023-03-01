import React from "react";
import { Grid, Autocomplete, TextField } from "@mui/material";
import { GridAutoComplete } from "./index";

interface Option {
  nome: string;
  codigo: string | number;
}

interface AutoCompleteProps {
  handle: (
    event: React.SyntheticEvent<Element, Event>,
    value: Option | null
  ) => void;
  options: Option[];
  label: string;
}

export default function AutoComplete({
  handle,
  options,
  label,
}: AutoCompleteProps) {
  return (
    <GridAutoComplete
      item
      xs={12}
      lg={10}
      sx={{ maxWidth: "500px", width: "100%", padding:'0 24px' }}
    >
      <Autocomplete
        disablePortal
        options={options}
        getOptionLabel={(opt) => opt.nome}
        onChange={handle}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </GridAutoComplete>
  );
}
