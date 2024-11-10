import { jwtDecode } from "jwt-decode";
import { Identifier } from "react-admin";

export const currentUserId = () => {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const token = jwtDecode(auth.token) as { id: string };
  return token.id;
};

export const userIsCurrentUser = (userId: Identifier) => {
  return currentUserId() === userId;
};
