import {
  Admin,
  Authenticated,
  CustomRoutes,
  radiantDarkTheme,
  Resource,
} from "react-admin";
import { authProvider } from "./dataProviders/auth";
import LoginPage from "./auth/LoginPage";
import { UsersList } from "./users/UsersList";
import GroupIcon from "@mui/icons-material/Group";
import { User } from "./users/model";
import { baseDataProvider } from "./dataProviders/base";
import UserCreate from "./users/UserCreate";
import UserEdit from "./users/UserEdit";
import Layout from "./layout/Layout";
import ResetPassword from "./auth/ResetPassword";
import { Route } from "react-router-dom";

export default function App() {
  return (
    <Admin
      dataProvider={baseDataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      theme={radiantDarkTheme}
      layout={Layout}
    >
      <Resource
        name="users"
        list={UsersList}
        create={UserCreate}
        edit={UserEdit}
        icon={GroupIcon}
        recordRepresentation={(record: User) =>
          `${record.firstName} ${record.lastName}`
        }
      />

      <CustomRoutes noLayout>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </CustomRoutes>
    </Admin>
  );
}
