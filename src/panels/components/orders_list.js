import {
    Button,
    Card,
    CardGrid,
    Div,
    InfoRow,
    Input,
    MiniInfoCell,
    Select, Spinner,
} from "@vkontakte/vkui";
import React from "react";
import moment from "moment";
import { useGetOrders } from "../use_get_orders";

const getItem = (order) => {
  const jsxArr = [];
  for (let key in order) {
    jsxArr.push(
      <MiniInfoCell key={key} textWrap="full">
        {order[key]}
      </MiniInfoCell>
    );
  }
  return jsxArr;
};

const getItemVal = (key, value) => {
  switch (key) {
    case "activePVZ":
      return <InfoRow header="Пункт выдачи">{value}</InfoRow>;
    case "amount":
      return <InfoRow header="Сумма заказа">{value}</InfoRow>;
    case "count":
      return <InfoRow header="Всего товаров">{value}</InfoRow>;
    case "orderNum":
      return <InfoRow header="Номер заказа">{value}</InfoRow>;
    case "date":
      return (
        <InfoRow header="Дата">
          {moment(value).format("MMMM Do YYYY, h:mm:ss a")}
        </InfoRow>
      );
    case "typeDelivery":
      return <InfoRow header="Тип доставки">{value}</InfoRow>;
    case "weight":
      return <InfoRow header="Вес">{value} кг</InfoRow>;
    default:
      return null;
  }
};

const getInfo = (info) => {
  const jsxArr = [];
  for (let key in info) {
    jsxArr.push(getItemVal(key, info[key]));
  }
  return jsxArr;
};

const OrdersList = ({ arrOrders }) => {
  const { changeStatus, changeTrack, changeOrder } = useGetOrders();
    if (!arrOrders) return <Spinner />;
  return (
    <CardGrid style={{ padding: 10 }}>
      {arrOrders.map((order) => (
        <Card
          style={{
            paddingTop: 8,
            borderRadius: 13,
            margin: "0 0 20px 0",
            backgroundColor: "#007151",
            boxShadow:
              "inset 2px 2px 5px rgb(226 191 157 / 50%), 1px 1px 5px rgb(255 255 255)",
          }}
          mode="shadow"
          size="l"
        >
          <Div>
            {getItem(order.jsonParams.order)}
            {getInfo(order.jsonParams.info)}
            <InfoRow header="Трек">
              <Input defaultValue={order.track} onChange={(e)=>changeTrack(order, e.target.value)}/>
            </InfoRow>
            {
              order.jsonParams.contacts &&
              <InfoRow header="Контакты">
                {order.jsonParams.contacts.address}{" "}
                {order.jsonParams.contacts.name} {order.jsonParams.contacts.phone}
                <a href={"https://vk.com/id" + order.user}>
                  {"https://vk.com/id" + order.user}
                </a>
              </InfoRow>
            }
            <Select
              top="Статус"
              defaultValue={order.status}
              onChange={(e) => changeStatus(order, e.target.value)}
            >
              <option value={"Оплачен"}>Оплачен</option>
              <option value={"Отправлен"}>Отправлен</option>
              <option value={"Отменен"}>Отменен</option>
            </Select>
            <Div>
              <Button size="m" stretched mode="outline" onClick={()=>changeOrder(order)}>
                Сохранить
              </Button>
            </Div>
          </Div>
        </Card>
      ))}
    </CardGrid>
  );
};
export default OrdersList;
