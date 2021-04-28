import React from "react";
import {
  Button,
  Caption,
  Card,
  CardGrid,
  HorizontalScroll,
  MiniInfoCell,
  Spinner,
  Tabs,
  TabsItem,
  Title,
} from "@vkontakte/vkui";
import { useGetProducts } from "../use_get_products";
import { useCart } from "../../../hooks/use_cart";
export const props = {
  31: { title: "Цвет" },
  35: { title: "Вес", m: "гр" },
  42: { title: "Вкус" },
  43: { title: "Диаметр", m: "см" },
};

export const getStaticPrice = (element) => {
  const count = 4;
  const price = element.prices.items.find(p=>p.quantity_from === null);
  if (price.discount_price){
    return {price: price.discount_price, sale: `Скидка ${price.discount_value_percents}%`}
  }
  return {price: price.price, sale: null}
}

export const getElements = (elements) => {
  if (elements.length === 1) {
    const price = getStaticPrice(elements[0])
    return (
      <MiniInfoCell
        after={`${price.price} руб ${price.sale ? price.sale : ""}`}
        style={{ color: "#FFF" }}
      >
        Цена
      </MiniInfoCell>
    );
  }
  return elements.map((item) => {
    return item.properties.map((p) => {
      if (props[p.property_id]) {
        const price = getStaticPrice(item)
        if (item.item && item.item.available !== "N" && p.value !== null) return (
          <MiniInfoCell
            before={props[p.property_id].title}
            after={`${price.price} руб ${price.sale ? price.sale : ""}`}
            style={{ color: "#FFF" }}
          >
            {p.value}
          </MiniInfoCell>
        );
      }
    });
  });
};

const ProductsList = ({ setActiveItem, go }) => {
  const {
    products,
    categories,
    targetCat,
    changeFilter,
    fil,
  } = useGetProducts();
  if (!products || !categories || !targetCat) return <Spinner />;
  return (
    <>
      <HorizontalScroll>
        <Tabs>
          {categories.map((cat) => {
            if (cat.parent_id === targetCat.id)
              return (
                <TabsItem
                  key={cat.id}
                  selected={fil.includes(cat.id)}
                  onClick={() => changeFilter(cat.id)}
                >
                  {cat.name}
                </TabsItem>
              );
            if (cat.id === targetCat.id)
              return (
                <TabsItem
                  key={targetCat.id}
                  selected={fil.includes(cat.id)}
                  onClick={() => changeFilter(cat.id)}
                >
                  {cat.name}
                </TabsItem>
              );
            return null;
          })}
        </Tabs>
      </HorizontalScroll>
      <CardGrid style={{ marginTop: 10 }}>
        {products.map((item) => {
          if (item.available === "N") return;
          return (
            <Card
              key={item.id}
              style={{
                paddingTop: 8,
                borderRadius: 13,
                margin: "0 0 20px 0",
                backgroundColor: "#007151",
                boxShadow:
                  "inset 2px 2px 5px rgb(226 191 157 / 50%), 1px 1px 5px rgb(255 255 255)",
              }}
              size="l"
              mode="shadow"
            >
              <div
                onClick={() => {
                  setActiveItem(item);
                  go("aboutItem");
                }}
                style={{
                  height: 250,
                  backgroundImage: item.image_url ? "url(" + item.image_url + ")" : null,
                  backgroundSize: "contain",
                  backgroundPosition: "center 35%",
                  backgroundRepeat: "no-repeat",
                  borderRadius: 13,
                }}
              />
              <MiniInfoCell textWrap={"full"}>
                <Title level={1}>{item.name}</Title>
              </MiniInfoCell>
              <MiniInfoCell textWrap={"nowrap"}>
                <Caption level={3}>{item.detail}</Caption>
              </MiniInfoCell>
              {getElements(item.elements)}
              <MiniInfoCell>
                <Button
                  onClick={() => {
                    setActiveItem(item);
                    go("aboutItem");
                  }}
                  size="m"
                  stretched
                  mode="outline"
                >
                  Подробнее
                </Button>
              </MiniInfoCell>
            </Card>
          );
        })}
      </CardGrid>
    </>
  );
};
export default ProductsList;
