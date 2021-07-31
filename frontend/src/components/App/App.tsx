// import "#root/assets/scss/material-kit-react.scss?v=1.10.0";

import { Admin, Resource } from "react-admin";

import authProvider from "#root/helpers/authProvider";
import dataProvider from "#root/helpers/dataProvider";
import { theme } from "#root/helpers/theme";

import { ComponentCreate, ComponentEdit, ComponentIcon, ComponentList } from "./Components";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryIcon,
  CategoryList,
  CategoryShow,
} from "./Categories";
import Dashboard from "./Dashboard";
import {
  TransactionCreate,
  TransactionEdit,
  TransactionIcon,
  TransactionList,
  TransactionShow,
} from "./Transactions";
import {
  TransactionItemCreate,
  TransactionItemEdit,
  TransactionItemIcon,
  TransactionItemList,
  TransactionItemShow,
} from "./TransactionItems";
import { UserCreate, UserEdit, UserIcon, UserList, UserShow } from "./Users";

// import ViewHome from "./ViewHome";
// import ViewLogin from "./ViewLogin";
// import ViewSignup from "./ViewSignup";

const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      dashboard={Dashboard}
      dataProvider={dataProvider("http://localhost:5000")}
      theme={theme}
    >
      <Resource
        create={CategoryCreate}
        edit={CategoryEdit}
        icon={CategoryIcon}
        list={CategoryList}
        name="categories"
        options={{ label: "Categorías" }}
        show={CategoryShow}
      />
      <Resource
        create={ComponentCreate}
        edit={ComponentEdit}
        icon={ComponentIcon}
        list={ComponentList}
        name="components"
        options={{ label: "Componentes" }}
      />
      <Resource
        create={UserCreate}
        edit={UserEdit}
        icon={UserIcon}
        list={UserList}
        name="users"
        options={{ label: "Usuarios" }}
        show={UserShow}
      />
      <Resource
        create={TransactionCreate}
        edit={TransactionEdit}
        icon={TransactionIcon}
        list={TransactionList}
        name="transactions"
        options={{ label: "Transacciones" }}
        show={TransactionShow}
      />
      <Resource
        create={TransactionItemCreate}
        edit={TransactionItemEdit}
        icon={TransactionItemIcon}
        list={TransactionItemList}
        name="transaction_items"
        options={{ label: "Items de Transacción" }}
        show={TransactionItemShow}
      />
    </Admin>
  );
};

export default App;
