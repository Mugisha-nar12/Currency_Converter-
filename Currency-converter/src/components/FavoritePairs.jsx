import React, { useState, useEffect, useCallback } from "react"; // Import useCallback

// Hardcoded currency data with example exchange rates relative to USD
// This should ideally come from a shared context or API in a real app
const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", rateToUSD: 1 },
  { code: "EUR", name: "Euro", symbol: "€", rateToUSD: 1.08 }, // 1 EUR = 1.08 USD
  { code: "GBP", name: "British Pound", symbol: "£", rateToUSD: 1.26 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rateToUSD: 0.0067 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rateToUSD: 0.73 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rateToUSD: 0.66 },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", rateToUSD: 1.11 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", rateToUSD: 0.14 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", rateToUSD: 0.012 },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", rateToUSD: 0.2 },
  { code: "ZAR", name: "South African Rand", symbol: "R", rateToUSD: 0.053 }, // African
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", rateToUSD: 0.00067 }, // African
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", rateToUSD: 0.0076 }, // African
  { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵", rateToUSD: 0.083 }, // African
  { code: "EGP", name: "Egyptian Pound", symbol: "E£", rateToUSD: 0.021 }, // African
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "FCFA", rateToUSD: 0.0016 }, // African (West Africa)
  { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA", rateToUSD: 0.0016 }, // African (Central Africa)
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", rateToUSD: 0.00026 }, // African
  {
    code: "TZS",
    name: "Tanzanian Shilling",
    symbol: "TSh",
    rateToUSD: 0.00039,
  }, // African
];

function FavoritePairs() {
  const [favoritePairs, setFavoritePairs] = useState([
    { id: 1, from: "USD", to: "EUR", rate: 0 },
    { id: 2, from: "GBP", to: "USD", rate: 0 },
  ]);

  // Function to find a currency object by its code
  // Wrapped in useCallback to ensure it's stable across renders
  const getCurrencyByCode = useCallback(
    (code) => currencies.find((c) => c.code === code),
    []
  );

  // Function to calculate the exchange rate between two currencies
  // Wrapped in useCallback to ensure it's stable across renders
  const calculateRate = useCallback(
    (fromCode, toCode) => {
      const from = getCurrencyByCode(fromCode);
      const to = getCurrencyByCode(toCode);

      if (from && to && from.rateToUSD !== 0) {
        return (1 * from.rateToUSD) / to.rateToUSD;
      }
      return 0;
    },
    [getCurrencyByCode]
  ); // Depends on getCurrencyByCode

  // Effect to update rates when component mounts or on refresh
  // Wrapped in useCallback to ensure it's stable across renders
  const updateRates = useCallback(() => {
    setFavoritePairs((prevPairs) =>
      prevPairs.map((pair) => ({
        ...pair,
        rate: calculateRate(pair.from, pair.to),
      }))
    );
  }, [calculateRate]); // Depends on calculateRate

  useEffect(() => {
    updateRates(); // Initial rate calculation

    // Set up interval for automatic updates (e.g., every minute)
    const interval = setInterval(updateRates, 60 * 1000); // Every 60 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [updateRates]); // Now updateRates is correctly included as a dependency

  const handleRemovePair = (id) => {
    setFavoritePairs((prevPairs) => prevPairs.filter((pair) => pair.id !== id));
  };

  const handleRefreshAll = () => {
    updateRates();
    console.log("Rates refreshed!");
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        {/* Header for Favorite Currency Pairs */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Favorite Currency Pairs
          </h3>
          <button
            onClick={handleRefreshAll}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Refresh rates"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {/* List of Favorite Pairs */}
        <div className="space-y-3 mb-6">
          {favoritePairs.map((pair) => {
            // Removed 'fromCurrencyObj' as it was unused
            const toCurrencyObj = getCurrencyByCode(pair.to);
            return (
              <div
                key={pair.id}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {pair.from}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {pair.to}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-pink-100 dark:bg-pink-800 text-pink-700 dark:text-pink-200 text-sm font-semibold rounded-md">
                    {toCurrencyObj?.symbol}
                    {pair.rate.toFixed(4)}
                  </span>
                  <button
                    onClick={() => handleRemovePair(pair.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                    aria-label={`Remove ${pair.from} to ${pair.to} pair`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Disclaimer */}
        <p className="text-xs text-gray-500 text-center dark:text-gray-400">
          Rates update automatically every minute
        </p>
      </div>
    </div>
  );
}

export default FavoritePairs;
