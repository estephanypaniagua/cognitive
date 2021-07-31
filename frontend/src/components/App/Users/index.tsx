import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Create,
  CreateProps,
  Datagrid,
  Edit,
  EditButton,
  EditProps,
  List,
  ListProps,
  NumberField,
  NumberInput,
  PasswordInput,
  SelectField,
  SelectInput,
  Show,
  ShowProps,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

export const UserIcon = AccountCircleIcon;

export const UserList = (props: ListProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="Nombre" source="name" />
      <TextField label="Correo" source="mail" />
      <SelectField
        choices={[
          { id: "USER", name: "Usuario" },
          { id: "ADMIN", name: "Administrador" },
        ]}
        label="Rol"
        source="role"
      />
      <NumberField label="Código" source="university_code" />
      <NumberField label="Celular" source="cellphone" />
      {props.permissions === "ADMIN" && <EditButton basePath="/users" />}
    </Datagrid>
  </List>
);

export const UserShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField label="Nombre" source="name" />
      <TextField label="Correo" source="mail" />
      <TextField label="Rol" source="role" />
      <NumberField label="Código" source="university_code" />
      <NumberField label="Celular" source="cellphone" />
      <EditButton basePath="/users" />
    </SimpleShowLayout>
  </Show>
);

const UserTitle = ({ record }: any) => {
  return <span>Usuario {`"${record?.name || ""}"`}</span>;
};

export const UserEdit = (props: EditProps) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput options={{ label: "Correo" }} source="mail" type="email" />
      <TextInput options={{ label: "Nombre" }} source="name" />
      <SelectInput
        choices={[
          { id: "USER", name: "Usuario" },
          { id: "ADMIN", name: "Administrador" },
        ]}
        options={{ label: "Rol" }}
        source="role"
      />
      <NumberInput options={{ label: "Código" }} source="university_code" />
      <NumberInput options={{ label: "Celular" }} source="cellphone" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props: CreateProps) => (
  <Create title="Crear un usuario" {...props}>
    <SimpleForm>
      <TextInput options={{ label: "Correo" }} source="mail" type="email" />
      <PasswordInput options={{ label: "Contraseña" }} source="password" />
      <TextInput options={{ label: "Nombre" }} source="name" />
      <SelectInput
        choices={[
          { id: "USER", name: "Usuario" },
          { id: "ADMIN", name: "Administrador" },
        ]}
        options={{ label: "Rol" }}
        source="role"
      />
      <NumberInput options={{ label: "Código" }} source="university_code" />
      <NumberInput options={{ label: "Celular" }} source="cellphone" />
    </SimpleForm>
  </Create>
);
