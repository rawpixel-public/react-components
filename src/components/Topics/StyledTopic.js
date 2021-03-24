import styled, { css } from "styled-components";

import { fontFamily, palette } from "../../utils/cssVars";
import { ifNotProp, ifProp, prop, theme } from "styled-tools";

const taggedGreen = "#A1D1B7";
const taggingGreen = "#95BDAA";

const imgHoverStyles = (
  background,
  border,
  taggedBackground,
  tagModeBackground,
  taggedBorder,
  iconMask,
  iconMaskInvert
) => ({ isTagged, isTagMode, isLoading, ...props }) => {
  if (isLoading) {
    return;
  }

  let backgroundVal = background(props);
  let borderVal = border(props);
  let invert = true;

  if (isTagMode && isTagged) {
    backgroundVal = taggedBackground(props);
    borderVal = `1px solid ${taggedBorder(props)}`;
    invert = false;
  } else if (isTagMode) {
    backgroundVal = tagModeBackground(props);
  }

  return css`
    .img-wrapper {
      background: ${backgroundVal};
      border: ${borderVal};

      .mask {
        background: ${invert ? iconMaskInvert(props) : iconMask(props)};
      }

      opacity: 0.8;
    }
  `;
};

const imgBackgroundStyles = (
  background,
  border,
  activeBackground,
  taggedBackground,
  iconMask,
  iconMaskInvert
) => ({ $active, isTagged, isTagMode, ...props }) => {
  let backgroundVal = background(props);
  let borderVal = `1px solid ${border(props)}`;
  let invert = false;

  if (isTagged && isTagMode) {
    backgroundVal = taggedBackground(props);
    borderVal = "none";
    invert = true;
  } else if ($active) {
    backgroundVal = activeBackground(props);
    borderVal = "none";
    invert = true;
  }

  return css`
    background: ${backgroundVal};
    border: ${borderVal};
    .mask {
      background: ${invert ? iconMaskInvert(props) : iconMask(props)};
    }
  `;
};

export const StyledTopicButton = styled.button`
  background: ${theme("palette.topic.background", "none")};
  border: none;
  color: ${theme("palette.topic.color", palette.grayDarkest)};
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

      ${imgHoverStyles(
        theme("palette.topicButton.hoverBackground", palette.blueGradient),
        theme("palette.topicButton.hoverBorder", "none"),
        theme("palette.topicButton.hoverTaggedBackground", "transparent"),
        theme("palette.topicButton.hoverTagModeBackground", taggedGreen),
        theme(
          "palette.topicButton.hoverTaggedBorder",
          palette.topicBorderColor
        ),
        theme("palette.topicButton.hoverMaskInvert", palette.topicBorderColor),
        theme("palette.topicButton.hoverMask", palette.white)
      )};
    }
  }

  .img-wrapper {
    height: 44px;
    width: 52px;
    ${ifNotProp(
      "$active",
      css`
        border: 1px solid
          ${theme("palette.topicButton.activeBorder", palette.topicBorderColor)};
      `
    )};
    ${imgBackgroundStyles(
      theme("palette.topicButton.background", palette.topicButtonBackground),
      theme("palette.topicButton.border", palette.topicBorderColor),
      theme("palette.topicButton.activeBackground", palette.royalblue),
      theme("palette.topicButton.taggedBackground", taggedGreen),
      theme("palette.topicButton.maskInvert", palette.topicBorderColor),
      theme("palette.topicButton.mask", palette.white)
    )};
  }

  // Showing the loader sets the disabled attr, so we can use this to style
  // loading state.
  &[disabled] .img-wrapper {
    background: ${props =>
      props.isTagged || !props.isTagMode ? palette.grayLight : taggingGreen};
  }
`;

export const StyledTitle = styled.span`
  color: ${theme("palette.topic.text", palette.grayDarkest)};
  font-family: ${ifProp(
    "$active",
    theme("font.topic.active", fontFamily.medium),
    theme("font.topic.base", fontFamily.base)
  )};
  font-size: ${theme("font.topic.size", "11px")};
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
  background: ${theme("palette.topic.titleIcon", palette.grayMedium)};
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
`;
