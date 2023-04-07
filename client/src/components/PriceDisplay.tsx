import React, { useState, useEffect } from 'react';

interface Props {
  price: number;
}

const PriceDisplay: React.FC<Props> = ({ price }) => {
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [blinkClass, setBlinkClass] = useState<string>('');

  useEffect(() => {
    if (previousPrice === null) {
      setPreviousPrice(price);
      return;
    }

    if (price > previousPrice) {
      setBlinkClass('bg-green-500');
    } else if (price < previousPrice) {
      setBlinkClass('bg-orange-600');
    }

    setPreviousPrice(price);

    const timeoutId = setTimeout(() => {
      setBlinkClass('');
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [price, previousPrice]);

  return (
    <div
      className={`p-6 mx-auto max-w-lg rounded-lg shadow-xl bg-base-100 ${blinkClass}`}
    >
      <div className="flex items-center">
        <h2 className="text-2xl font-bold text-primary">{`$${price.toFixed(2)}`}</h2>
        <span className="ml-2 text-sm font-medium text-gray-600">USD/BTC</span>
      </div>
    </div>
  );
};

export default PriceDisplay;