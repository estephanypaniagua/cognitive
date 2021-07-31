import { useEffect, useState } from "react";
import {
  Button,
  DashboardComponent,
  GetListParams,
  useDataProvider,
  useGetIdentity,
} from "react-admin";

import CartCard from "./CartCard";
import ItemCard from "./ItemCard";

const getListParams: GetListParams = {
  filter: {},
  pagination: { page: 1, perPage: 50 },
  sort: { field: "id", order: "DESC" },
};

const Dashboard: DashboardComponent = () => {
  const { identity } = useGetIdentity();
  const dataProvider = useDataProvider();

  const [components, setComponents] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);
  const [transactionItems, setTransactionItems] = useState<any>([]);

  useEffect(() => {
    (async () => {
      if (!identity || !identity.id) return;
      try {
        const fetchedComponents = await dataProvider.getList("components", getListParams);
        const stockedComponents = fetchedComponents.data.map(fcd => ({ ...fcd, current: 0 }));
        setComponents(stockedComponents);

        const fetchedCategories = await dataProvider.getList("categories", getListParams);
        setCategories(fetchedCategories.data);

        const fetchedTransactions = await dataProvider.getList("transactions", getListParams);
        const myTransactions = fetchedTransactions.data.filter(ftd => ftd.user_id === identity?.id);
        setTransactions(myTransactions);

        const fetchedTransactionItems = await dataProvider.getList(
          "transaction_items",
          getListParams
        );
        setTransactionItems(fetchedTransactionItems.data);
      } catch (err) {
        console.log({ err });
      }
    })();
  }, [identity]);

  useEffect(() => {}, [components]);

  const handlePlaceOrder = async () => {
    const componentsToBe = components.filter((c: any) => c.current > 0);

    if (!identity || !componentsToBe || componentsToBe.length === 0) return;

    const myNewTransaction = await dataProvider.create("transactions", {
      data: { user_id: identity?.id, is_approved: "0" },
    });

    const tid = myNewTransaction.data.id;

    const awaitedComponents = componentsToBe?.map(async (ctb: any) => {
      await dataProvider.create("transaction_items", {
        data: {
          transaction_id: tid,
          component_id: ctb.id,
          quantity: ctb.current,
          operation: "-",
        },
      });
    });

    await Promise.all(awaitedComponents);

    const fetchedTransactions = await dataProvider.getList("transactions", getListParams);
    const myTransactions = fetchedTransactions.data.filter(ftd => ftd.user_id === identity?.id);
    setTransactions(myTransactions);

    const fetchedTransactionItems = await dataProvider.getList("transaction_items", getListParams);
    setTransactionItems(fetchedTransactionItems.data);
  };

  return (
    <div style={{ padding: "0 2rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2>Bienvenidos</h2>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3>Pedidos</h3>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
          gap: "2rem",
        }}
      >
        {transactions?.map?.((t: any) => {
          return (
            <CartCard
              allComponents={components}
              components={transactionItems?.filter((ti: any) => ti.transaction_id === t.id)}
              createdAt={t.created_at}
              isApproved={t.is_approved}
              key={t.id}
            />
          );
        })}
      </div>

      <br />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3>Componentes del laboratorio</h3>
        <Button label="Enviar pedido" onClick={handlePlaceOrder} size="small" variant="outlined" />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
          gap: "2rem",
        }}
      >
        {components?.map?.((c: any) => {
          const handlePlus = () => {
            setComponents((old: any) =>
              old.map((oldComponent: any) => {
                if (oldComponent.id !== c.id) return { ...oldComponent };
                return { ...oldComponent, current: oldComponent.current + 1 };
              })
            );
          };
          const handleMinus = () => {
            setComponents((old: any) =>
              old.map((oldComponent: any) => {
                if (oldComponent.id !== c.id) return { ...oldComponent };
                return { ...oldComponent, current: oldComponent.current - 1 };
              })
            );
          };
          return (
            <ItemCard
              key={c.id}
              category={categories?.filter((cat: any) => cat.id === c.category_id)[0]?.name}
              name={c.name}
              description={c.description}
              onMinusButtonClick={handleMinus}
              onPlusButtonClick={handlePlus}
              totalQuantity={c.quantity}
              currentQuantity={c.current}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
