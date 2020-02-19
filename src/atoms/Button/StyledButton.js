import styled from "styled-components";
import { ifProp, switchProp } from "styled-tools";

import { fontFamily, palette } from "../../utils/cssVars";

// todo: consolidate website and DAM palette.
const lighterGray = "#e9e9e9";
const lightGray = "#7d7c7c";
const darkGray = "#4b4b4c";

export const StyledButton = styled.button`
  background: ${ifProp("active", darkGray, lighterGray)};
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: ${ifProp("active", palette.white, lightGray)};
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
  //padding-top: 0.5rem;
  //padding-bottom: 0.5rem;
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

  &:hover {
    cursor: pointer;
    background: ${lightGray};
    color: ${palette.white};
  }

  &[disabled]:hover {
    cursor: not-allowed;
    background: ${ifProp("active", lightGray, lighterGray)};
    color: ${ifProp("active", palette.white, lightGray)};
  }
`;
