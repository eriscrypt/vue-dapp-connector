# Vue Web3 Modal
#### Connect any web application to any Web3 provider! 🤓

## Vue3 / Typescript / Pinia Usage
```typescript
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import { useUserStore } from "@/store/user";
import { Connector } from "eriscrypt-connector-plugin";

const app = createApp(App);
const pinia = createPinia();
const connector = new Connector();

app.provide("Connector", connector);
app.use(pinia);

connector
  .authenticate()
  .then((data) => {
    if (data) {
      const store = useUserStore();
      store.setUser(data);
    }
  })
  .finally(() => {
    app.mount("#app");
  });

```

## For Electron.js framewor
### Need: install `@esbuild-plugins/node-globals-polyfill`
### Configure: `vite.config.ts`

## Happy Coding 🙌