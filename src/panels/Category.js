import React from "react";
import {
  Header,
  Placeholder,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  MiniInfoCell,
  Div,
  Link,
  Group,
  Footer,
} from "@vkontakte/vkui";
import "./Home.css";
import Icon24Phone from "@vkontakte/icons/dist/24/phone";
import Icon24LogoVk from "@vkontakte/icons/dist/24/logo_vk";
import Icon24Linked from "@vkontakte/icons/dist/24/linked";
import CartLine from "./components/CartLine";
import mess from "./mess.png";
import { useCart } from "../hooks/use_cart";
import { getImg } from "./Home";
import { useSelector } from "react-redux";
import ProductsList from "./components/components/products_list";

const Category = ({ id, go, setActiveItem }) => {
  const { order, snackbar } = useCart();
  const targetCat = useSelector((state) => state.targetCategory);
  if (!targetCat) return null;
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go("home")} />} />
      {order !== null && <CartLine go={go} order={order} />}
      <Placeholder
        icon={
          <div
            style={{
              marginTop: 50,
              background: "url(" + getImg(targetCat.id) + ") no-repeat",
              height: 50,
              width: 50,
            }}
          />
        }
      >
        Выбрана категория: {targetCat.name}
      </Placeholder>
      <Div>
        <ProductsList setActiveItem={setActiveItem} go={go} />
      </Div>
      <Group header={<Header mode="secondary">Есть вопросы?</Header>}>
        <MiniInfoCell
          after={<img width={40} height={22} src={mess} alt="Viber/WhatsApp" />}
          before={<Icon24Phone height={20} width={20} />}
        >
          <Link href="tel:+79022954808" target="_blank">
            +7 (902) 294-48-08
          </Link>
        </MiniInfoCell>
        <MiniInfoCell before={<Icon24LogoVk height={20} width={20} />}>
          <Link href="https://vk.com/zoomagasin" target="_blank">
            vk.com/zoomagasin
          </Link>
        </MiniInfoCell>
        <MiniInfoCell before={<Icon24Linked height={20} width={20} />}>
          <Link href="https://zoomagasin.ru/" target="_blank">
            zoomagasin.ru
          </Link>
        </MiniInfoCell>
        <Footer />
      </Group>
      {snackbar}
    </Panel>
  );
};

export default Category;
