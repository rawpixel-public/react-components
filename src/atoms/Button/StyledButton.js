import styled from "styled-components";

import { fontFamily, palette } from "../../utils/cssVars";

// todo: consolidate website and DAM palette.
const lightGray = "#7d7c7c";
const darkGray = "#4b4b4c";

export const StyledButton = styled.button`
  background: #e9e9e9;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: ${lightGray};
  display: block;
  flex: 1 1 0;
  font-family: ${fontFamily.base};
  font-size: 0.875rem;
  line-height: 1;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
  width: 100%;

  &:hover {
    cursor: pointer;
    background: ${darkGray};
    color: ${palette.white};
  }
`;
