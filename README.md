# Vue Web3 Modal
#### Connect any web application to any Web3 provider! 🤓

## Vue3 / Typescript / Pinia Usage
```typescript
import { createApp } from "vue";
import App from "./App.vue";
import { Connector } from "eriscrypt-connector-plugin";

const app = createApp(App);
const connector = new Connector();

connector
  .authenticate()
  .then((data) => {
    // magic code here
    // set data to pinia store and etc.
  })
  .finally(() => {
    // mount app when all data resolved
    app.mount("#app");
  });

connector.on("chain-changed", (data) => {
  // chain changed
});

connector.on("accounts-changed", (data) => {
  // account changed
});

connector.on("disconnected", () => {
  // disconnected
});
```

## For Electron.js framework
### Need: install `@esbuild-plugins/node-globals-polyfill`
### Configure: `vite.config.ts`

## Happy Coding 🙌