import React, {useState} from "react";
import {TokenIcon} from "./TokenIcon.tsx";
import {TokenSelectorModal} from "./TokenSelectorModal.tsx";
import type {Token} from "./types.ts";

type CurrencyInputPanelProps = {
  label: string;
  token: Token | null;
  onTokenSelect: (token: Token) => void;
  amount: string;
  onAmountChange?: (amount: string) => void;
  isReadOnly?: boolean;
}

export const CurrencyInputPanel: React.FC<CurrencyInputPanelProps> = ({ label, token, onTokenSelect, amount, onAmountChange, isReadOnly = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-800 p-5 rounded-2xl space-y-2">
        <span className="text-sm text-gray-400">{label}</span>
        <div className="flex justify-between items-center gap-4">
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.0"
            className="w-full text-3xl bg-transparent text-white outline-none placeholder-gray-500"
            value={amount}
            onChange={!isReadOnly && onAmountChange ? (e) => onAmountChange(e.target.value) : undefined}
            readOnly={isReadOnly}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-gray-900 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-2 pl-3 pr-4 rounded-full transition-colors duration-200 shrink-0">
            {token ? (
              <>
                <TokenIcon src={token.iconUrl} alt={token.currency} className="w-6 h-6 mr-2" />
                <span className="text-lg">{token.currency}</span>
              </>
            ) : (
              <span className="text-lg">Select</span>
            )}
            <img src="/caret-down.svg" alt="caret down" className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
      <TokenSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectToken={onTokenSelect}
      />
    </>
  );
}