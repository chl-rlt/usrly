import initAuthRoute from "./auth";
import createUserEndpoint from "./users/createUser";
import getUsers from "./users/getUsers";

export function initRoutes() {
  initAuthRoute();
  getUsers();
}
