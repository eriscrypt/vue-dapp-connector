export interface IWallet {
  address: string;
  balance: string;
}

export interface INetwork {
  name: string;
  token: string;
  valid: boolean;
}

export interface ConnectorResponse {
  wallet: IWallet;
  network: INetwork;
}
