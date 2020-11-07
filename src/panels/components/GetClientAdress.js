import React, { useState } from "react";
import {
  FormLayout,
  Input,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";

const GetClientAdress = ({ id, goBack }) => {
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => goBack} />} />
      <FormLayout>
        <Input top={"Улица"} />
        <Input top={"Дом"} />
        <Input top={"Квартира"} />
      </FormLayout>
    </Panel>
  );
};

export default GetClientAdress;
