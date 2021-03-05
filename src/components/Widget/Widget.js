import styled from "styled-components";
import { ifProp, theme } from "styled-tools";
import MaskImage from "../../atoms/MaskImage";

import { fontFamily, palette } from "../../utils/cssVars";

export const Button = styled.button`
  background: ${ifProp(
    "$active",
    theme("palette.widget.activeBackground", "none"),
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

  ${MaskImage} {
    background: ${theme("palette.widgetIcon.background", palette.fuscous)};
    &.active {
      background: ${theme(
        "palette.widgetIcon.activeBackground",
        palette.blueGradient
      )};
    }
  }

  @media (hover: hover) {
    &:hover {
      background: ${theme("palette.widget.hoverBackground", "none")};
      cursor: pointer;
      ${MaskImage} {
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

export const Label = styled.span`
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
