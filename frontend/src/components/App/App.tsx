import "#root/assets/scss/material-kit-react.scss?v=1.10.0";

import { Admin, Resource } from "react-admin";

import authProvider from "#root/helpers/authProvider";
import dataProvider from "#root/helpers/dataProvider";

import { ComponentCreate, ComponentEdit, ComponentIcon, ComponentList } from "./Components";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryIcon,
  CategoryList,
  CategoryShow,
} from "./Categories";

// import ViewHome from "./ViewHome";
// import ViewLogin from "./ViewLogin";
// import ViewSignup from "./ViewSignup";

const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      // dashboard={ViewHome}
      dataProvider={dataProvider("http://localhost:5000")}
    >
      <Resource
        create={CategoryCreate}
        edit={CategoryEdit}
        // icon={CategoryIcon}
        list={CategoryList}
        name="categories"
        options={{ label: "Categorías" }}
        show={CategoryShow}
      />
      <Resource
        create={ComponentCreate}
        edit={ComponentEdit}
        // icon={ComponentIcon}
        list={ComponentList}
        name="components"
        options={{ label: "Componentes" }}
      />
    </Admin>
  );
};

export default App;
