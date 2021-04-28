import React from "react";
import { Avatar, Button, Separator, Banner } from "@vkontakte/vkui";
import { props } from "./components/products_list";

const CartListItems = ({
  order,
  onDeletePosition,
  onDecrementPosition,
  onIncrementPosition,
  changeCount,
}) => {
  const getPrice = (elements) => {
    const count = 4;
    const e = elements.find((el) => el.active === true);
    const price = e.prices.items.find(p=>p.quantity_from === null);
    if (price.discount_price){
      return {price: price.discount_price, sale: `${price.discount_value_percents}%`}
    }
    return {price: price.price, sale: null}
  }
  let arr = [];
  const getSort = (elements, key) => {
    if (elements.length === 1) return null;
    return elements.map((item, index) => {
      return item.properties.map((p) => {
        if (props[p.property_id]) {
          if (item.item && item.item.available !== "N" && p.value !== null) return (
            <button
              onClick={() => changeCount(order[key].item, index)}
              style={{
                color: item.active && "#41ca41",
                float: "left",
                margin: "auto",
              }}
            >
              {p.value}
            </button>
          );
        }
      });
    });
  };
  for (let key in order) {
    if (key !== "meta") {
      const price = getPrice(order[key].item.elements);
      arr.push(
        <React.Fragment key={key}>
          <Banner
            key={key}
            before={
              <Avatar size={96} mode="image" src={order[key].item.image_url} />
            }
            header={order[key].item.name}
            subheader={`${price.price} руб ${price.sale ? price.sale : ""}`}
            asideMode="dismiss"
            actions={
              <>
                <div style={{ display: "flex" }}>
                  {getSort(order[key].item.elements, key)}
                </div>
                <div style={{ display: "flex", bottom: 0 }}>
                  <Button
                    mode={"overlay_outline"}
                    onClick={() => {
                      onDecrementPosition(order[key].item);
                    }}
                    size={"m"}
                    style={{ float: "left", margin: 5, color: "#482d06" }}
                  >
                    -1
                  </Button>
                  <span
                    style={{ margin: "auto", fontSize: 25, fontWeight: "bold" }}
                  >
                    &nbsp;{key in order ? order[key].count : 0}&nbsp;
                  </span>
                  <Button
                    mode={"overlay_outline"}
                    onClick={() => {
                      onIncrementPosition(order[key].item);
                    }}
                    size={"m"}
                    style={{ float: "left", margin: 5, color: "#482d06" }}
                  >
                    +1
                  </Button>
                </div>
              </>
            }
            onDismiss={() => onDeletePosition(order[key].item)}
          />
          <Separator />
        </React.Fragment>
      );
    }
  }
  return arr;
};
export default CartListItems;
