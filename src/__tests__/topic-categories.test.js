import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
    const { getByText } = render(<TopicCategories categories={categories} />);

    expect(getByText("All")).toBeInTheDocument();
    expect(getByText("Elements")).toBeInTheDocument();
    expect(getByText("Stickers")).toBeInTheDocument();
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
      <TopicCategories showClear onClearClick={myFn} title="Test" />
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
});
