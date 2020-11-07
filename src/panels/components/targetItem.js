import React, { useState, useEffect } from "react";
import {
  Cell,
  Footer,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
} from "@vkontakte/vkui";
import Icon56ArticleOutline from "@vkontakte/icons/dist/56/article_outline";

const TargetItem = ({ id, go, arrMyItems, setItem }) => {
  const [arrItems, setArrItems] = useState(null);

  useEffect(() => {
    setArrItems(arrMyItems);
  }, []);

  if (arrItems === null) {
    return (
      <Panel id={id}>
        <PanelHeader left={<PanelHeaderBack onClick={() => go("home")} />} />
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
        {arrItems.map((item) => {
          return (
            <Cell
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

export default TargetItem;
