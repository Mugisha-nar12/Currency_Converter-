import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function CurrencyConverter({ rates, symbols }) {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR"); // Changed default to EUR as per the reference image
  const [convertedAmount, setConvertedAmount] = useState(0);

  const API_BASE_CURRENCY = "USD"; // Assuming USD is the base currency for your rates

  // Initialize currencies if defaults are not available in symbols (simplified without full error/loading)
  useEffect(() => {
    if (symbols && Object.keys(symbols).length > 0) {
      if (!symbols[fromCurrency]) {
        setFromCurrency(Object.keys(symbols)[0]);
      }
      if (!symbols[toCurrency]) {
        // Pick a different default if EUR isn't there, ensuring it's not the same as fromCurrency
        const firstSymbol = Object.keys(symbols)[0];
        const secondSymbol =
          Object.keys(symbols).length > 1
            ? Object.keys(symbols)[1]
            : firstSymbol;
        setToCurrency(
          firstSymbol === fromCurrency ? secondSymbol : firstSymbol
        );
      }
    }
  }, [symbols, fromCurrency, toCurrency]); // Depend on symbols, from/to currency to re-evaluate defaults

  // Memoized function for conversion calculation
  const calculateConversion = useCallback(() => {
    // Ensure rates and selected currencies are valid before attempting calculation
    if (!rates || !rates[fromCurrency] || !rates[toCurrency] || amount === 0) {
      setConvertedAmount(0);
      return;
    }

    const amountInBaseCurrency =
      fromCurrency === API_BASE_CURRENCY
        ? amount
        : amount / rates[fromCurrency];

    const result =
      toCurrency === API_BASE_CURRENCY
        ? amountInBaseCurrency
        : amountInBaseCurrency * rates[toCurrency];

    setConvertedAmount(result.toFixed(2)); // Displaying 2 decimal places for currency consistency
  }, [amount, fromCurrency, toCurrency, rates]);

  // Recalculate conversion whenever relevant states change
  useEffect(() => {
    calculateConversion();
  }, [calculateConversion]);

  // Handler for swapping 'From' and 'To' currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Sort currency symbols for consistent display in dropdowns
  const sortedSymbols = symbols ? Object.keys(symbols).sort() : [];

  // If symbols are still not available, render a minimal fallback or an empty state
  // In a real app, this would be covered by a loading state in the parent component
  if (!symbols || sortedSymbols.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto my-8 border border-gray-200 text-center text-gray-500">
        <p>
          No currency data available. Please provide valid 'rates' and 'symbols'
          props.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto my-8 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Currency Converter
        </h2>
        <FontAwesomeIcon icon={faStar} className="text-gray-400 text-lg" />
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
          min="0"
          aria-label="Amount to convert"
        />
      </div>

      {/* From Currency Selector */}
      <div className="mb-4">
        <label
          htmlFor="fromCurrency"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          From
        </label>
        <div className="relative">
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="block w-full px-4 py-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-lg cursor-pointer"
            aria-label="Select source currency"
          >
            {sortedSymbols.map((symbolCode) => (
              <option key={symbolCode} value={symbolCode}>
                {symbolCode} - {symbols[symbolCode]?.name}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Swap Currencies Button */}
      <div className="flex justify-center my-6">
        <button
          onClick={handleSwapCurrencies}
          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          title="Swap Currencies"
          aria-label="Swap currencies"
        >
          <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-xl" />
        </button>
      </div>

      {/* To Currency Selector */}
      <div className="mb-6">
        <label
          htmlFor="toCurrency"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          To
        </label>
        <div className="relative">
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="block w-full px-4 py-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-lg cursor-pointer"
            aria-label="Select target currency"
          >
            {sortedSymbols.map((symbolCode) => (
              <option key={symbolCode} value={symbolCode}>
                {symbolCode} - {symbols[symbolCode]?.name}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Conversion Result Display */}
      <div className="bg-blue-50 p-5 rounded-lg text-center border border-blue-100">
        <p className="text-sm text-gray-600 mb-1">
          {amount} {fromCurrency} equals
        </p>
        <p className="text-4xl font-bold text-blue-700">
          {convertedAmount}{" "}
          <span className="text-2xl">
            {symbols[toCurrency]?.symbol_native || toCurrency}
          </span>
        </p>
        {rates[fromCurrency] && rates[toCurrency] && (
          <p className="text-sm text-gray-500 mt-1">
            1 {fromCurrency} ={" "}
            {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
}

export default CurrencyConverter;
