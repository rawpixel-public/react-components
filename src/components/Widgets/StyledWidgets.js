import styled, { css } from "styled-components";
import { prop, switchProp, ifProp } from "styled-tools";
import HorizontalRule from "../../atoms/HorizontalRule";

import { fontFamily, palette } from "../../utils/cssVars";

const verticalCentreCss = css`
  display: flex;
  flex-direction: ${prop("direction")};
  justify-content: center;
  align-items: ${switchProp("direction", { column: "center", row: "start" })};
`;

export const StyledButton = styled.button`
  background: none;
  border: none;
  color: ${palette.grayMedium};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  white-space: normal;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export const StyledText = styled.span`
  color: ${palette.grayMedium};
  font-family: ${fontFamily.base};
  font-size: 12px;
  font-weight: ${ifProp("active", "700", "400")};
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
`;

export const StyledWidgetsWrapper = styled.div`
  ${verticalCentreCss};
  padding: 10px 0;
  width: 70px;

  ${props =>
    props.direction === "column" &&
    css`
      max-width: 70px;
      hr {
        margin: 0 0 16px;
      }
    `};
`;

export const StyledUnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${verticalCentreCss};
`;

export const StyledListItem = styled.li`
  margin-bottom: 14px;

  &:first-child {
    margin-top: 4px;
  }
`;

export const StyledHR = styled(HorizontalRule)`
  width: 50px;

  ${props =>
    props.direction === "row" &&
    css`
      margin: 0 10px;
      height: 50px;
      width: 2px;
    `};
`;
