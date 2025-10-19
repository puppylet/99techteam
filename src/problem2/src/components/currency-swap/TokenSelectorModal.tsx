import {type FunctionComponent, useEffect, useRef, useState} from "react";
import {TokenIcon} from "./TokenIcon.tsx";
import {useCurrencySwap} from "./useCurrencySwap.ts.tsx";
import type {Token} from "./types.ts";

interface TokenSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectToken: (token: Token) => void;
}
export const TokenSelectorModal: FunctionComponent<TokenSelectorModalProps> = ({ isOpen, onClose, onSelectToken }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const {tokens} = useCurrencySwap();
  const listRef = useRef<HTMLUListElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const filteredTokens = tokens.filter(token =>
    token.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredTokens.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredTokens.length) % filteredTokens.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredTokens[activeIndex]) {
          onSelectToken(filteredTokens[activeIndex]);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, filteredTokens, onSelectToken, onClose]);

  useEffect(() => {
    if (listRef.current) {
      const activeItem = listRef.current.querySelector<HTMLLIElement>(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        activeItem.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div ref={modalContentRef} className="bg-gray-900 rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-lg">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Select a token</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white active:text-gray-200 text-3xl leading-none">&times;</button>
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by name"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul ref={listRef} className="divide-y divide-gray-800">
            {filteredTokens.length > 0 ? filteredTokens.map((token, index) => (
              <li key={token.currency}
                  data-index={index}
                  className={`flex items-center p-4 cursor-pointer transition-colors duration-150 ${index === activeIndex ? 'bg-gray-700' : 'hover:bg-gray-800 active:bg-gray-600'}`}
                  onClick={() => {
                    onSelectToken(token);
                    onClose();
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
              >
                <TokenIcon src={token.iconUrl} alt={token.currency} className="w-8 h-8 mr-4" />
                <span className="font-semibold text-white">{token.currency}</span>
              </li>
            )) : (
              <li className="p-4 text-center text-gray-400">No results found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};