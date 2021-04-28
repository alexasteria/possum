import { Panel, PanelHeader, PanelHeaderBack, Spinner } from "@vkontakte/vkui";
import React from "react";
import { useGetOrders } from "./use_get_orders";
import OrdersList from "./components/orders_list";

const GetOrders = ({ go, id, fetchedUser }) => {
  const { arrOrders } = useGetOrders();
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go("home")} />} />
      <OrdersList arrOrders={arrOrders} />
    </Panel>
  );
};
export default GetOrders;
