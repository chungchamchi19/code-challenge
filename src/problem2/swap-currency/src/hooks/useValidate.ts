import { useEffect, useState } from "react";

export const useValidate = (sendAmount: number, receiveAmount: number) => {
  const [isValidSend, setIsValidSend] = useState<boolean>(true);
  const [isValidReceive, setIsValidReceive] = useState<boolean>(true);

  useEffect(() => {
    setIsValidSend(sendAmount > 0);
  }, [sendAmount]);

  useEffect(() => {
    setIsValidReceive(receiveAmount > 0);
  }, [receiveAmount]);

  return {
    isValidSend,
    isValidReceive,
  };
};