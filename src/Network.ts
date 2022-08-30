const CHAINS = {
  ETH: {
    id: 1,
    name: "Ethereum Mainnet",
    token: "ETH",
  },
  BSC: {
    id: 56,
    name: "Binance Smart Chain",
    token: "BNB",
  },
  RINKEBY: {
    id: 4,
    name: "Rinkeby Testnet",
    token: "ETH",
  },
};

export default class Network {
  private readonly id: string | number;
  public name: string = "";
  public token: string = "";
  public valid: boolean = true;

  constructor(private readonly provider: any) {
    this.id = +this.provider.provider.chainId;
    this.getChainById();
  }

  private getChainById() {
    if (!this.id) return;

    if (this.id !== 1 && this.id !== 4) {
      console.error("WRONG NETWORK.");
      this.valid = false;
    }

    if (this.id === CHAINS.ETH.id) {
      this.update(CHAINS.ETH);
    }

    if (this.id === CHAINS.BSC.id) {
      this.update(CHAINS.BSC);
    }

    if (this.id === CHAINS.RINKEBY.id) {
      this.update(CHAINS.RINKEBY);
      console.warn("RINKEBY TEST NETWORK DETECTED.");
    }

    return;
  }

  private update(chain: any) {
    this.name = chain.name;
    this.token = chain.token;
  }

  public getNetwork() {
    return {
      name: this.name,
      token: this.token,
      valid: this.valid,
    };
  }
}
