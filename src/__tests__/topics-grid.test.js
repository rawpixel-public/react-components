import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { TopicsGrid } from "../index";

describe("topic grid", () => {
  const generateTopics = length =>
    [...Array(length)].map((_, index) => ({
      name: `Topic ${index}`,
      id: index.toString(),
      icon: "https://placehold.it/80x60"
    }));

  it("should render topics", async () => {
    const { getByText } = render(<TopicsGrid topics={generateTopics(9)} />);

    expect(getByText(`Topic ${Math.floor(Math.random() * 9)}`)).toBeVisible();
  });

  it("should call my fn on topic click", async () => {
    const myFn = jest.fn();
    const { getByText } = render(
      <TopicsGrid onTopicClick={myFn} topics={generateTopics(9)} />
    );

    fireEvent(
      getByText(`Topic ${Math.floor(Math.random() * 9)}`),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myFn).toHaveBeenCalled();
  });

  it("should render placeholders while loading", async () => {
    const { getByTestId } = render(<TopicsGrid topics={[]} loading />);

    expect(getByTestId(`topics-placeholder-0`)).toBeVisible();
  });

  it("should pass down to prop to render as Link", () => {
    const { getByTestId } = render(
      <TopicsGrid
        topics={generateTopics(2).map(topic => ({
          ...topic,
          to: topic.id === "1" ? `/topic/${topic.id}` : null
        }))}
      />
    );
    expect(getByTestId("1")).toBeInstanceOf(HTMLAnchorElement);
    expect(getByTestId("0")).toBeInstanceOf(HTMLButtonElement);
  });
});
