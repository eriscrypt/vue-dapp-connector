import { ref } from "vue";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import config, { ConnectorResponse } from "./types";
import Wallet from "./Wallet";
import Network from "./Network";

export enum EVENTS {
  CHAIN_CHANGED = "chain-changed",
  ACCOUNTS_CHANGED = "accounts-changed",
  DISCONNECTED = "disconnected",
  UPDATED = "updated",
}

export class Connector {
  private instance: any;
  private readonly modal: any;
  private provider: any;

  public networkService: any;
  public walletService: any;
  public isAuthenticated = ref<boolean>(false);

  constructor() {
    this.modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        coinbasewallet: config.coinbasewallet,
        walletconnect: config.walletconnect,
      },
    });
  }

  authenticate = async (): Promise<ConnectorResponse | null> => {
    if (this.modal.cachedProvider) return await this.connect();
    return null;
  };

  connect = async (): Promise<ConnectorResponse> => {
    this.instance = await this.modal.connect();
    await this.update();

    this.isAuthenticated.value = true;
    this.registerEvents();

    return new Promise((resolve) => {
      resolve({
        wallet: this.walletService.getWallet(),
        network: this.networkService.getNetwork(),
      });
    });
  };

  on = (event: EVENTS | string, callback: (e: ConnectorResponse) => void) => {
    window.addEventListener(event, (e: any) => {
      callback(e.detail);
    });
  };

  private registerEvents = () => {
    this.provider.provider.on("chainChanged", async () => {
      await this.update();
      window.dispatchEvent(
        await this.generateEventDetail(EVENTS.CHAIN_CHANGED)
      );
    });

    this.provider.provider.on("accountsChanged", async (accounts: []) => {
      if (!accounts.length) {
        await this.disconnect();
        return window.dispatchEvent(await this.generateDisconnectEvent());
      }

      await this.update();

      return window.dispatchEvent(
        await this.generateEventDetail(EVENTS.ACCOUNTS_CHANGED)
      );
    });

    this.provider.provider.on("disconnect", async () => {
      await this.disconnect();
      return window.dispatchEvent(await this.generateDisconnectEvent());
    });
  };

  public update = async () => {
    this.provider = await this.getProvider();
    this.networkService = new Network(this.provider);
    this.walletService = new Wallet(this.provider);
    await this.walletService.requestBalance();

    return window.dispatchEvent(await this.generateEventDetail(EVENTS.UPDATED));
  };

  private generateEventDetail = async (eventName: string) => {
    return new CustomEvent(eventName, {
      detail: {
        wallet: this.walletService.getWallet(),
        network: this.networkService.getNetwork(),
      },
    });
  };

  private generateDisconnectEvent = () => {
    return new CustomEvent(EVENTS.DISCONNECTED, {
      detail: {},
    });
  };

  getProvider = () => {
    return new ethers.providers.Web3Provider(this.instance);
  };

  disconnect = async () => {
    this.isAuthenticated.value = false;
    this.modal.clearCachedProvider();
    window.dispatchEvent(await this.generateDisconnectEvent())
  };
}
