import { Create } from "react-admin";
import UserForm from "./UserForm";

export default function UserCreate() {
  return (
    <Create>
      <UserForm />
    </Create>
  );
}
