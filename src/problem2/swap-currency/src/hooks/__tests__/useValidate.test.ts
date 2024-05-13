import { renderHook } from "@testing-library/react";
import { useValidate } from "../useValidate";

describe("useValidate", () => {
  it("should return valid send value and valid receive value when send value is greater than 0 and receive value is greater than 0", () => {
    const { result } = renderHook(() => useValidate(100, 85));
    expect(result.current.isValidSend).toBe(true);
    expect(result.current.isValidReceive).toBe(true);
  });

  it("should return invalid send value and invalid receive value when send value is smaller than 0 and receive value is smaller than 0", () => {
    const { result } = renderHook(() => useValidate(0, 0));
    expect(result.current.isValidSend).toBe(false);
    expect(result.current.isValidReceive).toBe(false);
  });
});