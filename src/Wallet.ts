import { ethers } from "ethers";

export default class Wallet {
  private address = "";
  private balance = "0.00";

  constructor(private readonly provider: any) {
    this.getAddress();
  }

  private getAddress = (): void => {
    const { provider } = this.provider;
    this.address = provider.isMetaMask
      ? provider.selectedAddress
      : provider.accounts[0];
  };

  async requestBalance(): Promise<void> {
    const balanceHex = await this.provider.getBalance(this.address);
    this.balance = ethers.utils.formatUnits(balanceHex.toString());
  }

  public getWallet() {
    return {
      address: this.address,
      balance: this.balance,
    };
  }
}
