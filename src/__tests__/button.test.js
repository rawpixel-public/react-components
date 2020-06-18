import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Button } from "../index";

describe("Button", () => {
  it("should render", () => {
    const myFn = jest.fn();
    const { getByText } = render(<Button onClick={myFn}>My Button</Button>);

    fireEvent(
      getByText("My Button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(getByText("My Button")).toBeVisible();
    expect(myFn).toHaveBeenCalled();
  });

  it("should be disabled", () => {
    const myFn = jest.fn();
    const { getByText } = render(
      <Button onClick={myFn} disabled>
        My Button
      </Button>
    );

    fireEvent(
      getByText("My Button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    const instance = getByText("My Button");
    expect(instance).toBeVisible();
    expect(myFn).not.toHaveBeenCalled();
    expect(instance).toHaveAttribute("disabled");
  });
});
