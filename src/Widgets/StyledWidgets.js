import styled, { css } from "styled-components";
import { prop } from "styled-tools";

import { fontFamily, palette } from "../utils/cssVars";

const verticalCentreCss = css`
  display: flex;
  flex-direction: ${prop("direction")};
  justify-content: center;
`;

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
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;

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
  ${props => (props.direction === "column" ? "max-width: 60px;" : null)};
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
  background: ${palette.grayLighter};
  border: none;

  ${props =>
    props.direction === "row"
      ? css`
          margin: 0 10px;
          height: 40px;
          width: 2px;
        `
      : css`
          margin-bottom: 10px;
          height: 2px;
          width: 40px;
        `};
`;
