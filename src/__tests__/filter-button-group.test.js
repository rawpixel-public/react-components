import React from "react";
import { render, fireEvent, queryByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { FilterButtonGroup } from "../index";

describe("filter button group", () => {
  it("should render published filter buttons", async () => {
    const { container, getByText } = render(
      <FilterButtonGroup
        filters={[
          { name: "PSD", published: true },
          { name: "Vector", published: false }
        ]}
      />
    );

    expect(getByText("PSD")).toBeVisible();
    expect(queryByText(container, "Vector")).not.toBeInTheDocument();
  });

  it("should render title", async () => {
    const { getByText } = render(
      <FilterButtonGroup title="My filter button group" />
    );

    expect(getByText("My filter button group")).toBeVisible();
  });

  it("should call my fn on filter click", async () => {
    const myFn = jest.fn();
    const { getByText } = render(
      <FilterButtonGroup
        onFilterClick={myFn}
        filters={[{ name: "My filter", published: true }]}
      />
    );

    fireEvent(
      getByText("My filter"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myFn).toHaveBeenCalled();
  });

  it("should render as a Link component", () => {
    const { getByText } = render(
      <FilterButtonGroup
        filters={[
          { name: "PSD", published: true, to: "/react-router-link" },
          { name: "Vector", published: true },
          { name: "JPEG", published: true, href: "https://www.rawpixel.com" }
        ]}
      />
    );

    expect(getByText("PSD")).toBeInstanceOf(HTMLAnchorElement);
    expect(getByText("Vector")).toBeInstanceOf(HTMLButtonElement);
    expect(getByText("JPEG")).toBeInstanceOf(HTMLAnchorElement);
  });
});
