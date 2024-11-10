import {
  DateInput,
  DeleteButton,
  email,
  maxLength,
  PasswordInput,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useRecordContext,
} from "react-admin";
import { Grid, Typography, Box } from "@mui/material";
import { User } from "./model";
import { userIsCurrentUser } from "../utils";

const UserFormToolbar = ({ isCurrentUser }: { isCurrentUser: boolean }) => (
  <Toolbar sx={{ justifyContent: "space-between" }}>
    <SaveButton />
    {!isCurrentUser && <DeleteButton mutationMode="pessimistic" />}
  </Toolbar>
);
export default function UserForm() {
  const record = useRecordContext<User>();
  const isCurrentUser = userIsCurrentUser(record?.id!);
  const isEditing = Boolean(record);
  return (
    <SimpleForm
      warnWhenUnsavedChanges
      toolbar={<UserFormToolbar isCurrentUser={isCurrentUser} />}
    >
      <Grid container width={{ xs: "100%", xl: 900 }} spacing={2}>
        <Grid item xs={12} md={7}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            {isCurrentUser ? "My information" : "User information"}
          </Typography>

          <Box display={{ xs: "block", sm: "flex" }}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <TextInput
                source="lastName"
                label="Last name"
                fullWidth
                resettable
              />
            </Box>
            <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
              <TextInput
                source="firstName"
                label="First name"
                resettable
                fullWidth
              />
            </Box>
          </Box>

          {isEditing ? (
            <>
              <Box display={{ xs: "block", sm: "flex" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput
                    source="email"
                    validate={[required(), maxLength(255), email()]}
                  />
                </Box>

                <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                  <PasswordInput
                    source="password"
                    label="Password"
                    resettable
                    validate={validatePassword}
                    inputProps={{ autocomplete: "current-password" }}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <>
              <TextInput
                source="email"
                validate={[required(), maxLength(255), email()]}
                fullWidth
              />
              <Box display={{ xs: "block", sm: "flex" }}>
                <Box flex={1}>
                  <PasswordInput
                    source="password"
                    label="Password"
                    resettable
                    validate={validatePassword}
                  />
                </Box>

                <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                  <PasswordInput
                    source="passwordConfirm"
                    label="Confirm password"
                    validate={equalToPassword}
                    fullWidth
                  />
                </Box>
              </Box>
            </>
          )}

          <DateInput source="birthDate" label="Birth date" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  );
}

const equalToPassword = (value: string, allValues: any) => {
  if (value !== allValues.password) {
    return "The two passwords must match";
  }
};

const validatePassword = (value: string) => {
  if (value.length < 8) {
    return "The password must be at least 8 characters long";
  }
  if (value.length > 20) {
    return "The password must be at most 20 characters long";
  }
  if (!/[A-Z]/.test(value)) {
    return "The password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(value)) {
    return "The password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(value)) {
    return "The password must contain at least one number";
  }
  if (!/[^a-zA-Z0-9]/.test(value)) {
    return "The password must contain at least one special character";
  }
  return undefined;
};
