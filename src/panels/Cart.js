import React, { useState, useEffect, Fragment } from "react";
import {
  Header,
  Placeholder,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Button,
  MiniInfoCell,
  Div,
  Footer,
  Counter,
  Group,
  Cell,
  Tabs,
  TabsItem,
} from "@vkontakte/vkui";
import "./Home.css";
import Icon56ArticleOutline from "@vkontakte/icons/dist/56/article_outline";
import Delivery from "./components/Delivery";
import CartListItems from "./components/CartListItems";

const Cart = ({
  id,
  go,
  goBack,
  typeDelivery,
  fetchedUser,
  activeCity,
  onDecrementPosition,
  onIncrementPosition,
  order,
  clearCart,
  onDeletePosition,
  activePVZ,
  changeCount,
  setOrders_success,
  params,
}) => {
  const [deliv, setDeliv] = useState(null);
  const [who, setWho] = useState("sdek");
  useEffect(() => {
    if (activeCity !== null) getRange(activeCity.id);
  }, [activeCity, typeDelivery, order, activePVZ]);
  const getRange = () => {
    fetch("https://saharnypossum.herokuapp.com/items/getRange", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({
        cityCode: activeCity.id,
        weight: String(order.meta.weight),
        count: order.meta.count,
        typeDelivery:
          activePVZ !== null ? (activePVZ.id === 123 ? "137" : "136") : "137",
        postal: activeCity.postal,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setDeliv(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!order.meta || order.meta.count === 0) {
    return (
      <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={goBack} />} />
        <Cell expandable onClick={() => go("AllOrders")}>
          Оплаченные заказы
        </Cell>
        <Placeholder
          icon={<Icon56ArticleOutline />}
          header={"Ваша корзина пуста"}
          action={
            <Button onClick={goBack} mode={"outline"} size="l">
              Продолжить покупки
            </Button>
          }
        />
        <Footer />
      </Panel>
    );
  } else {
    return (
      <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => go("home")} />} />
        <Cell expandable onClick={() => go("AllOrders")}>
          Оплаченные заказы
        </Cell>
        <CartListItems
          changeCount={changeCount}
          order={order}
          onDeletePosition={onDeletePosition}
          onDecrementPosition={onDecrementPosition}
          onIncrementPosition={onIncrementPosition}
          clearCart={clearCart}
        />
        <Fragment>
          <Div>
            <MiniInfoCell
              after={<Counter>{order.meta ? order.meta.count : 0}</Counter>}
            >
              Товаров (штуки)
            </MiniInfoCell>
            <MiniInfoCell
              after={<Counter>{order.meta ? order.meta.sum : 0}</Counter>}
            >
              Сумма (рубли)
            </MiniInfoCell>
          </Div>
          <Group header={<Header mode="secondary">Доставка</Header>}>
            <Cell
              expandable
              onClick={() => go("GetCityList")}
              indicator={activeCity !== null ? activeCity.name : "Не выбрано"}
            >
              Город
            </Cell>
            {deliv !== null && (
              <Div>
                <Tabs>
                  <TabsItem
                    onClick={() => setWho("sdek")}
                    selected={who === "sdek"}
                  >
                    СДЭК
                  </TabsItem>
                  <TabsItem
                    onClick={() => setWho("PR")}
                    selected={who === "PR"}
                  >
                    Почта России
                  </TabsItem>
                </Tabs>
                {who === "sdek" ? (
                  <Delivery
                    activeCity={activeCity}
                    who={who}
                    fetchedUser={fetchedUser}
                    order={order}
                    typeDelivery={typeDelivery}
                    go={go}
                    activePVZ={activePVZ}
                    deliv={deliv.sdek}
                    sum={order.meta.sum}
                    clearCart={clearCart}
                    setOrders_success={setOrders_success}
                    params={params}
                  />
                ) : (
                  <Delivery
                    activeCity={activeCity}
                    who={who}
                    fetchedUser={fetchedUser}
                    order={order}
                    typeDelivery={typeDelivery}
                    go={go}
                    activePVZ={activePVZ}
                    deliv={deliv.PR}
                    sum={order.meta.sum}
                    clearCart={clearCart}
                    setOrders_success={setOrders_success}
                    params={params}
                  />
                )}
              </Div>
            )}
          </Group>
        </Fragment>
        <Footer />
      </Panel>
    );
  }
};

export default Cart;
