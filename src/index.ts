import { ref } from "vue";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import config from "./config";
import Wallet from "./Wallet";
import Network from "./Network";

export enum TYPES {
  CONNECTED = "connected",
}

export class Connector {
  private instance: any;
  private readonly modal: any;

  private provider: any;
  public network: any;
  public wallet: any;
  public isAuthenticated = ref<boolean>(false);

  constructor() {
    this.modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        coinbasewallet: config.coinbasewallet,
        walletconnect: config.walletconnect,
      },
    });
    this.authenticate().catch((e) => {
      console.error(e);
    });
  }

  public static on(type: TYPES | string, cb: (detail: Connector) => void) {
    if (type === TYPES.CONNECTED) {
      window.addEventListener(TYPES.CONNECTED, (e: any) => {
        cb(e.detail);
      });
    }

    return new Promise((resolve) => {
      resolve(true);
    });
  }

  private emit(type: TYPES) {
    if (type === TYPES.CONNECTED) {
      const event = new CustomEvent(TYPES.CONNECTED, {
        detail: this,
      });
      window.dispatchEvent(event);
    }
  }

  authenticate = () => {
    return new Promise(async (resolve) => {
      if (this.modal.cachedProvider) await this.connect();
      resolve(this);
    });
  };

  connect = async () => {
    this.instance = await this.modal.connect();
    this.provider = this.getProvider();

    this.wallet = new Wallet(this.provider);
    this.network = new Network(this.provider);
    this.isAuthenticated.value = true;

    return new Promise((resolve) => {
      this.emit(TYPES.CONNECTED);
      resolve(this);
    });
  };

  getProvider = () => {
    return new ethers.providers.Web3Provider(this.instance);
  };

  disconnect = async () => {
    this.isAuthenticated.value = false;
    this.modal.clearCachedProvider();
  };
}
