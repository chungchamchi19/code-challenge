import "./App.css";
import { useConverter } from "./hooks/useConverter";
import { usePrices } from "./hooks/usePrices";
import { useSubmit } from "./hooks/useSubmit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useValidate } from "./hooks/useValidate";

function App() {
  const { currencies } = usePrices();
  const { sendAmount, sendCurrency, changeSendValue, receiveAmount, receiveCurrency, changeReceiveValue } = useConverter();
  const { loading, submit } = useSubmit();
  const { isValidSend, isValidReceive } = useValidate(sendAmount, receiveAmount);

  const handleChangeSendAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const amount = parseFloat(value) || 0;
    changeSendValue({ amount, currency: sendCurrency });
  };

  const handleChangeSendCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    changeSendValue({ amount: sendAmount, currency });
  };

  const handleChangeReceiveAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const amount = parseFloat(value) || 0;
    changeReceiveValue({ amount, currency: receiveCurrency });
  };

  const handleChangeReceiveCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    changeReceiveValue({ amount: receiveAmount, currency });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidSend || !isValidReceive) {
      toast.error("Invalid amount");
      return;
    }
    await submit({
      sendAmount,
      receiveAmount,
      sendCurrency,
      receiveCurrency,
    });
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <ToastContainer position="top-center" />
        <div className="bg-white rounded-md p-6 w-[400px] border shadow-lg">
          <h1 className="text-center font-medium text-3xl mb-8">Currency Swap</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="send_amount" className="mb-2 block">
              Amount to send
            </label>
            <div className="mb-4">
              <div className="relative">
                <input type="text" id="send_amount" className="border p-2 w-full rounded-md pr-10" value={sendAmount} onChange={handleChangeSendAmount} />
                <select
                  name=""
                  id="send_amount_select"
                  className="border-none absolute right-2 top-1/2 -translate-y-1/2 py-2"
                  value={sendCurrency}
                  onChange={handleChangeSendCurrency}
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              {!isValidSend && <p className="text-red-500 text-sm mt-1">Invalid send amount</p>}
            </div>
            <label htmlFor="send_amount" className="mb-2 block">
              Amount to receive
            </label>
            <div className="mb-8">
              <div className="relative">
                <input type="text" id="receive_amount" className="border p-2 w-full rounded-md pr-10" value={receiveAmount} onChange={handleChangeReceiveAmount} />
                <select
                  name=""
                  id="receive_amount_select"
                  className="border-none absolute right-2 top-1/2 -translate-y-1/2 py-2"
                  value={receiveCurrency}
                  onChange={handleChangeReceiveCurrency}
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              {!isValidReceive && <p className="text-red-500 text-sm mt-1">Invalid receive amount</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 disabled:bg-indigo-300 disabled:hover:border-transparent text-white py-2 rounded-md font-bold"
              disabled={!isValidSend || !isValidReceive}
            >
              {loading ? "Confirming..." : "Confirm Swap"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
