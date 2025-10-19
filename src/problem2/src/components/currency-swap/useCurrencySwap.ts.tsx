import {useContext, useEffect} from "react";
import {CurrencySwapContext} from "./CurrencySwapContext.tsx";
import {fetchRetry, processTokenData} from "./helpers.ts";
import type {TokenPriceData} from "./types.ts";

export const useCurrencySwap = () => {
  const context = useContext(CurrencySwapContext);

  if (!context) {
    throw new Error('useCurrencySwap must be used within a CurrencySwapContextProvider');
  }

  const { apiUrl, iconBaseUrl, userWallet } = context;
  const { setTokens, setFromToken, setToToken, setError, setIsLoading, setSwapStatus, setFromAmount, setToAmount } = context;
  const { fromAmount, toAmount, fromToken, toToken, swapStatus } = context;

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const data = await fetchRetry<TokenPriceData[]>(apiUrl, { retries: 3 });
        const processedData = processTokenData(data);
        setTokens(processedData);

        const defaultFrom = processedData.find(t => t.currency === 'USD') || processedData[0];
        const defaultTo = processedData.find(t => t.currency === 'ETH') || processedData[1];
        setFromToken(defaultFrom);
        setToToken(defaultTo);
        setError(null);
      } catch (err) {
        console.error("Cannot fetch the token price:", err);
        setError('Failed to fetch token data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [apiUrl, iconBaseUrl, setError, setFromToken, setIsLoading, setToToken, setTokens]);

  useEffect(() => {
    const amountNum = parseFloat(fromAmount);
    if (amountNum > 0 && fromToken && toToken && fromToken.price && toToken.price) {
      const rate = fromToken.price / toToken.price;
      const calculatedToAmount = (amountNum * rate).toFixed(6);
      setToAmount(calculatedToAmount);
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);

  const handleFromAmountChange = (amount: string) => {
    if (amount === '' || /^[0-9]*\.?[0-9]*$/.test(amount)) {
      setFromAmount(amount);
    }
    if (swapStatus === 'insufficient_funds') {
      setSwapStatus('idle');
    }
  };

  const swapTokens = () => {
    const currentFromAmount = fromAmount;
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(currentFromAmount);
  };

  const executeSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0 || !fromToken) return;

    const userBalance = userWallet.balances.get(fromToken.currency) || 0;
    if (parseFloat(fromAmount) > userBalance) {
      setSwapStatus('insufficient_funds');
      setTimeout(() => {
        setSwapStatus('idle');
      }, 3000);
      return;
    }

    setSwapStatus('loading');
    setTimeout(() => {
      setSwapStatus('success');
      setTimeout(() => {
        setSwapStatus('idle');
      }, 2000);
    }, 1500);
  };

   return {
    ...context,
    executeSwap,
    handleFromAmountChange,
    swapTokens
  };

}