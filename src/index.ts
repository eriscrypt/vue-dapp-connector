import { ref } from "vue";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import config from "./config";
import Wallet from "./Wallet";
import Network from "./Network";
import { ConnectorResponse } from "./types";

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
    this.provider = this.getProvider();
    this.walletService = new Wallet(this.provider);
    this.networkService = new Network(this.provider);
    this.isAuthenticated.value = true;

    await this.walletService.requestBalance();

    return new Promise((resolve) => {
      resolve({
        wallet: this.walletService.getWallet(),
        network: this.networkService.getNetwork(),
      });
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
