import styled, { css } from "styled-components";
import { prop, switchProp, ifProp, theme } from "styled-tools";
import HorizontalRule from "../../atoms/HorizontalRule";
import WidgetIcon from "./WidgetIcon";
import PinkGradientInversePlusButton from "../../atoms/Button/PinkGradientInversePlusButton";

import { fontFamily, palette } from "../../utils/cssVars";

const verticalCentreCss = css`
  display: flex;
  flex-direction: ${prop("$direction")};
  justify-content: center;
  align-items: ${switchProp("$direction", { column: "center", row: "start" })};
`;

export const StyledButton = styled.button`
  background: ${ifProp(
    "$active",
    theme("palette.widget.activeBackground", "rgba(0, 0, 0, 0.1)"),
    theme("palette.widget.background", "none")
  )};
  border: none;
  border-radius: 4px;
  color: ${theme("palette.widget.color", palette.grayDarkest)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  white-space: normal;
  min-width: 50px;
  transform: translateZ(0);
  padding: 7px 0 5px;
  width: 100%;

  @media (hover: hover) {
    &:hover {
      background: ${theme(
        "palette.widget.hoverBackground",
        "rgba(0, 0, 0, 0.1)"
      )};
      cursor: pointer;
      ${WidgetIcon} {
        background: ${theme(
          "palette.widgetIcon.hoverBackground",
          palette.blueGradient
        )};
      }
    }
  }

  &:focus {
    outline: none;
  }
`;

export const StyledText = styled.span`
  color: ${theme("palette.widget.color", palette.grayDarkest)};
  font-family: ${ifProp(
    "$active",
    theme("font.widget.active", fontFamily.medium),
    theme("font.widget.base", fontFamily.base)
  )};
  font-size: ${theme("fontSize.widget", "12px")};
  line-height: 1.25;
  text-align: center;
  margin: 3px 0;
  min-width: 40px;
  max-width: 70px;
  word-wrap: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow-x: visible;
  overflow-y: hidden;
  scrollbar-width: none;
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

  ${ifProp(
    "$plus",
    css`
      display: flex;
      justify-content: center;
      margin: 10px 0;
    `
  )};
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
