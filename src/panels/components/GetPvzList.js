import React, { useEffect, useState } from "react";
import {
  Cell,
  Footer,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  ScreenSpinner,
} from "@vkontakte/vkui";
import Icon56ArticleOutline from "@vkontakte/icons/dist/56/article_outline";

const GetPvzList = ({ id, go, goBack, activeCity, setItem, setPopout }) => {
  const [arrPvz, setArrPvz] = useState([]);
  useEffect(() => {
    setPopout(<ScreenSpinner size="large" />);
    fetch("https://saharnypossum.herokuapp.com/items/getPVZ/" + activeCity.id)
      .then((res) => res.json())
      .then((res) => {
        setArrPvz(res);
        setPopout(null);
      })
      .catch((e) => console.log(e));
  }, []);

  if (arrPvz.length === 0) {
    return (
      <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => goBack} />} />
        <Placeholder
          stretched
          icon={<Icon56ArticleOutline />}
          header={"Пусто"}
        />
        <Footer />
      </Panel>
    );
  } else {
    return (
      <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => go("home")} />} />
        {arrPvz.map((item) => {
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
        <Footer />
      </Panel>
    );
  }
};

export default GetPvzList;
