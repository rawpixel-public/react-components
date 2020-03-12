import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SizeButton } from "../index";

describe("SizeButton", () => {
  it("should render", () => {
    const myFn = jest.fn();
    const { getByText } = render(
      <SizeButton title="Portrait" height={30} width={20} onClick={myFn} />
    );

    fireEvent(
      getByText("Portrait"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(getByText("Portrait")).toBeVisible();
    expect(myFn).toHaveBeenCalled();
  });

  it("should pass through props e.g. rendering as link", () => {
    const { getByTestId } = render(
      <SizeButton
        title="Portrait"
        height={30}
        width={20}
        href="https://www.rawpixel.com"
        as="a"
        target="_blank"
        data-testid="test"
      />
    );
    expect(getByTestId("test")).toBeInstanceOf(HTMLAnchorElement);
    expect(getByTestId("test").target).toBe("_blank");
  });
});
