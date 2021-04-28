import React, { useState } from "react";
import { Snackbar } from "@vkontakte/vkui";
import {useGetProducts} from "../panels/components/use_get_products";
import {getStaticPrice} from "../panels/components/components/products_list";

const useCart = () => {
  const [snackbar, setSnackbar] = useState(null);
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("orders") || "null") || {}
  );
  const message = (value) => {
    setSnackbar(
      <Snackbar layout="vertical" onClose={() => setSnackbar(null)}>
        {value}
      </Snackbar>
    );
  };
  const clearCart = () => {
    localStorage.setItem("orders", JSON.stringify({}));
    const updatedOrder = {};
    setOrder(updatedOrder);
  };
  const onDecrementPosition = (item) => {
    console.log("onDecrementPosition");
    const updatedOrder = { ...order };
    if (item.id in updatedOrder) {
      if (updatedOrder[item.id].count === 1) {
        delete updatedOrder[item.id];
      } else {
        updatedOrder[item.id].count--;
      }
    }
    let count = 0;
    let sum = 0;
    let weight = 0;
    for (let key in updatedOrder) {
      if (key !== "meta") {
        count = count + updatedOrder[key].count;
        updatedOrder[key].item.elements.map((el) => {
          if (el.active){
            const price = getStaticPrice(el);
            sum = sum + updatedOrder[key].count * price.price;
          }
        });
        weight = weight + updatedOrder[key].count * 0.7;
      }
    }
    updatedOrder.meta = { count: count, sum: sum, weight: weight };
    const serialized = JSON.stringify(updatedOrder);
    localStorage.setItem("orders", serialized);
    setOrder(updatedOrder);
  };
  const isAvailable = (item) => {
    const available = item.varPrice.filter((item) => item.available > 0);
    return available.length > 0;
  };
  const getMaxAvailable = (item) => {
    const e = item.elements.find((el) => el.active);
    if (!e || e.item === null){
      return item.quantity
    }
    return e.item.quantity
  }
  const onIncrementPosition = (item) => {
    try {
      console.log("onIncrementPosition");
      const updatedOrder = { ...order };
      // if (!isAvailable(item))
      //   throw `К сожалению, сейчас в наличии нет данного товара`;
      if (item.id in updatedOrder) {
        const maxAvailable = getMaxAvailable(item);
        if (updatedOrder[item.id].count >= maxAvailable)
          throw `Нельзя заказать больше ${maxAvailable} штук(и) данного товара`;
        updatedOrder[item.id].count++;
      } else {
        var i = 0;
        //если новый проставляем активности на варианты
        console.log(item)
        item.elements.forEach((el) => {
          if ((el.item === null || (el.item && el.item.available === "Y")) && i === 0){
            el.active = true
            i++
            return;
          }
          el.active = false;
        });
        //определяем границу доступных в этой цене
        const maxAvailable = getMaxAvailable(item);
        if (maxAvailable < 1) throw `Сейчас данный товар недоступен к покупке`;
        updatedOrder[item.id] = {
          item: item,
          count: 1,
        };
      }
      let count = 0;
      let sum = 0;
      let weight = 0;
      for (let key in updatedOrder) {
        if (key !== "meta") {
          count = count + updatedOrder[key].count;
          updatedOrder[key].item.elements.map((el) => {
            if (el.active){
              const price = getStaticPrice(el);
              sum = sum + updatedOrder[key].count * price.price;
            }
          });
          weight = weight + updatedOrder[item.id].count * 0.7;
        }
      }
      updatedOrder.meta = { count: count, sum: sum, weight: weight };
      const serialized = JSON.stringify(updatedOrder);
      localStorage.setItem("orders", serialized);
      setOrder(updatedOrder);
    } catch (e) {
      message(e);
    }
  };
  const onDeletePosition = (item) => {
    const updatedOrder = { ...order };
    delete updatedOrder[item.id];

    let count = 0;
    let sum = 0;
    let weight = 0;
    for (let key in updatedOrder) {
      if (key !== "meta") {
        count = count + updatedOrder[key].count;
        updatedOrder[key].item.elements.map((el) => {
          if (el.active){
            const price = getStaticPrice(el);
            sum = sum + updatedOrder[key].count * price.price;
          }
        });
        weight = weight + updatedOrder[key].count * 0.7;
      }
    }
    updatedOrder.meta = { count: count, sum: sum, weight: weight };

    const serialized = JSON.stringify(updatedOrder);
    localStorage.setItem("orders", serialized);
    setOrder(updatedOrder);
  };
  const changeCount = async (item, index) => {
    const updatedOrder = { ...order };
    await updatedOrder[item.id].item.elements.map((el, i) => {
      el.active = i === index;
    });
    const maxAvailable = getMaxAvailable(item);
    if (updatedOrder[item.id].count > maxAvailable) {
      updatedOrder[item.id].count = maxAvailable;
    }
    let count = 0;
    let sum = 0;
    let weight = 0;
    for (let key in updatedOrder) {
      if (key !== "meta") {
        count = count + updatedOrder[key].count;
        updatedOrder[key].item.elements.map((el) => {
          if (el.active){
            const price = getStaticPrice(el);
            sum = sum + updatedOrder[key].count * price.price;
          }
        });
        weight = weight + updatedOrder[key].count * 0.7;
      }
    }
    updatedOrder.meta = { count: count, sum: sum, weight: weight };
    const serialized = JSON.stringify(updatedOrder);
    localStorage.setItem("orders", serialized);
    setOrder(updatedOrder);
  };
  return {
    order,
    clearCart,
    setOrder,
    onDecrementPosition,
    onIncrementPosition,
    onDeletePosition,
    changeCount,
    snackbar,
    message,
  };
};
export { useCart };
