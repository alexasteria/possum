import React, { useState } from "react";
import { Snackbar } from "@vkontakte/vkui";

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
        updatedOrder[key].item.varPrice.map((productVar) => {
          if (productVar.active)
            sum = sum + updatedOrder[key].count * productVar.price;
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
  const onIncrementPosition = (item) => {
    try {
      console.log("onIncrementPosition");
      const updatedOrder = { ...order };
      if (!isAvailable(item))
        throw `К сожалению, сейчас в наличии нет данного товара`;
      let act = 0;
      item.varPrice.map(price => {
        if (price.available > 0) {
          if (act === 0) {
            price.active = true;
            act++;
          } else {
            price.active = false;
          }
        } else {
          price.active = false;
        }
        return price;
      });
      if (item.id in updatedOrder) {
        const maxAvailable = updatedOrder[item.id].item.varPrice.filter(
          (item) => item.active === true
        )[0].available;
        if (updatedOrder[item.id].count >= maxAvailable)
          throw `Нельзя заказать больше ${maxAvailable} штук(и) данного товара`;
        updatedOrder[item.id].count++;
      } else {
        const maxAvailable = item.varPrice.filter(
          (item) => item.active === true
        )[0].available;
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
          updatedOrder[key].item.varPrice.map((productVar) => {
            if (productVar.active)
              sum = sum + updatedOrder[key].count * productVar.price;
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
        updatedOrder[key].item.varPrice.map((productVar) => {
          if (productVar.active)
            sum = sum + updatedOrder[key].count * productVar.price;
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
    await updatedOrder[item.id].item.varPrice.map((productVar, i) => {
      if (i !== index) {
        productVar.active = false;
        return productVar;
      } else {
        productVar.active = true;
        return productVar;
      }
    });
    const maxAvailable = updatedOrder[item.id].item.varPrice.filter(
      (item) => item.active === true
    )[0].available;
    if (updatedOrder[item.id].count > maxAvailable) {
      updatedOrder[item.id].count = maxAvailable;
    }
    let count = 0;
    let sum = 0;
    let weight = 0;
    for (let key in updatedOrder) {
      if (key !== "meta") {
        count = count + updatedOrder[key].count;
        updatedOrder[key].item.varPrice.map((productVar) => {
          if (productVar.active)
            sum = sum + updatedOrder[key].count * productVar.price;
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
    message
  };
};
export { useCart };
