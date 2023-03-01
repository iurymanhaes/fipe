import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "https://parallelum.com.br/fipe/api/v1",
});

