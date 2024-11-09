import {
  DateInput,
  DeleteButton,
  email,
  maxLength,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from "react-admin";
import { Grid, Typography, Box } from "@mui/material";

const UserFormToolbar = () => (
  <Toolbar sx={{ justifyContent: "space-between" }}>
    <SaveButton />
    <DeleteButton mutationMode="pessimistic" />
  </Toolbar>
);
export default function UserForm() {
  return (
    <SimpleForm warnWhenUnsavedChanges toolbar={<UserFormToolbar />}>
      <Grid container width={{ xs: "100%", xl: 900 }} spacing={2}>
        <Grid item xs={12} md={7}>
          <Typography variant="h6" gutterBottom>
            User information
          </Typography>
          <TextInput
            source="email"
            validate={[required(), maxLength(255), email()]}
          />
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
          <DateInput source="birthDate" label="Birth date" fullWidth />
        </Grid>
      </Grid>
    </SimpleForm>
  );
}
