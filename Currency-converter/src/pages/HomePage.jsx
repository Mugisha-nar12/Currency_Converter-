import React from "react";
import Header from "../components/Header";
import ContentCard from "../components/ContentCard";
import FavoritePairs from "../components/FavoritePairs";
import WhyChooseUs from "../components/WhyChooseUs";
import { useOutletContext } from "react-router-dom";

export const HomePage = () => {
  const { latestRates, currencySymbols } = useOutletContext();
  return (
    <>
      <Header />
      <ContentCard
        latestRates={latestRates}
        currencySymbols={currencySymbols}
      />
      <FavoritePairs />
      <WhyChooseUs />
    </>
  );
};
