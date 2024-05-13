import { act, renderHook } from "@testing-library/react";
import { useConverter } from "../useConverter";

describe("useConverter", () => {
  it("should calculate receive amount when change send amount", () => {
    const { result } = renderHook(() => useConverter());
    act(() => {
      result.current.changeReceiveValue({ amount: 0, currency: "EUR" });
    });
    act(() => {
      result.current.changeSendValue({ amount: 100, currency: "USD" });
    });
    expect(Math.round(result.current.receiveAmount)).toBe(85);
  });

  it("should calculate send amount when change receive amount", () => {
    const { result } = renderHook(() => useConverter());
    act(() => {
      result.current.changeSendValue({ amount: 0, currency: "USD" });
    });
    act(() => {
      result.current.changeReceiveValue({ amount: 85, currency: "EUR" });
    });
    expect(Number(result.current.sendAmount.toFixed(2))).toBe(100.3);
  });

  it("should calculate receive amount when change send currency", () => {
    const { result } = renderHook(() => useConverter());
    act(() => {
      result.current.changeReceiveValue({ amount: 1, currency: "USD" });
    });
    act(() => {
      result.current.changeSendValue({ amount: 1, currency: "EUR" });
    });
    expect(result.current.receiveAmount).toBe(1.18);
  });

  it("should calculate send amount when change receive currency", () => {
    const { result } = renderHook(() => useConverter());
    act(() => {
      result.current.changeSendValue({ amount: 1, currency: "USD" });
    });
    act(() => {
      result.current.changeReceiveValue({ amount: 1, currency: "EUR" });
    });
    expect(Number(result.current.sendAmount.toFixed(2))).toBe(1.18);
  });
});

jest.mock("../usePrices", () => {
  return {
    usePrices: () => {
      return {
        pricesMap: {
          USD: 1,
          EUR: 1.18,
        },
      };
    },
  };
});
