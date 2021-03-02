import styled, { css } from "styled-components";

import { fontFamily, palette } from "../../utils/cssVars";
import { ifNotProp, ifProp, prop } from "styled-tools";

const taggedGreen = "#A1D1B7";
const taggingGreen = "#95BDAA";

const imgHoverStyles = ({ isTagged, isTagMode, isLoading }) => {
  if (isLoading) {
    return;
  }

  let background = palette.topicGradient;
  let border = "none";
  let invert = true;

  if (isTagMode && isTagged) {
    background = "transparent";
    border = `1px solid ${palette.topicBorderColor}`;
    invert = false;
  } else if (isTagMode) {
    background = taggedGreen;
  }

  return css`
    background: ${background};
    border: ${border};
    .mask {
      background: ${invert ? palette.white : palette.topicBorderColor};
    }
    opacity: 0.8;
  `;
};

const imgBackgroundStyles = ({ $active, isTagged, isTagMode }) => {
  let background = palette.topicButtonBackground;
  let border = `1px solid ${palette.topicBorderColor}`;
  let invert = false;

  if (isTagged && isTagMode) {
    background = taggedGreen;
    border = "none";
    invert = true;
  } else if ($active) {
    background = palette.topicGradient;
    border = "none";
    invert = true;
  }

  return css`
    background: ${background};
    border: ${border};
    .mask {
      background: ${invert ? palette.white : palette.topicBorderColor};
    }
  `;
};

export const StyledTopicButton = styled.button`
  background: none;
  border: none;
  color: #4a4a4a;
  width: 60px;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-decoration: none;
  justify-self: start;
  padding: 0;
  overflow: visible;
  align-self: start;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;

      .img-wrapper {
        ${imgHoverStyles};
      }
    }
  }

  .img-wrapper {
    height: 44px;
    width: 52px;
    ${ifNotProp(
      "$active",
      css`
        border: 1px solid ${palette.topicBorderColor};
      `
    )};
    ${imgBackgroundStyles};
  }

  // Showing the loader sets the disabled attr, so we can use this to style
  // loading state.
  &[disabled] .img-wrapper {
    background: ${props =>
      props.isTagged || !props.isTagMode ? palette.grayLight : taggingGreen};
  }
`;

export const StyledTitle = styled.span`
  color: ${palette.grayDarkest};
  font-family: ${ifProp("$active", fontFamily.medium, fontFamily.base)};
  font-size: 11px;
  text-align: center;
  line-height: 1.2;
  margin-top: 3px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: normal;
  overflow: hidden;
  word-break: break-word;
  position: relative;

  ${ifProp(
    "$isHyphenated",
    css`
      word-break: break-all;
      padding-right: 4px;

      &:after {
        content: "-";
        position: absolute;
        right: 0;
        top: 0;
      }
    `
  )};

  ${props =>
    props.$isHyphenated &&
    props.$hasIcon &&
    css`
      &:after {
        right: 2px;
      }
    `};

  ${props =>
    props.$isMulti &&
    props.$hasIcon &&
    css`
      -webkit-box-orient: unset;
      text-align: left;
    `};
`;

export const StyledIcon = styled.div`
  display: inline-block;
  height: 9px;
  width: 9px;
  margin-right: 2px;
  vertical-align: baseline;
  mask: url(${prop("$url")}) no-repeat center;
  mask-size: contain;
  background: ${palette.grayMedium};
  flex-shrink: 0;
`;

export const StyledTitleWrapper = styled.div`
  display: flex;
  align-content: center;
  align-items: baseline;
  justify-content: center;
  width: 52px;
  margin: auto;
`;

export const StyledIconWrapper = styled.div`
  height: 44px;
  width: 52px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-shrink: 0;

  svg,
  img {
    height: 30px;
    width: 30px;
  }

  img[alt] {
    color: transparent;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const Mask = styled.div`
  mask: url(${prop("$url")});
  height: 30px;
  width: 30px;
  background: ${palette.topicBorderColor};
`;
