import AutorenewIcon from "@material-ui/icons/Autorenew";
import {
  Create,
  CreateProps,
  Datagrid,
  Edit,
  EditButton,
  EditProps,
  List,
  ListProps,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Show,
  ShowProps,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

export const TransactionIcon = AutorenewIcon;

export const TransactionList = (props: ListProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />

      <ReferenceField label="Usuario" source="user_id" reference="users">
        <TextField source="name" />
      </ReferenceField>

      <TextField label="¿Aprobado?" source="is_approved" />

      <EditButton basePath="/transactions" />
    </Datagrid>
  </List>
);

export const TransactionShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />

      <ReferenceField label="Usuario" source="user_id" reference="users">
        <TextField source="name" />
      </ReferenceField>

      <TextField label="¿Aprobado?" source="is_approved" />

      <EditButton basePath="/transactions" />
    </SimpleShowLayout>
  </Show>
);

const TransactionTitle = ({ record }: any) => {
  return <span>Usuario {`"${record?.name || ""}"`}</span>;
};

export const TransactionEdit = (props: EditProps) => (
  <Edit title={<TransactionTitle />} {...props}>
    <SimpleForm>
      <ReferenceInput label="Usuario" source="user_id" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput options={{ label: "¿Aprobado?" }} source="is_approved" />
    </SimpleForm>
  </Edit>
);

export const TransactionCreate = (props: CreateProps) => (
  <Create title="Crear una transacción" {...props}>
    <SimpleForm>
      <ReferenceInput label="Usuario" source="user_id" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput options={{ label: "¿Aprobado?" }} source="is_approved" />
    </SimpleForm>
  </Create>
);
