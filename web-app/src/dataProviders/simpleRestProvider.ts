import RaSimpleRestProvider from "ra-data-simple-rest";
import { httpClient } from "./httpClient";

export const simpleRestProvider = RaSimpleRestProvider(
  `${import.meta.env.VITE_API_URL}`,
  httpClient
);
