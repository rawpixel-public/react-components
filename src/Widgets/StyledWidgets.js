import styled from "styled-components";

import { fontFamily, palette } from "../utils/cssVars";

export const StyledButton = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledAnchor = styled.a`
  background: none;
  border: none;
  color: ${palette.grayMedium};
  display: inline-flex;
  flex-direction: column;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledText = styled.span`
  color: ${palette.grayMedium};
  font-family: ${fontFamily.base};
  font-size: 12px;
  text-align: center;
`;
