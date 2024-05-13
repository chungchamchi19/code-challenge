export type ConfirmBody = {
  sendAmount: number;
  receiveAmount: number;
  sendCurrency: string;
  receiveCurrency: string;
}

export const confirmSwapAPI = async (body: ConfirmBody) => {
  const randomNum = Math.random();
  console.log("random", randomNum)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomNum > 0.5) {
        resolve(body);
      } else {
        reject("Failed to swap");
      }
    }, 1000);
  });
}