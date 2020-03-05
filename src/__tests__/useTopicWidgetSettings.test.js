import { renderHook } from "@testing-library/react-hooks";
import { useTopicWidgetSettings } from "../index";

describe("useTopicWidgetSettings", () => {
  test("should handle undefined gracefully", () => {
    const widget = undefined;
    const { result } = renderHook(() =>
      useTopicWidgetSettings("website_content", widget)
    );
    const expectedArrays = ["main", "fileTypes", "filters"];

    expectedArrays.forEach(key =>
      expect(Array.isArray(result.current[key])).toBe(true)
    );
  });

  test("should handle undefined props gracefully", () => {
    const widget = {};
    const { result } = renderHook(() =>
      useTopicWidgetSettings("website_content", widget)
    );
    const expectedArrays = ["main", "fileTypes", "filters"];

    expectedArrays.forEach(key =>
      expect(Array.isArray(result.current[key])).toBe(true)
    );
  });

  test("team catalog should have secondary filters", () => {
    const widget = {
      damFilters: {
        team: {
          secondaryFilters: [{ id: 1, name: "Secondary Filter" }]
        }
      }
    };
    const { result } = renderHook(() => useTopicWidgetSettings("team", widget));
    const expectedArrays = ["main", "fileTypes", "filters", "secondaryFilters"];

    expectedArrays.forEach(key =>
      expect(Array.isArray(result.current[key])).toBe(true)
    );
    expect(result.current.secondaryFilters[0].name).toBe("Secondary Filter");
  });
});
