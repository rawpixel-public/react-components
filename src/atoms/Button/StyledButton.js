import styled, { css } from "styled-components";
import { ifProp, prop, switchProp } from "styled-tools";

import { fontFamily, palette } from "../../utils/cssVars";

// todo: consolidate website and DAM palette.
const lighterGray = palette.grayLight;
const lightGray = "#7d7c7c";
const darkGray = palette.topicActive;
const activeText = "#f9f9f9";
const textColor = palette.grayDarkest;

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["active", "size"].includes(prop) && defaultValidatorFn(prop)
})`
  background: ${ifProp(
    "active",
    prop("theme.active.background", darkGray),
    lighterGray
  )};
  color: ${ifProp("active", prop("theme.active.color", activeText), textColor)};
  border: 1px solid transparent;
  border-radius: 0.25rem;
  display: block;
  flex: 0 1 auto;
  font-family: ${fontFamily.base};
  font-size: ${switchProp("size", {
    xsmall: "10px",
    small: "12px",
    medium: "14px",
    large: "16px",
    xlarge: "18px"
  })};
  line-height: 1;
  padding: ${switchProp("size", {
    xsmall: "0.3rem",
    small: "0.4rem",
    medium: "0.5rem",
    large: "0.6rem",
    xlarge: "0.7rem"
  })};
  text-align: center;
  text-decoration: none;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  width: 100%;
  overflow: hidden;
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      background: ${prop("theme.hover.background", darkGray)};
      color: ${prop("theme.hover.color", palette.white)};
      opacity: 0.8;
    }

    &[disabled]:hover {
      cursor: not-allowed;
      background: ${ifProp("active", lightGray, lighterGray)};
      color: ${ifProp("active", activeText, lightGray)};
    }
  }

  &[type="text"] {
    text-align: left;
    color: ${darkGray};

    @media (hover: hover) {
      &:hover {
        cursor: text;
        background-color: ${lighterGray};
      }
    }

    &:focus {
      box-shadow: 0 0 1px ${palette.green};
      transition: box-shadow 0.2s;
    }
  }

  .label {
    margin-left: 5px;
  }

  &.exclusive-button {
    padding: 6px 0;
    min-height: 34px;
    max-height: 34px;
  }

  .exclusive-icon {
    height: 20px;
    width: 20px;
  }

  .exclusive-label {
    line-height: 20px;
    margin-left: 5px;
  }

  &.logo-button {
    padding: 6px 0;
    min-height: 34px;
    max-height: 34px;
  }

  .logo-icon {
    height: 18px;
    width: 66px;
    ${ifProp(
      "active",
      css`
        background: ${palette.white};
      `
    )};
  }
  @media (hover: hover) {
    &:hover .logo-icon {
      background: ${palette.white};
    }
  }

  .logo-label {
    margin-left: 2px;
  }
`;

export const StyledIcon = styled.div`
  display: inline-block;
  height: 14px;
  width: 14px;
  vertical-align: top;
  mask: url(${prop("imgSrc")}) no-repeat center;
  background: ${prop("background")};
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
`;
