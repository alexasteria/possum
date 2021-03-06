import { Caption, Cell, FixedLayout } from "@vkontakte/vkui";
import Icon20WorkOutline from "@vkontakte/icons/dist/20/work_outline";
import React from "react";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import "../Home.css";

const CartLine = ({ go, order }) => {
  return (
    <FixedLayout vertical={"top"}>
      <Cell
        onClick={() => go("cart")}
        className="cellCart"
        description={
          <span style={{ color: "#FFF" }}>Информация о заказах</span>
        }
        before={
          <span style={{ paddingRight: 4, color: "antiquewhite" }}>
            <Icon20WorkOutline
              width={30}
              height={30}
              style={{ float: "left", padding: 2 }}
            />
          </span>
        }
        indicator={
          <span style={{ color: "aliceblue" }}>
            <Icon24MoneyCircle
              style={{ float: "right", padding: 2 }}
              height={20}
              width={20}
            />
            {order.meta ? order.meta.sum : 0}
          </span>
        }
      >
        <Caption style={{ color: "antiquewhite" }}>
          Оформить заказ: товаров - {order.meta ? order.meta.count : 0}
        </Caption>
      </Cell>
    </FixedLayout>
  );
};

export default CartLine;
