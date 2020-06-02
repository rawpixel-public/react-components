import { renderHook } from "@testing-library/react-hooks";
import fetchMocks from "jest-fetch-mock";

import { useTopicsApi } from "../index";

fetchMocks.enableMocks();

describe("useTopicsApi", () => {
  test("should call api with expected params", async () => {
    fetchMocks.mockResponseOnce(async () =>
      Promise.resolve(
        JSON.stringify({ results: [{ id: 1, title: "My topic" }], total: 1 })
      )
    );
    const { result, waitForNextUpdate } = renderHook(() =>
      useTopicsApi(1, "https://api.example.com")
    );

    expect(result.current.loading).toBe(true);
    expect(Array.isArray(result.current.topics)).toBe(true);

    await waitForNextUpdate();

    expect(fetchMocks).toHaveBeenCalledWith(
      `https://api.example.com/api/v1/topics?widget=1&page=1&pagesize=100&published=1`,
      {
        method: "GET",
        credentials: "include",
        mode: "cors"
      }
    );
    expect(result.current.loading).toBe(false);
    expect(result.current.topics.length).toBe(1);
    expect(result.current.topics[0].title).toBe("My topic");
  });

  test("should handle errors", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => true);

    fetchMocks.mockResponseOnce(async () =>
      Promise.reject(JSON.stringify({ code: 500, message: "Server error" }))
    );
    const { result, waitForNextUpdate } = renderHook(() => useTopicsApi(1));

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(true);
    expect(logSpy).toHaveBeenCalledWith({
      reason: JSON.stringify({ code: 500, message: "Server error" })
    });
  });
});
