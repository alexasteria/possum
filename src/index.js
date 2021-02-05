import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./store/reducer";
const store = createStore(reducer);

// Init VK  Mini App
bridge.send("VKWebAppInit");
let linkParams = window.location.hash
    .replace("#", "")
    .split("&")
    .reduce(function (p, e) {
        let a = e.split("=");
        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return p;
    }, {});
let params = window.location.search
    .replace("?", "")
    .split("&")
    .reduce(function (p, e) {
        let a = e.split("=");
        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return p;
    }, {});

ReactDOM.render(<Provider store={store}><App linkParams={linkParams} params={params}/></Provider>, document.getElementById("root"));
// if (process.env.NODE_ENV === "development") {
//   import("./eruda").then(({ default: eruda }) => {}); //runtime download
// }
