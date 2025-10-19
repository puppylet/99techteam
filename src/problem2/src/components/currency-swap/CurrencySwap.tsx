import {UserWallet} from "./UserWallet.tsx";
import {SkeletonLoader} from "./SkeletonLoader.tsx";
import {CurrencySwapForm} from "./CurrencySwapForm.tsx";
import {useCurrencySwap} from "./useCurrencySwap.ts.tsx";

export const CurrencySwap = () => {
  const {isLoading, error} = useCurrencySwap();
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans relative">
      <div className="absolute top-4 right-4 z-20">
        {!isLoading && !error && (
          <UserWallet />
        )}
      </div>
      <div className="w-full max-w-md mx-auto">
        {isLoading && <SkeletonLoader />}
        {error && <div className="text-red-500 text-center p-4 bg-red-900/50 rounded-lg">{error}</div>}
        {!isLoading && !error && (
          <CurrencySwapForm />
        )}
      </div>
    </div>
  );
}
