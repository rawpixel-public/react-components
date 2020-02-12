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
        visible: false
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

  it("should show 'next' control when there are more categories than visible space", async () => {
    const categories = [
      {
        title: "All",
        visible: true
      },
      {
        title: "Elements",
        visible: true
      },
      {
        title: "Stickers",
        visible: true
      },
      {
        title: "Graphics",
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
        title: "All",
        visible: true
      },
      {
        title: "Elements",
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
