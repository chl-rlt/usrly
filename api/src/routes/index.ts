import initAuthRoute from "./auth";
import createUser from "./users/createUser";
import deleteUser from "./users/deleteUser";
import getUserById from "./users/getUserById";
import getUsers from "./users/getUsers";
import updateUser from "./users/updateUser";

export function initRoutes() {
  initAuthRoute();
  getUsers();
  getUserById();
  updateUser();
  deleteUser();
  createUser();
}
