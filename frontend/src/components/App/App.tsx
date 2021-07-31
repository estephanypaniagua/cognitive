// import "#root/assets/scss/material-kit-react.scss?v=1.10.0";

import { Admin, Resource } from "react-admin";

import { BASE_URL_DATA_REQUEST } from "#root/api/axios";
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

import customRoutes from "./routes";
import LoginPage from "./LoginPage";

const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      dashboard={Dashboard}
      dataProvider={dataProvider(BASE_URL_DATA_REQUEST)}
      customRoutes={customRoutes}
      loginPage={LoginPage}
      theme={theme}
    >
      {permissions => [
        <Resource
          create={CategoryCreate}
          edit={CategoryEdit}
          icon={CategoryIcon}
          list={permissions === "ADMIN" ? CategoryList : undefined}
          name="categories"
          options={{ label: "Categorías" }}
          show={CategoryShow}
        />,
        <Resource
          create={ComponentCreate}
          edit={ComponentEdit}
          icon={ComponentIcon}
          list={permissions === "ADMIN" ? ComponentList : undefined}
          name="components"
          options={{ label: "Componentes" }}
        />,
        <Resource
          create={UserCreate}
          edit={UserEdit}
          icon={UserIcon}
          list={permissions === "ADMIN" ? UserList : undefined}
          name="users"
          options={{ label: "Usuarios" }}
          show={UserShow}
        />,
        <Resource
          create={TransactionCreate}
          edit={TransactionEdit}
          icon={TransactionIcon}
          list={permissions === "ADMIN" ? TransactionList : undefined}
          name="transactions"
          options={{ label: "Transacciones" }}
          show={TransactionShow}
        />,
        <Resource
          create={TransactionItemCreate}
          edit={TransactionItemEdit}
          icon={TransactionItemIcon}
          list={permissions === "ADMIN" ? TransactionItemList : undefined}
          name="transaction_items"
          options={{ label: "Items de Transacción" }}
          show={TransactionItemShow}
        />,
      ]}
    </Admin>
  );
};

export default App;
