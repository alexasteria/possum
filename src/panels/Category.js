import React, { useState, useEffect } from "react";
import {
  Header,
  Placeholder,
  Panel,
  PanelHeader,
  Card,
  CardGrid,
  PanelHeaderBack,
  Button,
  MiniInfoCell,
  Caption,
  Subhead,
  Div,
  Link,
  Group,
  Footer,
  Spinner,
  HorizontalScroll,
  Tabs,
  TabsItem,
} from "@vkontakte/vkui";
import "./Home.css";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import Icon24Phone from "@vkontakte/icons/dist/24/phone";
import Icon24LogoVk from "@vkontakte/icons/dist/24/logo_vk";
import Icon24Linked from "@vkontakte/icons/dist/24/linked";
import CartLine from "./components/CartLine";
import mess from "./mess.png";

const Category = ({
  id,
  go,
  order,
  targetCategory,
  setActiveItem,
  activeSubcat,
  setArrItems,
  arrItems,
  onIncrementPosition,
}) => {
  const [isLoad, setIsLoad] = useState(<Spinner />);
  const [filters, setFilters] = useState([]);
  const [activeCat, setActiveCat] = useState("");

  useEffect(() => {
    isLoad === false && setIsLoad(<Spinner />);
    fetch("https://saharnypossum.herokuapp.com/items/getVkItems", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({
        cat: targetCategory.bdName,
        subcat: activeSubcat !== null ? activeSubcat : "",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setArrItems(res.items);
        setFilters(res.filter);
        setIsLoad(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go("home")} />} />
      {order !== null && <CartLine go={go} order={order} />}
      <Placeholder
        icon={
          <div
            style={{
              marginTop: 50,
              background: "url(" + targetCategory.icon + ") no-repeat",
              height: 50,
              width: 50,
            }}
          />
        }
      >
        Выбрана категория: {targetCategory.title}
      </Placeholder>
      <Div>
        {isLoad ? (
          isLoad
        ) : (
          <>
            <HorizontalScroll>
              <Tabs>
                {filters.map((item) =>
                  item !== null ? (
                    <TabsItem
                      selected={activeCat === item}
                      onClick={() =>
                        activeCat !== item
                          ? setActiveCat(item)
                          : setActiveCat("")
                      }
                    >
                      {item}
                    </TabsItem>
                  ) : null
                )}
              </Tabs>
            </HorizontalScroll>
            <CardGrid style={{ marginTop: 10 }}>
              {arrItems
                .filter((item) =>
                  activeCat !== "" ? item.category === activeCat : item
                )
                .map((item) => {
                  return (
                    <Card
                      key={item.id}
                      style={{
                        padding: 2,
                        borderRadius: 13,
                        margin: 0,
                        backgroundColor: "#007151",
                      }}
                      size="m"
                      mode="shadow"
                    >
                      <div
                        onClick={() => {
                          setActiveItem(item);
                          go("aboutItem");
                        }}
                        style={{
                          height: 150,
                          backgroundImage: "url(" + item.thumb_photo + ")",
                          backgroundSize: "cover",
                          backgroundPosition: "center 35%",
                          backgroundRepeat: "no-repeat",
                          borderRadius: 13,
                        }}
                      />
                      <MiniInfoCell textWrap={"short"}>
                        <Caption style={{ minHeight: 48 }} level={1}>
                          {item.title}
                        </Caption>
                      </MiniInfoCell>
                      {item.varPrice.map((item, index) => (
                        index === 0 &&
                        <MiniInfoCell

                            before={<Subhead>От </Subhead>}
                            after={<Subhead>руб.</Subhead>}
                        >
                          <Subhead>{item.price}</Subhead>
                        </MiniInfoCell>
                      ))}
                      <MiniInfoCell>
                        <Button
                          onClick={() => onIncrementPosition(item)}
                          size="m"
                          stretched
                          mode="outline"
                        >
                          В корзину
                        </Button>
                      </MiniInfoCell>
                    </Card>
                  );
                })}
            </CardGrid>
          </>
        )}
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
    </Panel>
  );
};

export default Category;
