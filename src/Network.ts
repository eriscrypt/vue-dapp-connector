import { CHAINS } from "./types";

export default class Network {
  private readonly id: string | number;
  public name: string = "";
  public symbol: string = "";

  constructor(private readonly provider: any) {
    this.id = Number(this.provider.provider.chainId);
    this.getChainById();
  }

  private getChainById() {
    if (!this.id) return;

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

    if (this.id === CHAINS.FTM.id) {
      this.update(CHAINS.FTM);
    }

    if (this.id === CHAINS.POLYGON.id) {
      this.update(CHAINS.POLYGON);
    }

    if (this.id === CHAINS.AVALANCHE.id) {
      this.update(CHAINS.AVALANCHE);
    }

    if (this.id === CHAINS.ARBITRUM.id) {
      this.update(CHAINS.ARBITRUM);
    }

    return;
  }

  private update(chain: any) {
    this.name = chain.name;
    this.symbol = chain.symbol;
  }

  public getNetwork() {
    return {
      name: this.name,
      symbol: this.symbol,
    };
  }
}
