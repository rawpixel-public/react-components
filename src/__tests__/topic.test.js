import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Topic } from "../index";

describe("topic", () => {
  it("should render", async () => {
    const { getByText, getByTestId } = render(
      <Topic
        id="1"
        title="Stickers"
        icon="https://placehold.it/80x60"
        data-testid="stickers"
      />
    );

    expect(getByText("Stickers")).toBeVisible();
    expect(getByTestId("stickers")).toBeInstanceOf(HTMLButtonElement);
  });

  it("should call my fn on topic click", async () => {
    const myFn = jest.fn();
    const { getByText } = render(
      <Topic
        id="1"
        title="Stickers"
        icon="https://placehold.it/80x60"
        onTopicClick={myFn}
      />
    );

    fireEvent(
      getByText("Stickers"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myFn).toHaveBeenCalled();
  });

  it("should show loader", async () => {
    const { getByTestId } = render(
      <Topic
        id="1"
        title="Stickers"
        icon="https://placehold.it/80x60"
        isLoading
      />
    );

    expect(getByTestId("dot-loader")).toBeVisible();
  });

  it("should render as Link", () => {
    const { getByTestId } = render(
      <Topic
        id="1"
        title="Stickers"
        icon="https://placehold.it/80x60"
        isLoading
        data-testid="stickers"
        to="/stickers"
      />
    );

    expect(getByTestId("stickers")).toBeInstanceOf(HTMLAnchorElement);
  });
});
