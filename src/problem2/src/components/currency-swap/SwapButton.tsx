import type {SwapStatus} from "./types.ts";
import type {FunctionComponent} from "react";

interface SwapButtonContentProps {
  swapStatus: SwapStatus;
  fromAmount: string;
}


export const SwapButton: FunctionComponent<SwapButtonContentProps> = ({ swapStatus, fromAmount }) => {
  if (swapStatus === 'insufficient_funds') {
    return 'Insufficient Balance';
  }
  if (swapStatus === 'loading') {
    return (
      <div className="flex items-center justify-center">
        <img src="/loading.svg" alt="loading" className="animate-spin -ml-1 mr-3 h-5 w-5" />
        Processing...
    </div>
  );
  }
  if (swapStatus === 'success') {
    return (
      <div className="flex items-center justify-center">
        <img src="/check.svg" className="h-6 w-6 mr-2" alt={swapStatus} />
        Swap Successful
    </div>
  );
  }
  return parseFloat(fromAmount) > 0 ? 'Swap' : 'Enter an amount';
};
