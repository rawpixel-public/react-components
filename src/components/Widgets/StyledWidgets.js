import styled, { css } from "styled-components";
import { prop, switchProp, ifProp, theme } from "styled-tools";
import HorizontalRule from "../../atoms/HorizontalRule";
import PinkGradientInversePlusButton from "../../atoms/Button/PinkGradientInversePlusButton";

const verticalCentreCss = css`
  display: flex;
  flex-direction: ${prop("$direction")};
  justify-content: center;
  align-items: ${switchProp("$direction", { column: "center", row: "start" })};
`;

export const StyledWidgetsWrapper = styled.div`
  ${verticalCentreCss};
  padding: 10px 0;
  width: 70px;

  ${ifProp(
    { $direction: "column" },
    css`
      max-width: 70px;
      hr {
        margin: 0 0 16px;
      }
    `
  )};

  ${ifProp(
    { $direction: "row" },
    css`
      ${PinkGradientInversePlusButton} {
        margin: 5px 10px;
      }
    `
  )};
`;

export const StyledUnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${verticalCentreCss};

  ${ifProp(
    { $direction: "column" },
    css`
      li:first-child {
        margin-top: 4px;
      }
    `
  )};

  ${ifProp(
    { $direction: "row" },
    css`
      li {
        width: 70px;
        height: 70px;
      }
    `
  )}
`;

export const StyledListItem = styled.li`
  margin-bottom: 7px;
  flex-grow: 1;
  width: 100%;
  min-width: 70px;

  ${ifProp(
    "$plus",
    css`
      display: flex;
      justify-content: center;
      margin: 10px 0;
    `
  )};

  &:hover:not(.widgets-plus-wrapper) {
    border-radius: 4px;
    background: ${theme(
      "palette.widgets.hoverBackground",
      "rgba(0, 0, 0, 0.1)"
    )};
  }

  ${ifProp(
    "$active",
    css`
      &:not(.widgets-plus-wrapper) {
        border-radius: 4px;
        background: ${theme(
          "palette.widgets.activeBackground",
          "rgba(0, 0, 0, 0.1)"
        )};
      }
    `
  )}
`;

export const StyledHR = styled(HorizontalRule)`
  width: 50px;

  ${ifProp(
    { $direction: "row" },
    css`
      margin: 0 10px;
      height: 60px;
      width: 1px;
    `
  )};
`;
