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
  useNotify,
  useRecordContext,
} from "react-admin";
import { Grid, Typography, Box, Button } from "@mui/material";
import { User } from "./model";
import { userIsCurrentUser } from "../utils";
import { httpClient } from "../dataProviders/httpClient";

const UserFormToolbar = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  const record = useRecordContext<User>();
  const notify = useNotify();
  const sendResetPasswordMail = async (userId: string) => {
    await httpClient(`/v1/auth/send-reset-password-mail`, {
      method: "POST",
      body: JSON.stringify({
        id: userId,
      }),
    });
    notify(`Password reset mail sent`, { type: "success" });
  };

  return (
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <Box>
        <SaveButton />
        {!isCurrentUser && (
          <Button
            color="info"
            size="medium"
            sx={{ ml: 2 }}
            variant="outlined"
            onClick={() => {
              sendResetPasswordMail(String(record?.id));
            }}
          >
            Send password reset link
          </Button>
        )}
      </Box>
      {!isCurrentUser && <DeleteButton mutationMode="pessimistic" />}
    </Toolbar>
  );
};
export default function UserForm() {
  const record = useRecordContext<User>();
  const isCurrentUser = userIsCurrentUser(record?.id!);

  return (
    <SimpleForm
      warnWhenUnsavedChanges
      toolbar={<UserFormToolbar isCurrentUser={isCurrentUser} />}
    >
      <Grid container width={{ xs: "100%", xl: 900 }} spacing={2}>
        <Grid item xs={12} md={10}>
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
          <PasswordInputCustom />
          <DateInput source="birthDate" label="Birth date" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  );
}

const PasswordInputCustom = () => {
  const record = useRecordContext<User>();
  const isEditing = Boolean(record);

  return (
    <>
      {isEditing ? (
        <>
          <Box display={{ xs: "block", sm: "flex" }}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <TextInput
                source="email"
                validate={[required(), maxLength(255), email()]}
              />
            </Box>

            <Box
              flex={1}
              ml={{ xs: 0, sm: "0.5em" }}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PasswordInput
                source="newPassword"
                label="Password"
                required
                validate={validatePassword}
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
                required
                validate={validatePassword}
              />
            </Box>

            <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
              <PasswordInput
                source="passwordConfirm"
                label="Confirm password"
                validate={equalToPassword}
                required
                fullWidth
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

const equalToPassword = (value: string, allValues: any) => {
  if (value !== allValues.password) {
    return "The two passwords must match";
  }
};

export const validatePassword = (value: string) => {
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
