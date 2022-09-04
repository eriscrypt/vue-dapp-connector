# Vue Web3 Modal
#### Connect any VUE application to any Web3 provider! 🤓

## Vue3 / Typescript / Pinia Usage
```typescript
import { createApp } from "vue";
import App from "./App.vue";
import { Connector, EVENTS } from "eriscrypt-connector-plugin";

const app = createApp(App);
const connector = new Connector();

connector
  .authenticate()
  .then((data) => {
    // user {data} here
  })
  .finally(() => {
    app.provide("Connector", connector);
    app.mount("#app");
  });

connector.on("chain-changed", (data) => {
  console.log("chain changed");
});

connector.on("accounts-changed", (data) => {
  console.log("account changed");
});

connector.on("disconnected", () => {
  console.log("disconnected");
});

connector.on(EVENTS.UPDATED, (data) => {
  console.log("updated");
});

```

## Types
```typescript
import { ConnectorResponse, IWallet, INetwork } from "eriscrypt-connector-plugin/dist/types";
```

## Events

```typescript
import { Connector, EVENTS } from "eriscrypt-connector-plugin";
import { ConnectorResponse } from 'eriscrypt-connector-plugin/dist/types'

const connector = new Connector();

connector.on(EVENTS.CHAIN_CHANGED, (data: ConnectorResponse) => {
  // user change network hook
})

connector.on(EVENTS.ACCOUNTS_CHANGED, (data: ConnectorResponse) => {
  // user change account hook
})

connector.on(EVENTS.DISCONNECTED, () => {
  // user disconnected / logout from all accounts
})

connector.on(EVENTS.UPDATED, (data: ConnectorResponse) => {
  /**
   * user update hook
   * use this if you manually call 'update' function
   */
})
```

## Chains / Networks
```typescript
import { CHAINS } from 'eriscrypt-connector-plugin/dist/types';

/**
 * Supported chains
 * 
 * ETH - Ethereum Mainnet
 * BSC - Binance Smart Chain
 * FTM - Fantom Opera
 * Polygon - Polygon Mainnet
 * Rinkeby - Rinkeby Testnet
 * 
 */
```

## For Electron.js framework
### Need: install `@esbuild-plugins/node-globals-polyfill`
### Configure: `vite.types.ts`

## Happy Coding 🙌