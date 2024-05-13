import { useEffect, useState } from "react";
import { usePrices } from "./usePrices";

export const useConverter = () => {
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [sendCurrency, setSendCurrency] = useState<string>("USD");
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const [receiveCurrency, setReceiveCurrency] = useState<string>("USD");
  const { pricesMap, currencies } = usePrices();

  const changeSendValue = (data: { amount: number; currency: string }) => {
    const { amount, currency } = data;
    setSendAmount(amount);
    setSendCurrency(currency);
    calculateReceiveAmount({ amount, currency });
  };

  const changeReceiveValue = (data: { amount: number; currency: string }) => {
    const { amount, currency } = data;
    setReceiveAmount(amount);
    setReceiveCurrency(currency);
    calculateSendAmount({ amount, currency });
  };

  const calculateReceiveAmount = (sendData: { currency: string; amount: number }) => {
    const ratio = pricesMap[sendData.currency] / pricesMap[receiveCurrency];
    setReceiveAmount(sendData.amount * ratio);
  };

  const calculateSendAmount = (receiveData: { currency: string; amount: number }) => {
    const ratio = pricesMap[sendCurrency] / pricesMap[receiveData.currency];
    setSendAmount(receiveData.amount / ratio);
  };

  useEffect(() => {
    if (currencies?.length >= 2) {
      const firstCurrency = currencies[0];
      const secondCurrency = currencies[1];
      setSendCurrency(firstCurrency);
      setReceiveCurrency(secondCurrency);
    }
  }, [currencies]);

  return {
    sendAmount,
    receiveAmount,
    sendCurrency,
    receiveCurrency,
    changeSendValue,
    changeReceiveValue,
  };
};
