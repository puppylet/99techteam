import type {UserWallet} from "./types.ts";

export const MOCK_USER_WALLET: UserWallet = {
  name: 'Satoshi Nakamoto',
  avatarUrl: 'https://i.pravatar.cc/150?u=satoshi',
  balances: new Map<string, number>([
    ['USD', 5000],
    ['ETH', 10],
    ['BTC', 2],
    ['ZIL', 10000],
    ['ATOM', 150],
  ]),
};

