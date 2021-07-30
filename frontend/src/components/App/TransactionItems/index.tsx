import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
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
  ReferenceField,
  ReferenceInput,
  SelectField,
  SelectInput,
  Show,
  ShowProps,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";

export const TransactionItemIcon = InsertDriveFileIcon;

export const TransactionItemList = (props: ListProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />

      <ReferenceField label="Transacción" source="transaction_id" reference="transactions">
        <TextField source="id" />
      </ReferenceField>

      <ReferenceField label="Componente" source="component_id" reference="components">
        <TextField source="name" />
      </ReferenceField>

      <SelectField
        choices={[
          { id: "+", name: "Agregar" },
          { id: "-", name: "Retirar" },
        ]}
        label="Operación"
        source="operation"
      />

      <NumberField label="Cantidad" source="quantity" />

      <EditButton basePath="/transaction_items" />
    </Datagrid>
  </List>
);

export const TransactionItemShow = (props: ShowProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />

      <ReferenceField label="Transacción" source="transaction_id" reference="transactions">
        <TextField source="id" />
      </ReferenceField>

      <ReferenceField label="Componente" source="component_id" reference="components">
        <TextField source="name" />
      </ReferenceField>

      <SelectField
        choices={[
          { id: "+", name: "Agregar" },
          { id: "-", name: "Retirar" },
        ]}
        label="Operación"
        source="operation"
      />

      <NumberField label="Cantidad" source="quantity" />

      <EditButton basePath="/transaction_items" />
    </SimpleShowLayout>
  </Show>
);

const TransactionItemTitle = ({ record }: any) => {
  return <span>{`Item "${record?.name || ""}"`}</span>;
};

export const TransactionItemEdit = (props: EditProps) => (
  <Edit title={<TransactionItemTitle />} {...props}>
    <SimpleForm>
      <ReferenceInput label="Transacción" source="transaction_id" reference="transactions">
        <SelectInput optionText="id" />
      </ReferenceInput>

      <ReferenceInput label="Componente" source="component_id" reference="components">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <SelectInput
        choices={[
          { id: "+", name: "Agregar" },
          { id: "-", name: "Retirar" },
        ]}
        label="Operación"
        source="operation"
      />

      <NumberInput options={{ label: "Cantidad" }} source="quantity" />
    </SimpleForm>
  </Edit>
);

export const TransactionItemCreate = (props: CreateProps) => (
  <Create title="Crear un item de una transacción" {...props}>
    <SimpleForm>
      <ReferenceInput label="Transacción" source="transaction_id" reference="transactions">
        <SelectInput optionText="id" />
      </ReferenceInput>

      <ReferenceInput label="Componente" source="component_id" reference="components">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <SelectInput
        choices={[
          { id: "+", name: "Agregar" },
          { id: "-", name: "Retirar" },
        ]}
        label="Operación"
        source="operation"
      />

      <NumberInput options={{ label: "Cantidad" }} source="quantity" />
    </SimpleForm>
  </Create>
);
