# Vue Web3 Modal
#### Connect any web application to any Web3 provider! 🤓

## Vue3/Typescript Usage
```typescript
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";
import { Connector } from "eriscrypt-connector-plugin";

const app = createApp(App);
const pinia = createPinia();
const connector = new Connector();

app.use(router);
app.use(pinia);

Connector.on("connected", ({ wallet }) => {
  // magic code here
}).then(() => {
  // finally
  app.provide("Connector", connector);
  app.mount("#app");
});
```

## Happy Coding 🙌