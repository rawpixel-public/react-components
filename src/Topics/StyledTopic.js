import styled from "styled-components";

import { fontFamily, palette } from "../utils/cssVars";

export const StyledTopicButton = styled.button`
  background: none;
  border: none;
  max-width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;

    .img-wrapper {
      background: ${props =>
        props.isTagged ? palette.grayLighter : "#A1D1B7"};
    }
  }

  .img-wrapper {
    background: ${props => (props.isTagged ? "#A1D1B7" : palette.grayLighter)};
    transition: background-color linear 250ms;
  }

  // Showing the loader sets the disabled attr, so we can use this to style
  // loading state.
  &[disabled] .img-wrapper {
    background: ${props => (props.isTagged ? palette.grayLight : "#95BDAA")};
  }
`;

export const StyledImgWrapper = styled.div`
  position: relative;
  height: 70px;
  width: 80px;

  svg {
    height: 70px;
    width: 80px;

    image {
      height: 70px;
      width: 80px;
      // Cannot access SVG filter/stroke/fill props when loading via URL, so CSS
      // filter is necessary to apply styles to SVG images.
      filter: brightness(0) invert(1);
    }
  }

  .loader {
    position: absolute;
    top: 30px;
  }
`;

export const StyledTopicTitle = styled.span`
  font-family: ${fontFamily.base};
  font-size: 12px;
  text-align: center;
  line-height: 1.5;
`;
