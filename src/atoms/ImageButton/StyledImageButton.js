import styled from "styled-components";

import { fontFamily, palette } from "../../utils/cssVars";

export const StyledImageButton = styled.button`
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

  .img-wrapper {
    background: ${palette.grayLighter};
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
`;

export const StyledImgWrapper = styled.div`
  position: relative;
  height: 50px;
  width: 60px;
  border-radius: 0.25em;

  svg {
    display: block;
    margin: 5px auto;
    height: 50px;
    width: 60px;

    image {
      height: 50px;
      width: 60px;
      // Cannot access SVG filter/stroke/fill props when loading via URL, so CSS
      // filter is necessary to apply styles to SVG images.
      filter: brightness(0) invert(1);
    }
  }

  .loader {
    position: absolute;
    top: 20px;
    left: 2px;
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
