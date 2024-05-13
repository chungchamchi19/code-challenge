import { useState } from "react";
import { ConfirmBody, confirmSwapAPI } from "../api/swap";
import { toast } from 'react-toastify';

export const useSubmit = () => {
  const [loading, setLoading] = useState(false);

  const submit = async (body: ConfirmBody) => {
    setLoading(true);
    try {
      await confirmSwapAPI(body);
      toast.success("Swap confirmed");
    } catch (error) {
      toast.error("Failed to swap");
    }
    setLoading(false);
  };

  return { loading, submit };
};