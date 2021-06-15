/* eslint-disable react/prop-types */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WidgetsBar } from "../index";

describe("widgets bar", () => {
  it("should render widgets", async () => {
    const widgets = [
      {
        title: "My topics",
        type: "topic_group",
        icon_url: "https://placehold.it/40x40"
      },
      {
        title: "Trending",
        type: "topic_group",
        icon_url: "https://placehold.it/40x40"
      },
      {
        title: "Fonts",
        type: "add_on",
        url: "https://www.example.com",
        icon_url: "https://placehold.it/40x40"
      },
      {
        title: "Lightroom Presets",
        type: "add_on",
        url: "https://www.example.com",
        icon_url: "https://placehold.it/40x40"
      }
    ];
    const { getByText } = render(<WidgetsBar widgets={widgets} />);

    expect(getByText("My topics")).toBeInTheDocument();
    expect(getByText("Trending")).toBeInTheDocument();
    expect(getByText("Fonts")).toBeInTheDocument();
    expect(getByText("Lightroom Presets")).toBeInTheDocument();
  });

  it("should call my fn on filter click", async () => {
    const widgets = [
      {
        title: "My topics",
        type: "topic_group",
        icon_url: "https://placehold.it/40x40",
        isPublished: true
      },
      {
        title: "Trending",
        type: "topic_group",
        icon_url: "https://placehold.it/40x40",
        isPublished: true
      }
    ];
    const myFn = jest.fn();
    const { getByText } = render(
      <WidgetsBar widgets={widgets} onFilterClick={myFn} />
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

  it("should render widgets as passed in component", async () => {
    const CustomTopicGroup = props => (
      <span {...props}>custom topic {props.children}</span>
    );
    const CustomAddon = props => (
      <a {...props}>custom addon {props.children}</a>
    );

    const widgets = [
      {
        title: "My topics",
        type: "topic_group",
        icon_url: "https://placehold.it/40x40"
      },
      {
        title: "Fonts",
        type: "add_on",
        url: "https://www.example.com",
        icon_url: "https://placehold.it/40x40"
      }
    ];
    const { getByText } = render(
      <WidgetsBar
        widgets={widgets}
        topicGroupComponent={CustomTopicGroup}
        addonComponent={CustomAddon}
      />
    );

    expect(getByText("My topics")).toBeInTheDocument();
    expect(getByText("Fonts")).toBeInTheDocument();
    expect(getByText("custom topic")).toBeInstanceOf(HTMLSpanElement);
    expect(getByText("custom addon")).toBeInstanceOf(HTMLAnchorElement);
  });

  it("should render plus button", async () => {
    const myFn = jest.fn();
    const { getByTestId } = render(
      <WidgetsBar widgets={[]} plusButton onPlusClick={myFn} />
    );
    expect(getByTestId("widgets-plus")).toBeInTheDocument();

    fireEvent(
      getByTestId("widgets-plus"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myFn).toHaveBeenCalled();
  });
});
