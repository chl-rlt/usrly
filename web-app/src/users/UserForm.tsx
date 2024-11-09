import {
  DateInput,
  email,
  maxLength,
  minValue,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { Grid, Typography, Box } from "@mui/material";
export default function UserForm() {
  return (
    <SimpleForm warnWhenUnsavedChanges>
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
