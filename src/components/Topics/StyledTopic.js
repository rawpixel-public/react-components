import styled from "styled-components";

import { fontFamily, palette } from "../../utils/cssVars";

const taggedGreen = "#A1D1B7";
const taggingGreen = "#95BDAA";

export const StyledTopicButton = styled.button`
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

export const StyledTitle = styled.span`
  font-family: ${fontFamily.base};
  font-size: 12px;
  text-align: center;
  line-height: 1.25;
  margin-top: 2px;
  min-width: 45px;
`;
