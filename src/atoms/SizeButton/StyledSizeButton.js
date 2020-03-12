import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";
import { fontFamily, palette } from "../../utils/cssVars";

export const StyledSizeButton = styled.button`
  background: none;
  border: none;
  max-width: 60px;
  min-height: 80px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  &:not([disabled]):hover > div {
    background: #4b4b4c;
  }

  &:not([disabled]):hover > span {
    color: #4b4b4c;
  }

  &[disabled]:hover {
    cursor: not-allowed;
  }

  ${ifProp(
    "active",
    css`
      & > div {
        background: ${palette.grayLight};
      }
      & > span {
        color: ${palette.grayLight};
      }
    `
  )}
`;

export const StyledBlock = styled.div`
  background: #e9e9e9;
  transition: background-color linear 250ms;
`;

export const StyledTitle = styled.span`
  color: #7d7c7c;
  font-family: ${fontFamily.base};
  font-size: 12px;
  margin-top: 5px;
  transition: color linear 250ms;
  text-align: center;
`;
