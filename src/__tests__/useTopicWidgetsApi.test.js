import { renderHook } from "@testing-library/react-hooks";
import fetchMocks from "jest-fetch-mock";

import { useTopicWidgetsApi } from "../index";

fetchMocks.enableMocks();

describe("useTopicWidgets", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should call api with expected params", async () => {
    fetchMocks.mockResponseOnce(async () =>
      Promise.resolve(JSON.stringify([{ id: 1, title: "My widget" }]))
    );
    const { result, waitForNextUpdate } = renderHook(() => {
      const params = { target: "foo", catalog: "bar" };
      const options = { baseUrl: "https://api.example.com" };
      return useTopicWidgetsApi(params, options);
    });

    expect(result.current.loading).toBe(true);
    expect(Array.isArray(result.current.widgets)).toBe(true);

    await waitForNextUpdate();

    expect(fetchMocks).toHaveBeenCalledWith(
      `https://api.example.com/_services/topics/sidebar/widgets?target=foo&catalog=bar`,
      {
        method: "GET",
        credentials: "include",
        mode: "cors"
      }
    );
    expect(result.current.loading).toBe(false);
    expect(result.current.widgets.length).toBe(1);
    expect(result.current.widgets[0].title).toBe("My widget");
  });

  test("should handle errors", async () => {
    fetchMocks.mockResponseOnce(async () =>
      Promise.reject(JSON.stringify({ code: 500, message: "Server error" }))
    );
    const { result, waitForNextUpdate } = renderHook(() => {
      const params = { target: "website" };
      const options = { baseUrl: "https://api.example.com" };
      return useTopicWidgetsApi(params, options);
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeTruthy();
  });
});
