import React, { Fragment, useState, useRef } from "react";
import {
  Cell,
  Counter,
  Div,
  MiniInfoCell,
  Button,
  Input,
  FormLayout,
  Snackbar,
  Link,
} from "@vkontakte/vkui";
import payImg from "../pay.png";

const Delivery = ({
  deliv,
  sum,
  activePVZ,
  activeCity,
  go,
  typeDelivery,
  order,
  who,
  clearCart,
  setOrders_success,
  fetchedUser,
  params,
}) => {
  const payRef = useRef(null);
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [room, setRoom] = useState("");
  const [phone, setPhone] = useState("");
  const [snackbar, setSnackbar] = useState(null);
  const [payLink, setPayLink] = useState(null);
  const [jsonParams, setJsonParams] = useState(null);
  const [orderNum, setOrderNum] = useState(null);
  const [name, setName] = useState("");
  const genLink = () => {
    const date = Date.now();
    setOrderNum(date);
    setPayLink(null);
    const jsonParams = {};
    const or = {};
    for (let key in order) {
      if (key !== "meta") {
        const vp = order[key].item.varPrice.filter(
          (item) => item.active === true
        );
        or[key] = `${order[key].item.title} (${order[key].item._id})  Штук - ${
          order[key].count
        } Мерность - ${vp && vp[0].count} ${vp && vp[0].countLabel}`;
      }
    }
    jsonParams.order = or;
    jsonParams.info = {
      amount: order.meta.sum,
      count: order.meta.count,
      weight: order.meta.weight,
      typeDelivery: who,
      activePVZ: activePVZ !== null ? activePVZ.name : "Не выбрано",
      orderNum: date,
    };
    jsonParams.contacts = {
      address: `г. ${activeCity.name},ул. ${street},д. ${house},кв. ${room}`,
      phone: phone,
      name: name,
    };
    setJsonParams(jsonParams);
    fetch("https://saharnypossum.herokuapp.com/pay/sber", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({
        amount: Math.round(Number(deliv.price)) + Number(sum),
        orderNumber: date,
        jsonParams: jsonParams.contacts,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error){
          setSnackbar(<Snackbar
              onClose={() => setSnackbar(null)}
          >
            Ошибка получения ссылки на оплату
          </Snackbar>)
        } else {
          setPayLink(String(res));
        }
      })
      .catch((e) => console.log(e));
  };
  const pay = (e) => {
    e.preventDefault();
    try {
      if (who === "sdek") {
        if (!activePVZ) throw "Не выбран пункт доставки";
        if (name === "") throw "Не указаны ФИО получателя посылки";
        if (phone === "") throw "Не указан номер телефона";
        if (activePVZ.name === "Доставить домой") {
          if (street === "") throw "Не указан адрес доставки";
          if (house === "") throw "Не указан адрес доставки";
          if (room === "") throw "Не указан адрес доставки";
          if (phone === "") throw "Не указан номер телефона";
        }
      }
      if (who === "PR") {
        if (name === "") throw "Не указаны ФИО получателя посылки";
        if (street === "") throw "Не указан адрес доставки";
        if (house === "") throw "Не указан адрес доставки";
        if (room === "") throw "Не указан адрес доставки";
        if (phone === "") throw "Не указан номер телефона";
      }
      genLink();
      document.getElementById("payLink").style.display = "block";
    } catch (e) {
      setSnackbar(
        <Snackbar layout="vertical" onClose={() => setSnackbar(null)}>
          {e}
        </Snackbar>
      );
    }
  };
  const payAway = () => {
    const orders_success = {
      sum: Math.round(Number(deliv.price)) + Number(sum),
      user: Number(params.vk_user_id),
      num: orderNum,
      jsonParams: jsonParams,
      params: params,
    };
    clearCart();
    fetch("https://saharnypossum.herokuapp.com/pay/payaway", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(orders_success),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("orders_success", JSON.stringify(res));
        setOrders_success(res);
      });
  };

  if (deliv.error) {
    return (
      <>
        <MiniInfoCell textWrap={"full"}>{deliv.error}</MiniInfoCell>
      </>
    );
  }

  return (
    <Fragment>
      <MiniInfoCell
        style={{ paddingTop: 10 }}
        after={<Counter>{Math.round(Number(deliv.price))} руб.</Counter>}
      >
        Стоимость доставки
      </MiniInfoCell>
      <MiniInfoCell after={deliv.deliveryDateMax}>Доставка до:</MiniInfoCell>
      <MiniInfoCell after={Math.round(Number(deliv.price)) + Number(sum)}>
        Итого к оплате:{" "}
      </MiniInfoCell>
      {typeDelivery === "sdek" && (
        <Cell
          expandable
          indicator={activePVZ !== null ? activePVZ.name : "Не выбрано"}
          onClick={() => go("GetPvzList")}
        >
          Пункт выдачи
        </Cell>
      )}
      {who === "sdek" && (
        <Cell
          expandable
          onClick={() => go("GetPvzList")}
          indicator={activePVZ !== null ? activePVZ.name : "Не выбрано"}
        >
          Место доставки
        </Cell>
      )}
      {who === "sdek" && activePVZ !== null && (
        <FormLayout>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            top={"Получатель (ФИО)"}
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            top={"Телефон"}
          />
          {activePVZ.name === "Доставить домой" && (
            <FormLayout>
              <Input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                top={"Улица"}
              />
              <Input
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                top={"Дом"}
              />
              <Input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                top={"Квартира"}
              />
            </FormLayout>
          )}
        </FormLayout>
      )}
      {who === "PR" && (
        <FormLayout>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            top={"Получатель (ФИО)"}
          />
          <Input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            top={"Улица"}
          />
          <Input
            value={house}
            onChange={(e) => setHouse(e.target.value)}
            top={"Дом"}
          />
          <Input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            top={"Квартира"}
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            top={"Телефон"}
          />
        </FormLayout>
      )}
      <Div>
        <a
            style={{ display: "none" }}
            target="_blank"
            ref={payRef}
            id="payLink"
            href={payLink}
            onClick={payAway}
        >
          {
            payLink &&
            <div
                style={{
                  textAlign: "center",
                  color: "antiquewhite",
                  background: "rgb(0 0 0 / 9%)",
                  borderRadius: 10,
                }}
            >
              Выберите способ оплаты
              <img
                  style={{ width: "100%" }}
                  src={payImg}
                  alt="Перейти к оплате"
              />
            </div>
          }
        </a>
        <Button onClick={pay} mode={"outline"} size={"xl"}>
          {`Оплатить ${Math.round(Number(deliv.price)) + Number(sum)} руб.`}
        </Button>
      </Div>
      {snackbar}
    </Fragment>
  );
};
export default Delivery;
