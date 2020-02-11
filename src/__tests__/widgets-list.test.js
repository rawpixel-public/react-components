import React from "react";
import { queryByText } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import WidgetsList from "../Widgets/List";

describe("widgets list", () => {
  it("should render published widgets", async () => {
    const widgets = [
      {
        title: "My topics",
        type: "filter",
        icon: "https://placehold.it/40x40",
        isPublished: true
      },
      {
        title: "Trending",
        type: "filter",
        icon: "https://placehold.it/40x40",
        isPublished: false
      },
      {
        title: "Fonts",
        type: "addon",
        url: "https://www.example.com",
        icon: "https://placehold.it/40x40",
        isPublished: true
      },
      {
        title: "Lightroom Presets",
        type: "addon",
        url: "https://www.example.com",
        icon: "https://placehold.it/40x40",
        isPublished: false
      }
    ];
    const { container, getByText } = render(<WidgetsList widgets={widgets} />);

    expect(getByText("My topics")).toBeInTheDocument();
    expect(queryByText(container, "Trending")).not.toBeInTheDocument();
    expect(getByText("Fonts")).toBeInTheDocument();
    expect(queryByText(container, "Lightroom Presets")).not.toBeInTheDocument();
  });

  it("should call my fn on filter click", async () => {
    const widgets = [
      {
        title: "My topics",
        type: "filter",
        icon: "https://placehold.it/40x40",
        isPublished: true
      },
      {
        title: "Trending",
        type: "filter",
        icon: "https://placehold.it/40x40",
        isPublished: true
      }
    ];
    const myFn = jest.fn();
    const { getByText } = render(
      <WidgetsList widgets={widgets} onFilterClick={myFn} />
    );

    fireEvent(
      getByText("My topics"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myFn).toHaveBeenCalled();
  });
});
