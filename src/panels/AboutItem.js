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
  Footer,
} from "@vkontakte/vkui";
import "./Home.css";

import CartLine from "./components/CartLine";
import { useCart } from "../hooks/use_cart";
import { getElements } from "./components/components/products_list";

const AboutItem = ({ id, go, activeItem }) => {
  const { order, onIncrementPosition, snackbar } = useCart();
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go("category")} />} />
      {activeItem !== null && (
        <React.Fragment>
          {order !== null && <CartLine go={go} order={order} />}
          <Group
            style={{ paddingTop: 50 }}
            header={<Header mode="secondary">Информация о товаре</Header>}
          >
            {
              activeItem.image_url &&
              <img
                  style={{ width: "100%" }}
                  src={activeItem.image_url}
                  alt="Фото товара"
              />
            }
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
                    {activeItem.name}
                  </Title>
                </MiniInfoCell>
                {getElements(activeItem.elements)}
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
                  {activeItem.detail}
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
