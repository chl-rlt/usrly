import { fetchUtils } from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL;
export type Options = Parameters<typeof fetchUtils.fetchJson>[1];
export const httpClient = async (url: string, options: Options = {}) => {
  options.headers = new Headers({
    Accept: "application/json",
    ...options.headers,
  });

  const { token } = JSON.parse(localStorage.getItem("auth") || "{}");
  options.headers.set("Authorization", `Bearer ${token}`);

  return fetchUtils.fetchJson(apiUrl + url, options);
};
