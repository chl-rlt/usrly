import { fetchUtils } from "react-admin";

export type Options = Parameters<typeof fetchUtils.fetchJson>[1];

const apiUrl: string = import.meta.env.VITE_API_URL;
export const httpClient = async (url: string, options: Options = {}) => {
  options.headers = new Headers({
    Accept: "application/json",
    ...options.headers,
  });

  const { token } = JSON.parse(localStorage.getItem("auth") || "{}");
  options.headers.set("Authorization", `Bearer ${token}`);

  const response = await fetchUtils.fetchJson(`${apiUrl}${url}`, options);
  return response;
};
