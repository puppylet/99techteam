import {CurrencySwap} from "./components/currency-swap/CurrencySwap.tsx";
import {CurrencySwapContextProvider} from "./components/currency-swap/CurrencySwapContext.tsx";

export default function App() {
  return <CurrencySwapContextProvider>
    <CurrencySwap />
  </CurrencySwapContextProvider>;
}