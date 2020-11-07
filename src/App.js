import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import View from "@vkontakte/vkui/dist/components/View/View";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import Category from "./panels/Category";
import AboutItem from "./panels/AboutItem";
import Cart from "./panels/Cart";
import GetPvzList from "./panels/components/GetPvzList";
import { ConfigProvider, Snackbar } from "@vkontakte/vkui";
import GetCityList from "./panels/components/GetCityList";
import GetClientAdress from "./panels/components/GetClientAdress";
import AllOrderds from "./panels/allOrders";

const App = ({ linkParams, params }) => {
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(null); //<ScreenSpinner size='large' />
  const [targetCategory, setTargetCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeSubcat, setActiveSubcat] = useState(null);
  const [arrItems, setArrItems] = useState([]);
  const [filtredArrItem, setFiltredArrItem] = useState(null);
  const [history, setHistory] = useState(["home"]);
  const [activeCity, setActiveCity] = useState(null); //город доставки
  const [activePVZ, setActivePVZ] = useState(null); //PVZ доставки
  const [typeDelivery, setTypeDelivery] = useState(null); //тип доставки
  const [snackbar, setSnackbar] = useState(null);
  if (linkParams.success) console.log(linkParams);

  //const [ orderStatuses, setOrderStatuses ] = useState(JSON.parse((localStorage.getItem('orderStatuses') || 'null')) || {});
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("orders") || "null") || {}
  );
  const [orders_success, setOrders_success] = useState(
    JSON.parse(localStorage.getItem("orders_success") || "null") || null
  );
  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);

      setPopout(null);
    }
    fetchData();
    window.onpopstate = () => {
      goBack();
    };
  }, []);

  const changeCount = async (item, index) => {
    const updatedOrder = { ...order };
    await updatedOrder[item.id].item.varPrice.map((productVar, i) => {
      if (i !== index) {
        productVar.active = false;
        return productVar;
      } else {
        productVar.active = true;
        return productVar;
      }
    });
    const maxAvailable = updatedOrder[item.id].item.varPrice.filter(item=>item.active === true)[0].available;
    if (updatedOrder[item.id].count > maxAvailable){
      updatedOrder[item.id].count = maxAvailable;
    }
    let count = 0;
    let sum = 0;
    let weight = 0;
    for (let key in updatedOrder) {
      if (key !== "meta") {
        count = count + updatedOrder[key].count;
        updatedOrder[key].item.varPrice.map((productVar) => {
          if (productVar.active)
            sum = sum + updatedOrder[key].count * productVar.price;
        });
        weight = weight + updatedOrder[key].count * 0.7;
      }
    }

    updatedOrder.meta = { count: count, sum: sum, weight: weight };
    const serialized = JSON.stringify(updatedOrder);
    localStorage.setItem("orders", serialized);
    setOrder(updatedOrder);
  };

  const onDecrementPosition = (item) => {
    console.log("onDecrementPosition");
    const updatedOrder = { ...order };
    if (item.id in updatedOrder) {
      if (updatedOrder[item.id].count === 1) {
        delete updatedOrder[item.id];
      } else {
        updatedOrder[item.id].count--;
      }
    }

    let count = 0;
    let sum = 0;
    let weight = 0;
    for (let key in updatedOrder) {
      if (key !== "meta") {
        count = count + updatedOrder[key].count;
        updatedOrder[key].item.varPrice.map((productVar) => {
          if (productVar.active)
            sum = sum + updatedOrder[key].count * productVar.price;
        });
        weight = weight + updatedOrder[key].count * 0.7;
      }
    }

    updatedOrder.meta = { count: count, sum: sum, weight: weight };

    const serialized = JSON.stringify(updatedOrder);
    localStorage.setItem("orders", serialized);
    setOrder(updatedOrder);
  };

  const onIncrementPosition = (item) => {
    try {
      console.log("onIncrementPosition");
      const updatedOrder = { ...order };

      if (item.id in updatedOrder) {
        const maxAvailable = updatedOrder[item.id].item.varPrice.filter(item=>item.active === true)[0].available;
        if (updatedOrder[item.id].count >= maxAvailable)
          throw `Нельзя заказать больше ${
              maxAvailable
          } штук(и) данного товара`;
        updatedOrder[item.id].count++;
      } else {
        const maxAvailable = item.varPrice.filter(item=>item.active === true)[0].available;
        if (maxAvailable === 0)
          throw `К сожалению, сейчас в наличии нет данного товара`;
        updatedOrder[item.id] = {
          item: item,
          count: 1,
        };
      }

      let count = 0;
      let sum = 0;
      let weight = 0;
      for (let key in updatedOrder) {
        if (key !== "meta") {
          count = count + updatedOrder[key].count;
          updatedOrder[key].item.varPrice.map((productVar) => {
            if (productVar.active)
              sum = sum + updatedOrder[key].count * productVar.price;
          });
          weight = weight + updatedOrder[item.id].count * 0.7;
        }
      }
      updatedOrder.meta = { count: count, sum: sum, weight: weight };

      const serialized = JSON.stringify(updatedOrder);
      localStorage.setItem("orders", serialized);
      setOrder(updatedOrder);
    } catch (e) {
      setSnackbar(
        <Snackbar layout="vertical" onClose={() => setSnackbar(null)}>
          {e}
        </Snackbar>
      );
    }
  };

  const onDeletePosition = (item) => {
    const updatedOrder = { ...order };
    delete updatedOrder[item.id];

    let count = 0;
    let sum = 0;
    let weight = 0;
    for (let key in updatedOrder) {
      if (key !== "meta") {
        count = count + updatedOrder[key].count;
        updatedOrder[key].item.varPrice.map((productVar) => {
          if (productVar.active)
            sum = sum + updatedOrder[key].count * productVar.price;
        });
        weight = weight + updatedOrder[key].count * 0.7;
      }
    }
    updatedOrder.meta = { count: count, sum: sum, weight: weight };

    const serialized = JSON.stringify(updatedOrder);
    localStorage.setItem("orders", serialized);
    setOrder(updatedOrder);
  };

  const clearCart = () => {
    localStorage.setItem("orders", JSON.stringify({}));
    const updatedOrder = {};
    setActiveCity(null);
    setOrder(updatedOrder);
  };

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
          order={order}
          fetchedUser={fetchedUser}
          go={go}
          setTargetCategory={setTargetCategory}
        />
        <Category
          id="category"
          onSwipeBack={() => goBack()}
          order={order}
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
          onIncrementPosition={onIncrementPosition}
          onDecrementPosition={onDecrementPosition}
        />
        <AboutItem
          id="aboutItem"
          onSwipeBack={() => goBack()}
          order={order}
          fetchedUser={fetchedUser}
          go={go}
          targetCategory={targetCategory}
          activeItem={activeItem}
          onIncrementPosition={onIncrementPosition}
          onDecrementPosition={onDecrementPosition}
        />
        <Cart
          id={"cart"}
          go={go}
          fetchedUser={fetchedUser}
          onSwipeBack={() => goBack()}
          order={order}
          onIncrementPosition={onIncrementPosition}
          onDecrementPosition={onDecrementPosition}
          onDeletePosition={onDeletePosition}
          clearCart={clearCart}
          setPopout={setPopout}
          activeCity={activeCity}
          activePVZ={activePVZ}
          setActivePVZ={setActivePVZ}
          typeDelivery={typeDelivery}
          setTypeDelivery={setTypeDelivery}
          goBack={goBack}
          changeCount={changeCount}
          orders_success={orders_success}
          setOrders_success={setOrders_success}
          params={params}
        />
        <GetCityList
          id={"GetCityList"}
          go={go}
          setItem={(item) => {
            setActiveCity(item);
            goBack();
          }}
          setPopout={setPopout}
          goBack={goBack}
        />
        <GetPvzList
          id={"GetPvzList"}
          go={go}
          activeCity={activeCity}
          setItem={(item) => {
            setActivePVZ(item);
            goBack();
          }}
          setPopout={setPopout}
          goBack={goBack}
        />
        <GetClientAdress id={"GetClientAdress"} />
        <AllOrderds id={"AllOrders"} params={params} goBack={goBack} setSnackbar={setSnackbar}/>
      </View>
      {snackbar}
    </ConfigProvider>
  );
};

export default App;
