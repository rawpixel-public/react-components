import { renderHook } from "@testing-library/react-hooks";
import fetchMocks from "jest-fetch-mock";

import { useTopicsFiltersApi } from "../index";

fetchMocks.enableMocks();

describe("useTopicsFiltersApi", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should call not api when should fetch is false", async () => {
    fetchMocks.mockResponseOnce(async () =>
      Promise.reject(JSON.stringify({ code: 500, message: "Server error" }))
    );
    renderHook(() => {
      const params = { filterId: "foo" };
      const options = { shouldFetch: false };
      return useTopicsFiltersApi(params, options);
    });
    expect(fetchMocks).not.toHaveBeenCalled();
  });
});
