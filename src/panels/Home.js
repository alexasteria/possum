import React from 'react';
import bridge from "@vkontakte/vk-bridge";
import {
	Header,
	Link,
	Banner,
	Panel,
	PanelHeader,
	Group,
	Div,
	MiniInfoCell,
	Footer, Button
} from "@vkontakte/vkui";
import './Home.css'
import CartLine from './components/CartLine'
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';
import Icon24Phone from '@vkontakte/icons/dist/24/phone';
import Icon24LogoVk from '@vkontakte/icons/dist/24/logo_vk';
import Icon24Linked from '@vkontakte/icons/dist/24/linked';
import mess from "./mess.png"
import {useCart} from "../hooks/use_cart";
const addToCommunity = async() => {
    await bridge
        .send("VKWebAppAddToCommunity", {})
        .then((data) => console.log(data));
}

const Home = ({ id, go, fetchedUser, setTargetCategory }) => {
    const {order} = useCart();
	return (
    <Panel id={id}>
      <PanelHeader>
        <div className={"possumHeader"} />
      </PanelHeader>
      {order !== null && <CartLine go={go} order={order} />}
      <Group
        style={{ paddingTop: 45 }}
        header={<Header mode="secondary">Почему мы?</Header>}
      >
        <Div>
          <MiniInfoCell before={<Icon16Chevron />}>
            У нас работают специалисты
          </MiniInfoCell>
          <MiniInfoCell textLevel={"primary"} before={<Icon16Chevron />}>
            Более 5 лет успешной работы
          </MiniInfoCell>
          <MiniInfoCell textLevel={"primary"} before={<Icon16Chevron />}>
            Более 1 000 покупателей
          </MiniInfoCell>
          <MiniInfoCell textLevel={"primary"} before={<Icon16Chevron />}>
            Входим в ассоциации врачей
          </MiniInfoCell>
          <MiniInfoCell textLevel={"primary"} before={<Icon16Chevron />}>
            Собственное производство
          </MiniInfoCell>
          <MiniInfoCell textLevel={"primary"} before={<Icon16Chevron />}>
            Контроль качеств
          </MiniInfoCell>
        </Div>
      </Group>
      <Group header={<Header mode="secondary">Категории товаров</Header>}>
        <Banner
          id={1}
          onClick={(e) => {
            setTargetCategory({
              id: 1,
              title: "Ежи",
              icon: "https://zoomagasin.ru/images/im-ej-logo.png",
              bdName: "Ежи",
              subcat: [
                "Витамины и лакомства для ежей",
                "Корма для ежей",
                "Средства ухода и аксессуары",
              ],
            });
            go("category");
          }}
          mode="image"
          header="Ежи"
          asideMode={"expand"}
          subheader={
            "Все для ухода и содержания ежей. Профессиональные корма, лакомства, витамины и многое другое известных фирм ExoticMenu,  ExoticNutritio, Spike's World,  Hedgehogs and Friends и другие"
          }
          background={
            <div
              style={{
                backgroundColor: "#198662",
                backgroundImage:
                  "url(https://zoomagasin.ru/images/im-ej-logo.png)",
                backgroundPosition: "right bottom",
                backgroundSize: 50,
                backgroundRepeat: "no-repeat",
              }}
            />
          }
        />
        <Banner
          id={2}
          onClick={(e) => {
            setTargetCategory({
              id: 2,
              title: "Рептилии",
              icon: "https://zoomagasin.ru/images/im-rept-logo.png",
              bdName: "Рептилии",
              subcat: [
                "Витамины и добавки",
                "Диеты",
                "Средства ухода, аксессуары, прочее",
              ],
            });
            go("category");
          }}
          mode="image"
          header="Рептилии"
          asideMode={"expand"}
          subheader={
            "Все для ухода и содержания рептилий и амфибий. Профессиональные корма и диеты, лакомства, витамины и многое другое известных фирм ExoticMenu, Repashy, Nekton, Zoomed и другие"
          }
          background={
            <div
              style={{
                backgroundColor: "#198662",
                backgroundImage:
                  "url(https://zoomagasin.ru/images/im-rept-logo.png)",
                backgroundPosition: "right bottom",
                backgroundSize: 50,
                backgroundRepeat: "no-repeat",
              }}
            />
          }
        />
        <Banner
          id={3}
          onClick={(e) => {
            setTargetCategory({
              id: 3,
              title: "Насекомые",
              icon: "https://zoomagasin.ru/images/im-nasek-logo.png",
              bdName: "Насекомые",
              subcat: [
                "Консервы из насекомых",
                "Корма и добавки для живых насекомых",
                "Наборы и смеси из насекомых",
                "Сублимированные насекомые",
              ],
            });
            go("category");
          }}
          mode="image"
          header="Насекомые"
          asideMode={"expand"}
          subheader={
            "Консервированные, сушеные и сублимированные насекомые, полноценные готовые к употреблению без консервантов. А так же корма и добавки для живых насекомых известных фирм производителей  ExoticMenu, Repashy, Nekton, Zoomed и другие"
          }
          background={
            <div
              style={{
                backgroundColor: "#198662",
                backgroundImage:
                  "url(https://zoomagasin.ru/images/im-nasek-logo.png)",
                backgroundPosition: "right bottom",
                backgroundSize: 50,
                backgroundRepeat: "no-repeat",
              }}
            />
          }
        />
        <Banner
          id={4}
          onClick={(e) => {
            setTargetCategory({
              id: 4,
              title: "Сахарный поссум",
              icon: "https://zoomagasin.ru/images/im-possum-logo.png",
              bdName: "Сахарный поссум",
              subcat: [
                "Витамины и лакомства",
                "Корма",
                "Средства ухода, аксессуары",
              ],
            });
            go("category");
          }}
          mode="image"
          header="Сахарный поссум"
          asideMode={"expand"}
          subheader={
            "Все для ухода и содержания сахарных поссумов. Профессиональные корма, лакомства, витамины и многое другое известных фирм ExoticMenu,  ExoticNutritio, Nekton и другие"
          }
          background={
            <div
              style={{
                backgroundColor: "#198662",
                backgroundImage:
                  "url(https://zoomagasin.ru/images/im-possum-logo.png)",
                backgroundPosition: "right bottom",
                backgroundSize: 50,
                backgroundRepeat: "no-repeat",
              }}
            />
          }
        />
        <Banner
          id={5}
          onClick={(e) => {
            setTargetCategory({
              id: 5,
              title: "Другие животные",
              icon: "https://zoomagasin.ru/images/im-drug-logo.png",
              bdName: "Другие животные, птицы, рыбки",
              subcat: [
                "Насекомоядные, листоядные, приматы",
                "Прочие",
                "Птицы",
                "Рыбки и крабы",
              ],
            });
            go("category");
          }}
          mode="image"
          header="Другие животные"
          asideMode={"expand"}
          subheader={
            "Все для ухода и содержания насекомоядных животных, рыбок, различных птиц, лемуров, обезьянок и других. Профессиональные корма, лакомства, витамины и многое другое известных фирм ExoticMenu,  ExoticNutritio, Repashy, Nekton и другие"
          }
          background={
            <div
              style={{
                backgroundColor: "#198662",
                backgroundImage:
                  "url(https://zoomagasin.ru/images/im-drug-logo.png)",
                backgroundPosition: "right bottom",
                backgroundSize: 50,
                backgroundRepeat: "no-repeat",
              }}
            />
          }
        />
      </Group>
      <Group header={<Header mode="secondary">Есть вопросы?</Header>}>
        <MiniInfoCell
          after={<img width={40} height={22} src={mess} alt="Viber/WhatsApp" />}
          before={<Icon24Phone fill={'#FFF'} height={20} width={20} />}
        >
          <Link href="tel:+79022954808" target="_blank">
            +7 (902) 294-48-08
          </Link>
        </MiniInfoCell>
        <MiniInfoCell before={<Icon24LogoVk fill={'#FFF'} height={20} width={20} />}>
          <Link href="https://vk.com/zoomagasin" target="_blank">
            vk.com/zoomagasin
          </Link>
        </MiniInfoCell>
        <MiniInfoCell before={<Icon24Linked fill={'#FFF'} height={20} width={20} />}>
          <Link href="https://zoomagasin.ru/" target="_blank">
            zoomagasin.ru
          </Link>
        </MiniInfoCell>
          <Banner
              header="Установите в Ваше сообщество"
              subheader="Если Вы являетесь владельцем сообщества с тематикой, схожей с тематикой нашего магазина - добавьте 'Сахарный поссум' в приложения Вашего сообщества или группы."
              actions={
                  <Button onClick={addToCommunity}>
                      Установить в сообщество
                  </Button>
              }
          />
        <Footer />
      </Group>
    </Panel>
  );
}

export default Home;
