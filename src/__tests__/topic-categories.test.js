import React from "react";
import { render, fireEvent, queryByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Categories as TopicCategories } from "../index";

describe("topic categories", () => {
  it("should render categories", async () => {
    const categories = [
      {
        name: "All"
      },
      {
        name: "Elements"
      },
      {
        name: "Stickers"
      }
    ].map((category, index) => ({ ...category, id: index }));
    const { getByText, container } = render(
      <TopicCategories categories={categories} />
    );

    expect(getByText("All")).toBeInTheDocument();
    expect(getByText("Elements")).toBeInTheDocument();
    expect(getByText("Stickers")).toBeInTheDocument();

    expect(queryByTestId(container, "category-title-placeholder")).not.toBeInTheDocument();
    expect(queryByTestId(container,"category-buttons-placeholder")).not.toBeInTheDocument();
  });

  it("should call my fn on category click", async () => {
    const categories = [
      {
        name: "All",
        visible: true
      },
      {
        name: "Elements",
        isPublished: false
      },
      {
        name: "Stickers",
        visible: true
      }
    ].map((category, index) => ({ ...category, id: index }));
    const myFn = jest.fn();
    const { getByText } = render(
      <TopicCategories categories={categories} onCategoryClick={myFn} />
    );

    fireEvent(
      getByText("All"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myFn).toHaveBeenCalled();
  });

  it("should call my fn on clear click", async () => {
    const myFn = jest.fn();
    const { getByText } = render(
      <TopicCategories showClear onClearClick={myFn} />
    );

    fireEvent(
      getByText("Clear"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myFn).toHaveBeenCalled();
  });

  it("should show 'next' control when there are more categories than visible space", async () => {
    const categories = [
      {
        name: "All",
        visible: true
      },
      {
        name: "Elements",
        visible: true
      },
      {
        name: "Stickers",
        visible: true
      },
      {
        name: "Graphics",
        visible: true
      }
    ].map((category, index) => ({ ...category, id: index }));
    const { getByTestId } = render(<TopicCategories categories={categories} />);

    expect(getByTestId("previous")).toHaveAttribute("disabled");
    expect(getByTestId("next")).not.toHaveAttribute("disabled");

    fireEvent(
      getByTestId("next"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(getByTestId("previous")).not.toHaveAttribute("disabled");
    expect(getByTestId("next")).toHaveAttribute("disabled");
  });

  it("should not show controls when not enough visible categories", async () => {
    const categories = [
      {
        name: "All",
        visible: true
      },
      {
        name: "Elements",
        visible: true
      }
    ].map((category, index) => ({ ...category, id: index }));
    const { container, queryByTestId } = render(
      <TopicCategories categories={categories} />
    );

    expect(queryByTestId(container, "previous")).not.toBeInTheDocument();
    expect(queryByTestId(container, "next")).not.toBeInTheDocument();
  });

  it("should show placeholders while loading", async () => {
    const { getByTestId } = render(<TopicCategories loading categories={[]} />);
    expect(getByTestId("category-title-placeholder")).toBeVisible();
    expect(getByTestId("category-buttons-placeholder")).toBeVisible();
  });
});
