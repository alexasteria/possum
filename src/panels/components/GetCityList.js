import React, { useState } from "react";
import {
  Cell,
  Footer,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Input,
  Spinner,
  FormLayout,
  Button,
} from "@vkontakte/vkui";

const GetCityList = ({ id, goBack, setActiveCity }) => {
  const [arrCities, setArrCities] = useState([]); //города для доставки
  const [nameCity, setNameCity] = useState("");
  const [loading, setLoading] = useState(false);
  const setItem = (item) => {
    setActiveCity(item);
    goBack();
  };
  const find = () => {
    setLoading(true);
    const url = "https://sahpossum.herokuapp.com/items/getCities/" + nameCity;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setArrCities(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />} />
      <FormLayout>
        <Input
          top={"Введите полное название города"}
          value={nameCity}
          onChange={(e) => setNameCity(e.target.value)}
        />
        <Button size="xl" mode="outline" onClick={find}>
          Найти город
        </Button>
      </FormLayout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {arrCities.map((item) => {
            return (
              <Cell
                multiline
                key={item.id}
                onClick={() => setItem(item)}
                description={item.region || ""}
              >
                {item.name}
              </Cell>
            );
          })}
        </>
      )}
      <Footer />
    </Panel>
  );
};

export default GetCityList;
