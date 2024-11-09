import initAuthRoute from "./auth";
import getUserById from "./users/getUserById";
import getUsers from "./users/getUsers";
import updateUser from "./users/updateUser";

export function initRoutes() {
  initAuthRoute();
  getUsers();
  getUserById();
  updateUser();
}
