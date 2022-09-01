import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
// @ts-ignore
import WalletConnect from "@walletconnect/web3-provider/dist/umd/index.min.js";

const INFURA_ID = "3ff38b400e4a4593af89997fde20c30e";

export default {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3 Connector",
      infuraId: INFURA_ID,
    },
  },
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: INFURA_ID,
      rpc: {
        56: "https://bsc-dataseed.binance.org/",
        250: "https://rpcapi.fantom.network/",
        137: "https://rpc-mainnet.matic.network/",
      },
    },
  },
};
