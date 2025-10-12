import React from "react";
import StatsCards from "../components/StatsCards";
import ChartSection from "../components/ChartSection";
import LiveCurrencyPairs from "../components/LiveCurrencyPairs";
import TopGainersLosers from "../components/TopGainersLosers";

const MarketTrend = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        {" "}
        {/* Light gray background for the whole page */}
        <div className="container mx-auto">
          {/* headersection*/}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Market Overview
            </h1>
            <p className="text-gray-600 text-lg">
              Real-time currency markets, trends, and analysis
            </p>
          </div>
          <StatsCards />
          <ChartSection />
          <LiveCurrencyPairs />
          <TopGainersLosers />
        </div>
      </div>
    </>
  );
};

export default MarketTrend;
