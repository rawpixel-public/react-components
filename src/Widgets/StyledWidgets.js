import styled, { css } from "styled-components";

import { fontFamily, palette } from "../utils/cssVars";

const verticalCentreCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledButton = styled.button`
  background: none;
  border: none;
  ${verticalCentreCss};

  &:hover {
    cursor: pointer;
  }
`;

export const StyledAnchor = styled.a`
  background: none;
  border: none;
  color: ${palette.grayMedium};
  text-decoration: none;
  ${verticalCentreCss};

  &:hover {
    cursor: pointer;
  }
`;

export const StyledText = styled.span`
  color: ${palette.grayMedium};
  font-family: ${fontFamily.base};
  font-size: 10px;
  line-height: 1.25;
  text-align: center;
`;

export const StyledWidgetsWrapper = styled.div`
  max-width: 60px;
  ${verticalCentreCss};
`;

export const StyledUnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${verticalCentreCss};
`;

export const StyledListItem = styled.li`
  margin-bottom: 10px;
`;

export const StyledHR = styled.hr`
  color: ${palette.grayLighter};
  width: 40px;
  height: 2px;
  background: ${palette.grayLighter};
  border: none;
  margin-bottom: 10px;
`;
