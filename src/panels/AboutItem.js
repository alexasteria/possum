import React from "react";
import {
  Header,
  Panel,
  PanelHeader,
  Card,
  CardGrid,
  PanelHeaderBack,
  Button,
  MiniInfoCell,
  Div,
  Title,
  Group,
  Footer, Subhead,
} from "@vkontakte/vkui";
import "./Home.css";

import CartLine from "./components/CartLine";
import {useCart} from "../hooks/use_cart";

const AboutItem = ({ id, go, activeItem }) => {
  const {order, onIncrementPosition, snackbar} = useCart();
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go("category")} />} />
      {activeItem !== null && (
        <React.Fragment>
          {order !== null && <CartLine go={go} order={order} />}
          <Group
            style={{ paddingTop: 40 }}
            header={<Header mode="secondary">Информация о товаре</Header>}
          >
            <img style={{width: "100%"}} src={activeItem.thumb_photo} alt="Фото товара"/>
          </Group>
          <Div>
            <CardGrid>
              <Card size="l">
                <MiniInfoCell textWrap={"full"}>
                  <Title
                    level="1"
                    weight="semibold"
                    style={{ marginBottom: 16 }}
                  >
                    {activeItem.title}
                  </Title>
                </MiniInfoCell>
                {activeItem.varPrice.map(item =>{
                  return item.available > 0 && (
                      <MiniInfoCell

                          before={<Subhead>{item.count}{item.countLabel === "Вес" && "гр"}{item.countLabel === "Размер" && "см"}{item.countLabel === "Объем" && "мл"}</Subhead>}
                          after={<Subhead>руб.</Subhead>}
                      >
                        <Subhead>{item.price}</Subhead>
                      </MiniInfoCell>
                  )
                })}
                <MiniInfoCell><Subhead>Добавьте в корзину для выбора</Subhead></MiniInfoCell>
                <Button
                    size="xl"
                    onClick={() => onIncrementPosition(activeItem)}
                    mode={"outline"}
                >
                  Добавить в корзину
                </Button>
              </Card>
              <Card size="l">
                <Div
                  style={{
                    backgroundColor: "#03825e",
                    borderRadius: 10,
                    color: "antiquewhite",
                  }}
                >
                  {activeItem.description}
                </Div>
              </Card>
            </CardGrid>
          </Div>
        </React.Fragment>
      )}
      <Footer />
      {snackbar}
    </Panel>
  );
};

export default AboutItem;
