/* eslint-disable react/prop-types */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import filterAllowedProps from "filter-react-props";

import { Topic } from "../index";

describe("topic", () => {
  it("should render", async () => {
    const { getByText, getByTestId } = render(
      <Topic
        id="1"
        name="Stickers"
        icon="https://placehold.it/80x60"
        data-testid="stickers"
      />
    );

    expect(getByText("Stickers")).toBeVisible();
    expect(getByTestId("stickers")).toBeInstanceOf(HTMLButtonElement);
  });

  it("should call my fn on topic click", async () => {
    const myFn = jest.fn((event, topic) => topic);
    const topic = {
      name: "Stickers",
      tag: "$stickers",
      dam_tam_tag: "stickers"
    };
    const { getByText } = render(
      <Topic
        id="1"
        name="Stickers"
        icon="https://placehold.it/80x60"
        onTopicClick={myFn}
        topic={topic}
      />
    );

    fireEvent(
      getByText("Stickers"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myFn).toHaveReturnedWith(topic);
  });

  it("should show loader", async () => {
    const { getByTestId } = render(
      <Topic
        id="1"
        name="Stickers"
        icon="https://placehold.it/80x60"
        isLoading
      />
    );

    expect(getByTestId("dot-loader")).toBeVisible();
  });

  it("should render as anchor element", () => {
    const { getByTestId } = render(
      <Topic
        as="a"
        id="1"
        name="Stickers"
        icon="https://placehold.it/80x60"
        data-testid="stickers"
        href="https://www.rawpixel.com/stickers"
      />
    );

    expect(getByTestId("stickers")).toBeInstanceOf(HTMLAnchorElement);
  });

  it("should render as custom element", () => {
    // This could be an external component e.g. the Link component from react-router.
    const CustomElement = props => {
      return (
        <>
          <h1 {...filterAllowedProps(props)}>{props.to}</h1>
          {props.children}
        </>
      );
    };
    const { getByTestId, getByText } = render(
      <Topic
        as={CustomElement}
        id="1"
        name="Stickers"
        icon="https://placehold.it/80x60"
        data-testid="stickers"
        to="https://www.rawpixel.com/stickers"
      />
    );

    expect(getByTestId("stickers")).toBeInstanceOf(HTMLHeadingElement);
    expect(getByText("https://www.rawpixel.com/stickers")).toBeVisible();
  });
});
