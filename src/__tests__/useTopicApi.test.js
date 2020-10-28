import { renderHook } from "@testing-library/react-hooks";
import fetchMocks from "jest-fetch-mock";

import { useTopicsApi } from "../index";

fetchMocks.enableMocks();

describe("useTopicsApi", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should call api with expected params once", async () => {
    fetchMocks.mockResponseOnce(async () =>
      Promise.resolve(
        JSON.stringify({ results: [{ id: 1, title: "My topic" }], total: 1 })
      )
    );
    const { result, waitForNextUpdate } = renderHook(() => {
      const params = { widget: 1 };
      const options = { baseUrl: "https://api.example.com" };
      return useTopicsApi(params, options);
    });

    expect(result.current.loading).toBe(true);
    expect(Array.isArray(result.current.topics)).toBe(true);

    await waitForNextUpdate();

    expect(fetchMocks).toHaveBeenCalledWith(
      `https://api.example.com/api/v1/topics?widget=1&target=website&page=1&pagesize=100&published=1&internal=0`,
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
    fetchMocks.mockResponseOnce(async () =>
      Promise.reject(JSON.stringify({ code: 500, message: "Server error" }))
    );
    const { result, waitForNextUpdate } = renderHook(() => {
      const params = { widget: 1 };
      const options = { baseUrl: "https://api.example.com" };
      return useTopicsApi(params, options);
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(true);
  });

  test("should not call the api when fetch is false", async () => {
    fetchMocks.mockResponseOnce(async () =>
      Promise.reject(JSON.stringify({ code: 500, message: "Server error" }))
    );
    renderHook(() => {
      const params = { widget: 1 };
      const options = {
        baseUrl: "https://api.example.com",
        shouldFetch: false
      };
      return useTopicsApi(params, options);
    });
    expect(fetchMocks).not.toHaveBeenCalled();
  });
});
