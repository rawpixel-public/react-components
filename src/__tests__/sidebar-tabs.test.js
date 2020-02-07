import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { SidebarTab, SidebarTabs } from "../sidebar-tabs";

describe("sidebar tabs", () => {
  it("should render", async () => {
    const { getByRole } = render(
      <SidebarTabs>
        <SidebarTab title="tab one">content one</SidebarTab>
        <SidebarTab title="tab two">content two</SidebarTab>
      </SidebarTabs>
    );

    expect(getByRole("tabpanel")).toHaveTextContent("content one");
    expect(getByRole("tabpanel")).not.toHaveTextContent("content two");
  });

  it("should set active tab via prop", async () => {
    const { getByRole, getByText } = render(
      <SidebarTabs activeTab={1}>
        <SidebarTab title="tab one">content one</SidebarTab>
        <SidebarTab title="tab two">content two</SidebarTab>
      </SidebarTabs>
    );

    expect(getByRole("tabpanel")).not.toHaveTextContent("content one");
    expect(getByRole("tabpanel")).toHaveTextContent("content two");

    fireEvent(
      getByText("tab one"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(getByRole("tabpanel")).not.toHaveTextContent("content one");
    expect(getByRole("tabpanel")).toHaveTextContent("content two");
  });

  it("should set active tab on click", async () => {
    const { getByRole, getByText } = render(
      <SidebarTabs>
        <SidebarTab title="tab one">content one</SidebarTab>
        <SidebarTab title="tab two">content two</SidebarTab>
      </SidebarTabs>
    );

    expect(getByRole("tabpanel")).toHaveTextContent("content one");
    expect(getByRole("tabpanel")).not.toHaveTextContent("content two");

    fireEvent(
      getByText("tab two"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(getByRole("tabpanel")).not.toHaveTextContent("content one");
    expect(getByRole("tabpanel")).toHaveTextContent("content two");
  });

  it("should call my fn on tab change", async () => {
    const myFn = jest.fn();
    const { getByText } = render(
      <SidebarTabs onTabChange={myFn}>
        <SidebarTab title="tab one">content one</SidebarTab>
        <SidebarTab title="tab two">content two</SidebarTab>
      </SidebarTabs>
    );

    fireEvent(
      getByText("tab two"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myFn).toHaveBeenCalledWith(1);
  });
});
