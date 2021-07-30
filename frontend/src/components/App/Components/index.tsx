import BookIcon from "@material-ui/icons/Book";
import {
  Create,
  CreateProps,
  Datagrid,
  Edit,
  EditButton,
  EditProps,
  List,
  ListProps,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

export const ComponentIcon = BookIcon;

export const ComponentList = (props: ListProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="Nombre" source="name" />
      <TextField label="Descripción" source="description" />
      <TextField label="Cantidad" source="quantity" />
      <ReferenceField source="category_id" reference="categories">
        <TextField source="name" />
      </ReferenceField>
      <EditButton basePath="/components" />
    </Datagrid>
  </List>
);

const ComponentTitle = ({ record }: any) => {
  return <span>Componente {record ? `"${record.title}"` : ""}</span>;
};

export const ComponentEdit = (props: EditProps) => (
  <Edit title={<ComponentTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput options={{ label: "Nombre" }} source="name" />
      <TextInput options={{ label: "Descripción", multiline: true }} source="description" />
      <NumberInput options={{ label: "Cantidad" }} source="quantity" />
      <ReferenceInput label="Categoría" source="category_id" reference="categories">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const ComponentCreate = (props: CreateProps) => (
  <Create title="Crear un componente" {...props}>
    <SimpleForm>
      <TextInput options={{ label: "Nombre" }} source="name" />
      <TextInput options={{ label: "Descripción", multiline: true }} source="description" />
      <NumberInput options={{ label: "Cantidad" }} source="quantity" />
      <ReferenceInput label="Categoría" source="category_id" reference="categories">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

// ReferenceInput,
// SelectInput,
