import React from "react";
import { queryByText } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import TopicCategories from "../Topics/Categories";

describe("topic categories", () => {
  it("should render visible categories", async () => {
    const categories = [
      {
        title: "All",
        visible: true
      },
      {
        title: "Elements",
        isPublished: false
      },
      {
        title: "Stickers",
        visible: true
      }
    ].map((category, index) => ({ ...category, id: index }));
    const { container, getByText } = render(
      <TopicCategories categories={categories} />
    );

    expect(getByText("All")).toBeInTheDocument();
    expect(queryByText(container, "Elements")).not.toBeInTheDocument();
    expect(getByText("Stickers")).toBeInTheDocument();
  });

  it("should call my fn on category click", async () => {
    const categories = [
      {
        title: "All",
        visible: true
      },
      {
        title: "Elements",
        isPublished: false
      },
      {
        title: "Stickers",
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
});
