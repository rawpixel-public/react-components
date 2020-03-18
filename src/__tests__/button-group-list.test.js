import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Button, ButtonGroupList } from "../index";

describe("button group list", () => {
  it("should render filter buttons", async () => {
    const { getByText } = render(
      <ButtonGroupList>
        <Button>PSD</Button>
      </ButtonGroupList>
    );

    expect(getByText("PSD")).toBeVisible();
  });

  it("should render title", async () => {
    const { getByText } = render(
      <ButtonGroupList title="My filter button group" headingLevel={1} />
    );

    expect(getByText("My filter button group")).toBeVisible();
    expect(getByText("My filter button group")).toBeInstanceOf(
      HTMLHeadingElement
    );
  });
});
