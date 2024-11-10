import { Identifier } from "react-admin";

export type User = {
  id: Identifier;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
};
