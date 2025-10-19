import React, {useEffect, useState} from "react";

interface TokenIconProps {
  src: string;
  alt: string;
  className?: string;
}

export const TokenIcon: React.FC<TokenIconProps> = ({ src, alt, className = 'w-6 h-6' }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div className={`${className} rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold`}>
        {alt?.[0]}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} rounded-full bg-gray-700`}
      onError={() => setHasError(true)}
    />
  );
};