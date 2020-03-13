import styled from "styled-components";
import ImageButton from "../../atoms/ImageButton";

import { palette } from "../../utils/cssVars";

const taggedGreen = "#A1D1B7";
const taggingGreen = "#95BDAA";

export const StyledTopicButton = styled(ImageButton)`
  &:hover {
    cursor: pointer;

    .img-wrapper {
      background: ${props =>
        props.isTagged
          ? palette.grayLighter
          : props.isTagMode
          ? taggedGreen
          : palette.grayLight};
    }
  }

  .img-wrapper {
    background: ${props =>
      props.isTagged && props.isTagMode
        ? taggedGreen
        : props.active
        ? palette.grayLight
        : palette.grayLighter};
    transition: background-color linear 250ms;
  }

  // Showing the loader sets the disabled attr, so we can use this to style
  // loading state.
  &[disabled] .img-wrapper {
    background: ${props =>
      props.isTagged || !props.isTagMode ? palette.grayLight : taggingGreen};
  }

  > span {
    min-height: 30px;
  }
`;
