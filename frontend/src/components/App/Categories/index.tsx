import MUICategoryIcon from "@material-ui/icons/Category";
import {
  Create,
  CreateProps,
  Datagrid,
  Edit,
  EditButton,
  EditProps,
  List,
  ListProps,
  Show,
  ShowProps,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

export const CategoryIcon = MUICategoryIcon;

export const CategoryList = (props: ListProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="Nombre" source="name" />
      <TextField label="Descripción" source="description" />
      <EditButton basePath="/categories" />
    </Datagrid>
  </List>
);

export const CategoryShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" label="Nombre" />
      <TextField source="description" />
      <EditButton basePath="/categories" />
    </SimpleShowLayout>
  </Show>
);

const CategoryTitle = ({ record }: any) => {
  return <span>Categoria {record ? `"${record.name}"` : ""}</span>;
};

export const CategoryEdit = (props: EditProps) => (
  <Edit title={<CategoryTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput options={{ label: "Nombre" }} source="name" />
      <TextInput options={{ multiline: true, label: "Descripción" }} source="description" />
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = (props: CreateProps) => (
  <Create title="Crear un categoria" {...props}>
    <SimpleForm>
      <TextInput options={{ label: "Nombre" }} source="name" />
      <TextInput options={{ multiline: true, label: "Descripción" }} source="description" />
    </SimpleForm>
  </Create>
);
