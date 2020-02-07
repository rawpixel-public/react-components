import styled from "styled-components";
import { ifProp } from "styled-tools";

import { fontFamily, palette } from "../utils/cssVars";

export const StyledTabs = styled.div``;

export const StyledTabButton = styled.button`
  font-family: ${fontFamily.base};
  font-size: 14px;
  border: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background: ${ifProp("active", "#DADADA", "#F9F9F9")};
  color: ${palette.grayMedium};
  padding: 12px;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledTabsContent = styled.div`
  background: #dadada;
  color: ${palette.grayMedium};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  padding: 12px;

  p,
  li,
  div {
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const StyledTabsHeader = styled.div``;
