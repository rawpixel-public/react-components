import styled from "styled-components";
import { ifProp } from "styled-tools";

import { fontFamily, palette } from "../../utils/cssVars";

export const StyledImageButton = styled.button`
  background: none;
  border: none;
  color: ${palette.gray};
  max-width: 60px;
  min-height: 80px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-decoration: none;

  .img-wrapper {
    background: ${ifProp("active", palette.gray, palette.grayLighter)};
    transition: background-color linear 250ms;
  }

  &:hover {
    cursor: pointer;

    .img-wrapper {
      background: ${palette.grayLight}
  }

  // Showing the loader sets the disabled attr, so we can use this to style
  // loading state.
  &[disabled] .img-wrapper {
    background: ${palette.grayLight};
  }

  &:focus {
    outline: none;
  }
`;

export const StyledImageButtonTitle = styled.span`
  font-family: ${fontFamily.base};
  font-size: 12px;
  text-align: center;
  line-height: 1.25;
  margin-top: 2px;
  min-width: 45px;
`;
