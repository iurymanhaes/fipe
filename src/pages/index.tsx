import Head from "next/head";
import _, { Dictionary } from "lodash";
import {
  Card,
  Grid,
  Autocomplete,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { api } from "@/services/api";
import { GetStaticProps } from "next";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import ValuesContext from "@/contexts/valuesContext";
import { convertToFormattedResult } from "@/utils/convertToFormattedResult";
import AutoComplete from "@/components/Home/AutoComplete/AutoComplete";
import GridContainer from "@/components/Home/GridContainer/GridContainer";
import CardHome from "@/components/Home/CardHome/CardHome";
import TypographySecondary from "@/components/Common/TypographySecondary";

type Props = {
  brands: Brand[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await api.get<Brand[]>("/carros/marcas");
  return {
    props: {
      brands: data,
    },
    revalidate: 60 * 60,
  };
};

export default function Home({ brands }: { brands: Brand[] }) {
  const { updateValues } = useContext(ValuesContext);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [years, setYears] = useState<Year[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const router = useRouter();

  const handleBrandChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Brand | null
  ) => {
    if (value) {
      api
        .get<ModelList>(`/carros/marcas/${value.codigo}/modelos`)
        .then((response) => {
          const data = response.data;
          setModels(data.modelos);
          setSelectedBrand(value);
          setSelectedModel(null);
          setSelectedYear(null);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setDisabled(false);
        });
    } else {
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedYear(null);
      setModels([]);
      setYears([]);
    }
  };

  const handleModelChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Model | null
  ) => {
    if (value && selectedBrand) {
      api
        .get<YearList>(
          `/carros/marcas/${selectedBrand.codigo}/modelos/${value.codigo}/anos`
        )
        .then((response) => {
          const data = response.data;
          setYears(data);
          setSelectedModel(value);
          setSelectedYear(null);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSelectedModel(null);
      setSelectedYear(null);
      setYears([]);
    }
  };

  const handleYearChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Year | null
  ) => {
    if (value && selectedBrand && selectedModel) {
      setSelectedYear(value);
    } else {
      setSelectedYear(null);
    }
  };

  const handleSubmit = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      setLoading(true);
      api
        .get<Dictionary<string | number>>(
          `/carros/marcas/${selectedBrand.codigo}/modelos/${selectedModel.codigo}/anos/${selectedYear.codigo}`
        )
        .then((response) => {
          const data = response.data;
          const formattedData: FormattedResult = convertToFormattedResult(data);
          const formattedDataWithUpdate = { ...formattedData, updateValues };
          updateValues(formattedDataWithUpdate);
          router.push("/result");    
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("Por favor, selecione uma marca, um modelo e um ano."); //colocar Snackbar
    }
  };

  return (
    <>
      <Head>
        <title>Mobiauto Teste</title>
        <meta name="description" content="Mobiauto Teste" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GridContainer>
        <TypographySecondary>Tabela Fipe</TypographySecondary>
        <Typography
          color="secondary"
          component="h3"
          sx={{
            fontSize: "25px",
            fontWeight: "600",
            mb: 1,
            textAlign: "center",
          }}
        >
          Consulte o valor de um veículo de forma gratuita
        </Typography>
          <CardHome>
            <AutoComplete
              handle={handleBrandChange}
              options={brands}
              label="Marca"
            />
            <AutoComplete
              disabled={disabled}
              handle={handleModelChange}
              options={models}
              label="Modelo"
            />

            {selectedBrand && selectedModel && (
              <AutoComplete
                handle={handleYearChange}
                options={years}
                label="Ano"
              />
            )}
            <Grid item xs={12} sm={12} md={8} px={1}>
              <Button
                onClick={handleSubmit}
                disabled={
                  !selectedBrand || !selectedModel || !selectedYear || loading
                }
                variant="contained"
                color="primary"
                sx={{ width: "100%", textTransform: "initial", px: 4 }}
              >
                {loading && <CircularProgress size={20} />}
                Consultar preço
              </Button>
            </Grid>
          </CardHome>
      </GridContainer>
    </>
  );
}
