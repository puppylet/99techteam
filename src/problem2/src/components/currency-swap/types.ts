export interface TokenPriceData {
  currency: string;
  date: string;
  price: number;
}

export interface Token extends TokenPriceData {
  iconUrl: string;
}

export type SwapStatus = 'idle' | 'loading' | 'success' | 'insufficient_funds';


export type WalletBalance = Map<string, number>;

export type UserWallet =  {
  name: string;
  avatarUrl: string;
  balances: WalletBalance;
}
