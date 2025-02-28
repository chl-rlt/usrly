import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  SearchInput,
  BulkDeleteButton,
} from "react-admin";
const filters = [
  <SearchInput source="email" alwaysOn placeholder="Search by email" />,
];
export const UsersList = () => {
  return (
    <List
      title={false}
      exporter={false}
      sort={{ field: "email", order: "ASC" }}
      filters={filters}
    >
      <Datagrid
        rowClick="edit"
        bulkActionButtons={<BulkDeleteButton mutationMode="pessimistic" />}
      >
        <TextField source="lastName" label="Last name" />
        <TextField source="firstName" label="First name" />
        <DateField source="birthDate" label="Birth date" />
        <EmailField source="email" />
      </Datagrid>
    </List>
  );
};
