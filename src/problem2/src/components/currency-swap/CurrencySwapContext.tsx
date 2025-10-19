import {createContext, type ReactNode, useState} from "react";
import type {SwapStatus, Token, UserWallet} from "./types.ts";
import {config} from "../../config.ts";
import {MOCK_USER_WALLET} from "./mock-data.ts";

type CurrencySwapContextType = {
  apiUrl: string;
  iconBaseUrl: string;
  userWallet: UserWallet;
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  fromToken: Token | null;
  setFromToken: (token: Token | null) => void;
  toToken: Token | null;
  setToToken: (token: Token | null) => void;
  fromAmount: string;
  setFromAmount: (amount: string) => void;
  toAmount: string;
  setToAmount: (amount: string) => void;
  swapStatus: SwapStatus;
  setSwapStatus: (status: SwapStatus) => void;
  setTokens: (tokens: Token[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CurrencySwapContext = createContext<CurrencySwapContextType | undefined>(undefined);

export const CurrencySwapContextProvider = ({children}: {children: ReactNode}) => {
  const {apiUrl, iconBaseUrl} = config;
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [swapStatus, setSwapStatus] = useState<SwapStatus>('idle');
  const userWallet = MOCK_USER_WALLET;



  return <CurrencySwapContext.Provider value={{
        apiUrl, iconBaseUrl,
    userWallet,
    tokens, isLoading, error,
    fromToken, setFromToken,
    toToken, setToToken,
    fromAmount,
    toAmount,
    swapStatus,
    setTokens,
    setToAmount,
    setIsLoading,
    setError,
    setFromAmount,
    setSwapStatus
  }}>
    {children}
  </CurrencySwapContext.Provider>
}