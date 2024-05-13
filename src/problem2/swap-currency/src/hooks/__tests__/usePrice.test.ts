import { renderHook } from "@testing-library/react";
import { usePrices } from "../usePrices";
import { prices } from "../../constants/prices";

jest.mock("../../constants/prices");
const mockedPrices = jest.mocked(prices);

describe("usePrice", () => {
  afterEach(() => {
    mockedPrices.splice(0, mockedPrices.length);
  });

  it("should return price of currency", () => {
    mockedPrices.push({ currency: "USD", price: 1, date: "2021-09-01" });
    mockedPrices.push({ currency: "EUR", price: 1.18, date: "2021-09-01" });
    const { result } = renderHook(() => usePrices());
    expect(result.current.pricesMap).toEqual({
      USD: 1,
      EUR: 1.18,
    });
    expect(result.current.currencies).toEqual(["EUR", "USD"]);
  });

  it("should return list unique currencies and sort currencies by alphabet", () => {
    mockedPrices.push({ currency: "USD", price: 1, date: "2021-09-01" });
    mockedPrices.push({ currency: "EUR", price: 1.18, date: "2021-09-01" });
    mockedPrices.push({ currency: "EUR", price: 1.17, date: "2021-09-02" });
    const { result } = renderHook(() => usePrices());
    expect(result.current.pricesMap).toEqual({
      USD: 1,
      EUR: 1.17,
    });
    expect(result.current.currencies).toEqual(["EUR", "USD"]);
  });
});
