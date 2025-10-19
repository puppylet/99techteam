import {useEffect, useRef, useState} from "react";
import {TokenIcon} from "./TokenIcon.tsx";
import {useCurrencySwap} from "./useCurrencySwap.ts.tsx";

export const UserWallet = () => {
  const {userWallet, tokens, iconBaseUrl} = useCurrencySwap()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userTokens = Array.from(userWallet.balances.entries())
    .map(([currency, balance]) => {
      const tokenInfo = tokens.find(t => t.currency === currency);
      return {
        currency,
        balance,
        iconUrl: tokenInfo?.iconUrl || `${iconBaseUrl}${currency}.svg`
      };
    })
    .filter(Boolean);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 hover:border-blue-500 active:opacity-80 transition-all duration-200">
        <img src={userWallet.avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
      </button>
      {isOpen && (
        <div className="absolute top-14 right-0 w-72 bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-20 animate-fade-in-down">
          <div className="p-4 border-b border-gray-700">
            <p className="text-sm text-gray-400">Wallet</p>
            <p className="text-lg font-semibold text-white">{userWallet.name}</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            <ul className="divide-y divide-gray-800">
              {userTokens.map(({ currency, balance, iconUrl }) => (
                <li key={currency} className="flex items-center justify-between p-3">
                  <div className="flex items-center">
                    <TokenIcon src={iconUrl} alt={currency} className="w-8 h-8 mr-3" />
                    <span className="font-semibold text-white">{currency}</span>
                  </div>
                  <span className="text-gray-300">{balance.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};