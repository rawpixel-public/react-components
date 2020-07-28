import styled from "styled-components";
import { ifProp, prop, switchProp } from "styled-tools";

import { fontFamily, palette } from "../../utils/cssVars";

// todo: consolidate website and DAM palette.
const lighterGray = "#eee";
const lightGray = "#7d7c7c";
const darkGray = palette.topicActive;
const activeText = "#f9f9f9";
const textColor = "#4a4a4a";

export const StyledButton = styled.button`
  background: ${ifProp("active", darkGray, lighterGray)};
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: ${ifProp("active", activeText, textColor)};
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
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
  width: 100%;
  overflow: hidden;
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      background: ${lightGray};
      color: ${palette.white};
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
`;

export const StyledIcon = styled.div`
  display: inline-block;
  height: 14px;
  width: 14px;
  vertical-align: top;
  mask: url(${prop("imgSrc")}) no-repeat center;
  background: ${prop("background")};
`;
