import { useEffect, useState } from "react";
import { prices } from "../constants/prices";

export const usePrices = () => {
  const [pricesMap, setPricesMap] = useState<Record<string, number>>({});
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const currencies: string[] = [];
    const pricesMap = prices.reduce((acc, price) => {
      if (!acc[price.currency]) {
        currencies.push(price.currency);
      }
      acc[price.currency] = price.price;
      return acc;
    }, {} as Record<string, number>);
    setCurrencies(currencies.sort((a, b) => a.localeCompare(b)));
    setPricesMap(pricesMap);
  }, []);

  return {
    pricesMap,
    currencies,
  };
};
