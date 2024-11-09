import { Admin, radiantDarkTheme, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { httpClient } from "./dataProviders/httpClient";
import { authProvider } from "./dataProviders/auth";
import LoginPage from "./auth/LoginPage";

const dataProvider = simpleRestProvider(
  `${import.meta.env.VITE_API_URL}`,
  httpClient
);
export default function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      theme={radiantDarkTheme}
    >
      <Resource name="users" />
    </Admin>
  );
}
