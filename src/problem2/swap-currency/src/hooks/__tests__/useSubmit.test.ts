import { renderHook, act } from "@testing-library/react";
import { useSubmit } from "../useSubmit";
import { confirmSwapAPI } from "../../api/swap";

describe("useSubmit", () => {
  it("should call confirmSwapAPI with body", async () => {
    const { result } = renderHook(() => useSubmit());
    await act(async () => {
      await result.current.submit({
        sendAmount: 100,
        receiveAmount: 85,
        sendCurrency: "USD",
        receiveCurrency: "EUR",
      });
    });
    expect(confirmSwapAPI).toHaveBeenCalledTimes(1);
    expect(jest.mocked(confirmSwapAPI).mock.calls[0][0]).toEqual({
      sendAmount: 100,
      receiveAmount: 85,
      sendCurrency: "USD",
      receiveCurrency: "EUR",
    });
  });
});

jest.mock("../../api/swap", () => {
  return {
    confirmSwapAPI: jest.fn(),
  };
});

jest.mock("react-toastify", () => {
  return {
    toast: {
      error: jest.fn(),
      success: jest.fn(),
    },
  };
});