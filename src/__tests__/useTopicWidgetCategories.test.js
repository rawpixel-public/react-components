import { renderHook, act } from "@testing-library/react-hooks";
import useTopicWidgetCategories from "../hooks/useTopicWidgetCategories";

describe("useTopicWidgetCategories", () => {
  test("should get categories from widget", () => {
    const widget = { subCategories: [{ name: "Test" }] };
    const { result } = renderHook(() => useTopicWidgetCategories(widget));
    const { categories, setActiveCategory } = result.current;

    expect(categories.length).toBe(2);
    expect(typeof setActiveCategory).toBe("function");
  });

  test("should set active category", () => {
    const testCat = { name: "Test" };
    const widget = { subCategories: [testCat] };
    const { result } = renderHook(() => useTopicWidgetCategories(widget));

    // All is active by default.
    expect(result.current.categories.find(({ active }) => !!active).name).toBe(
      "All"
    );

    act(() => {
      result.current.setActiveCategory(testCat);
    });

    expect(
      result.current.categories.find(({ name }) => name === "Test").active
    ).toBe(true);

    act(() => {
      result.current.setActiveCategory(testCat);
    });

    expect(
      result.current.categories.find(({ name }) => name === "Test").active
    ).toBe(false);
  });
});
