import React, { useEffect, useState } from "react";
import {
    Button,
    Cell,
    Footer,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Placeholder, Snackbar,
} from "@vkontakte/vkui";
import Icon56ArticleOutline from "@vkontakte/icons/dist/56/article_outline";

const AllOrderds = ({ id, params, goBack, setSnackbar }) => {
  const [allOrders, setAllOrders] = useState(null);
  useEffect(() => {
    fetch("https://saharnypossum.herokuapp.com/pay/getAllOrders", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({ params: params }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
            setSnackbar(<Snackbar layout="vertical" onClose={() => setSnackbar(null)}>
                Ошибка получения заказов
            </Snackbar>);
        } else {
            setAllOrders(res);
        }
      });
  }, []);
  if (allOrders === null)
    return (
      <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={goBack} />} />
        <Placeholder
          stretched
          icon={<Icon56ArticleOutline />}
          header={"Загрузка"}
        />
        <Footer />
      </Panel>
    );
  if (allOrders.length === 0)
    return (
      <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={goBack} />} />
        <Placeholder
          stretched
          icon={<Icon56ArticleOutline />}
          header={"У вас нет текущий доставок"}
          action={
            <Button onClick={goBack} mode={"outline"} size="l">
              Продолжить покупки
            </Button>
          }
        />
        <Footer />
      </Panel>
    );
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={goBack} />} />
      {allOrders.map((order) => {
        return (
          <Cell
            multiline
            indicator={order.status}
            description={
              order.track ? "Трек-номер " + order.track : "Ожидание отправки"
            }
          >{`Заказ №${order.num} (${order.sum}руб.)`}</Cell>
        );
      })}
      <Footer />
    </Panel>
  );
};
export default AllOrderds;
