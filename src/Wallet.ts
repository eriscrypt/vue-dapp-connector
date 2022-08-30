import { ref } from "vue";
import { ethers } from "ethers";

export default class Wallet {
  private address = ref<string>("");
  private balance = ref<string>("0.00");

  constructor(private readonly provider: any) {
    this.init().then();
  }

  init = async () => {
    this.getAddress();
    await this.requestBalance();
  };

  private getAddress = (): void => {
    const { provider } = this.provider;
    this.address.value = provider.isMetaMask
      ? provider.selectedAddress
      : provider.accounts[0];
  };

  private async requestBalance(): Promise<void> {
    const balanceHex = await this.provider.getBalance(this.address.value);
    this.balance.value = ethers.utils.formatUnits(balanceHex.toString());
  }

  public getWallet() {
    return {
      address: this.address.value,
      balance: this.balance.value,
    };
  }
}
