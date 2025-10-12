// src/components/LiveCurrencyPairs.jsx
import React, { useCallback } from "react"; // Import useCallback
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function LiveCurrencyPairs({ rates }) {
  const displayPairs = [
    { from: "USD", to: "EUR" },
    { from: "GBP", to: "USD" },
    { from: "USD", to: "JPY" },
    { from: "AUD", to: "USD" },
    { from: "CHF", to: "EUR" },
  ];

  // Wrap getRateAndChange in useCallback to prevent it from changing on every render
  const getRateAndChange = useCallback(
    (from, to) => {
      if (!rates || !rates[from] || !rates[to]) {
        return {
          price: "N/A",
          change: "N/A",
          percentage: "N/A",
          isPositive: true,
        };
      }

      const rate = (1 / rates[from]) * rates[to];

      const randomChange = Math.random() * 0.01 - 0.005;
      const changedRate = rate + randomChange;
      const percentageChange = (randomChange / rate) * 100;

      return {
        price: changedRate.toFixed(4),
        change: randomChange.toFixed(4),
        percentage: percentageChange.toFixed(2) + "%",
        isPositive: randomChange >= 0,
      };
    },
    [rates]
  ); // Dependency for useCallback

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Live Currency Pairs
        </h2>
        <select className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 text-sm">
          <option>Major Pairs</option>
          <option>Exotic Pairs</option>
        </select>
      </div>

      <div className="space-y-4">
        {displayPairs.map((pair, index) => {
          const { price, change, percentage, isPositive } = getRateAndChange(
            pair.from,
            pair.to
          );
          const pairName = `${pair.from}/${pair.to}`;
          const volume = `Volume: ${(Math.random() * 5 + 1).toFixed(1)}B`;

          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold mr-3">
                  {pair.from}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{pairName}</p>
                  <p className="text-sm text-gray-500">{volume}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{price}</p>
                <div
                  className={`flex items-center text-sm ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={isPositive ? faCaretUp : faCaretDown}
                    className="mr-1"
                  />
                  {change} ({percentage})
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LiveCurrencyPairs;
