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
          : props.isDAM
          ? taggedGreen
          : palette.grayLight};
    }
  }

  .img-wrapper {
    background: ${props =>
      props.isTagged && props.isDAM ? taggedGreen : palette.grayLighter};
    transition: background-color linear 250ms;
  }

  // Showing the loader sets the disabled attr, so we can use this to style
  // loading state.
  &[disabled] .img-wrapper {
    background: ${props =>
      props.isTagged || !props.isDAM ? palette.grayLight : taggingGreen};
  }

  > span {
    min-height: 30px;
  }
`;
