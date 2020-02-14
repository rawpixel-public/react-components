import React from "react";
import { queryByText } from "@testing-library/dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Topic from "../Topics/Topic";

describe("topic", () => {
  it("should render", async () => {
    const { getByText } = render(
      <Topic id="1" title="Stickers" icon="https://placehold.it/80x60" />
    );

    expect(getByText("Stickers")).toBeVisible();
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
});
