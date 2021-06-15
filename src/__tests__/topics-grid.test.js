import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { TopicsGrid } from "../index";

describe("topic grid", () => {
  beforeAll(() => {
    global.document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document
      },
      getBoundingClientRect: () => ({ height: 0 })
    });
  });

  const generateTopics = length =>
    [...Array(length)].map((_, index) => ({
      title: `Topic ${index}`,
      id: index.toString(),
      icon_url: "https://placehold.it/80x60"
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
});
