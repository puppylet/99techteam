import {CurrencyInputPanel} from "./CurrencyInputPanel.tsx";
import {useCurrencySwap} from "./useCurrencySwap.ts.tsx";
import {SwapButton} from "./SwapButton.tsx";

export const CurrencySwapForm = () => {
  const {setFromAmount, fromAmount, fromToken, swapTokens, toToken, setToToken, toAmount, swapStatus, executeSwap, setFromToken} = useCurrencySwap();

  return (<div className="bg-gray-950 p-4 md:p-6 rounded-3xl shadow-2xl border border-gray-800 relative">
    <h1 className="text-2xl font-bold text-white mb-6 text-center">Currency Swap</h1>
    <div className="flex flex-col gap-2">
      <CurrencyInputPanel
        label="You send"
        token={fromToken}
        onTokenSelect={setFromToken}
        amount={fromAmount}
        onAmountChange={setFromAmount}/>

      <div className="flex justify-center my-[-18px] z-10">
        <button
          onClick={swapTokens}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border-4 border-gray-950 text-white p-2 rounded-full transition-transform duration-300 ease-in-out hover:rotate-180 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500">
          <img src="/swap.svg" alt="Swap icon" className="h-6 w-6" />
        </button>
      </div>

      <CurrencyInputPanel
        label="You receive"
        token={toToken}
        onTokenSelect={setToToken}
        amount={toAmount}
        isReadOnly
      />
    </div>

    <button
      className={`w-full mt-6 font-bold py-4 rounded-2xl text-xl transition-colors duration-200 text-white
                ${swapStatus === 'success' ? 'bg-green-600' : ''}
                ${swapStatus === 'insufficient_funds' ? 'bg-red-600' : ''}
                ${swapStatus === 'idle' || swapStatus === 'loading' ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' : ''}
                disabled:bg-gray-700 disabled:cursor-not-allowed`}
      disabled={!fromAmount || parseFloat(fromAmount) <= 0 || swapStatus === 'loading'}
      onClick={executeSwap}
    >
      <SwapButton swapStatus={swapStatus} fromAmount={fromAmount} />
    </button>
  </div>
);
}
