import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";
import { fontFamily, palette } from "../../utils/cssVars";

export const StyledSizeButton = styled.button`
  background: none;
  border: none;
  max-width: 60px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-decoration: none;
  color: #7d7c7c;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
    }

    &:not([disabled]):hover > div > div {
      background: #4b4b4c;
    }

    &:not([disabled]):hover > span {
      color: #4b4b4c;
    }

    &[disabled]:hover {
      cursor: not-allowed;
    }
  }

  ${ifProp(
    "active",
    css`
      & > div > div {
        background: #4b4b4c;
      }
      & > span {
        color: #4b4b4c;
      }
    `
  )}
`;

export const StyledBlock = styled.div`
  background: ${palette.grayLight};
  border-radius: 3px;
  transition: background-color linear 250ms;
`;

export const StyledTitle = styled.span`
  color: #4a4a4a;
  font-family: ${fontFamily.base};
  font-size: 12px;
  margin-top: 3px;
  transition: color linear 250ms;
  text-align: center;
`;

export const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 50px;
  width: 60px;
`;
