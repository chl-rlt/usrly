import RaSimpleRestProvider from "ra-data-simple-rest";
import { httpClient } from "./httpClient";

export const simpleRestProvider = RaSimpleRestProvider("", httpClient);
