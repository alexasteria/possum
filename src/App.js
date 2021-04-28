import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import View from "@vkontakte/vkui/dist/components/View/View";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Category from "./panels/Category";
import AboutItem from "./panels/AboutItem";
import Cart from "./panels/Cart";
import GetPvzList from "./panels/components/GetPvzList";
import { ConfigProvider } from "@vkontakte/vkui";
import GetCityList from "./panels/components/GetCityList";
import GetClientAdress from "./panels/components/GetClientAdress";
import AllOrderds from "./panels/allOrders";
import { useCart } from "./hooks/use_cart";
import { useDispatch } from "react-redux";
import { set_cat } from "./store/actions";
import GetOrders from "./panels/get_orders";

const App = ({ linkParams, params }) => {
  const dispatch = useDispatch();
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(null); //<ScreenSpinner size='large' />
  const [targetCategory, setTargetCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeSubcat, setActiveSubcat] = useState(null);
  const [arrItems, setArrItems] = useState([]);
  const [filtredArrItem, setFiltredArrItem] = useState(null);
  const [history, setHistory] = useState(["home"]);
  const [typeDelivery, setTypeDelivery] = useState(null); //тип доставки
  if (linkParams.success) console.log(linkParams);
  const [activeCity, setActiveCity] = useState(null); //город доставки
  const [activePVZ, setActivePVZ] = useState(null); //PVZ доставки
  const { snackbar } = useCart();
  const [orders_success, setOrders_success] = useState(
    JSON.parse(localStorage.getItem("orders_success") || "null") || null
  );
  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    async function getCat() {
      const response = await fetch(
        "https://zoomagasin.ru/api/api.php?route=sections"
      );
      const res = await response.json();
      dispatch(set_cat(res.items));
    }
    fetchData();
    getCat();
    window.onpopstate = () => {
      goBack();
    };
  }, []);

  const go = (panelName) => {
    const hist = [...history];
    hist.push(panelName);
    setHistory(hist);
    setActivePanel(panelName);
  };

  const goBack = () => {
    const hist = [...history];
    if (hist.length === 1) {
      bridge.send("VKWebAppClose", { status: "sucsess" });
    } else {
      hist.pop();
      setHistory(hist);
      setActivePanel(hist[hist.length - 1]);
    }
  };

  return (
    <ConfigProvider>
      <View activePanel={activePanel} popout={popout} history={history}>
        <Home
          onSwipeBack={() => goBack()}
          id="home"
          fetchedUser={fetchedUser}
          go={go}
          setTargetCategory={setTargetCategory}
        />
        <Category
          id="category"
          onSwipeBack={() => goBack()}
          arrItems={arrItems}
          setArrItems={setArrItems}
          filtredArrItem={filtredArrItem}
          setFiltredArrItem={setFiltredArrItem}
          activeSubcat={activeSubcat}
          setActiveSubcat={setActiveSubcat}
          fetchedUser={fetchedUser}
          go={go}
          targetCategory={targetCategory}
          setActiveItem={setActiveItem}
        />
        <AboutItem
          id="aboutItem"
          onSwipeBack={() => goBack()}
          fetchedUser={fetchedUser}
          go={go}
          targetCategory={targetCategory}
          activeItem={activeItem}
        />
        <Cart
          id={"cart"}
          go={go}
          fetchedUser={fetchedUser}
          onSwipeBack={() => goBack()}
          setPopout={setPopout}
          typeDelivery={typeDelivery}
          setTypeDelivery={setTypeDelivery}
          goBack={goBack}
          orders_success={orders_success}
          setOrders_success={setOrders_success}
          params={params}
          activeCity={activeCity}
          activePVZ={activePVZ}
        />
        <GetCityList
          id={"GetCityList"}
          go={go}
          setPopout={setPopout}
          goBack={goBack}
          setActiveCity={setActiveCity}
        />
        <GetPvzList
          id={"GetPvzList"}
          go={go}
          setPopout={setPopout}
          goBack={goBack}
          activeCity={activeCity}
          setActivePVZ={setActivePVZ}
        />
        <GetClientAdress id={"GetClientAdress"} />
        <AllOrderds id={"AllOrders"} params={params} goBack={goBack} />
        <GetOrders go={go} id="get_orders" fetchedUser={fetchedUser}/>
      </View>
      {snackbar}
    </ConfigProvider>
  );
};

export default App;
