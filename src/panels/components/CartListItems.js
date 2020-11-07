import React from "react";
import { Avatar, Button, Separator, Banner } from "@vkontakte/vkui";

const CartListItems = ({
  order,
  onDeletePosition,
  onDecrementPosition,
  onIncrementPosition,
  changeCount,
}) => {
  let arr = [];
  for (let key in order) {
    if (key !== "meta") {
      arr.push(
        <React.Fragment key={key}>
          <Banner
            before={
              <Avatar
                size={96}
                mode="image"
                src={order[key].item.thumb_photo}
              />
            }
            header={order[key].item.title}
            subheader={`Цена: ${
              order[key].item.varPrice.find(
                (productVar) => productVar.active === true
              ).price
            } руб.`}
            asideMode="dismiss"
            actions={
              <>
                <div style={{ display: "flex" }}>
                  <span>{order[key].item.varPrice[0].countLabel}: </span>
                  {order[key].item.varPrice.map((item, index) => {
                    return item.available > 0 && (
                      <button
                        onClick={() => changeCount(order[key].item, index)}
                        style={{
                          color: item.active === true && "#41ca41",
                          float: "left",
                          margin: "auto",
                        }}
                      >
                        {item.count}
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: "flex" }}>
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
