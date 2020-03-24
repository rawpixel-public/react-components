import styled, { css } from "styled-components";
import { prop, switchProp } from "styled-tools";
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
  font-size: 10px;
  line-height: 1.5;
  text-align: center;
  margin: 3px 0;
  min-width: 40px;
  max-width: 60px;
  word-wrap: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledWidgetsWrapper = styled.div`
  ${props => (props.direction === "column" ? "max-width: 80px;" : null)};
  ${verticalCentreCss};
  padding: 10px 0;
  width: 80px;
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
