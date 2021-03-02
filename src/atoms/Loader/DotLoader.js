import React from "react";
import styled from "styled-components";
import { prop } from "styled-tools";
import PropTypes from "prop-types";

import { palette } from "../../utils/cssVars";

const initialPosition = width => parseInt(width) / 10;
const middlePosition = width => parseInt(width) / 2.5;
const endPosition = width => parseInt(width) / 1.42;
const transitionSize = width => endPosition(width) - middlePosition(width);

const StyledDotLoader = styled.div`
  display: inline-block;
  position: relative;
  width: ${prop("$loaderWidth")}px;
  height: ${prop("$dotSize")}px;

  div {
    position: absolute;
    top: 0;
    width: ${prop("$dotSize")}px;
    height: ${prop("$dotSize")}px;
    border-radius: 50%;
    background: ${prop("$color", palette.white)};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: ${props => initialPosition(props.$loaderWidth)}px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  div:nth-child(2) {
    left: ${props => initialPosition(props.$loaderWidth)}px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  div:nth-child(3) {
    left: ${props => middlePosition(props.$loaderWidth)}px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  div:nth-child(4) {
    left: ${props => endPosition(props.$loaderWidth)}px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(${props => transitionSize(props.$loaderWidth)}px, 0);
    }
  }
`;

const DotLoader = ({ className, color, dotSize = 13, loaderWidth = 80 }) => (
  <StyledDotLoader
    className={className}
    $color={color}
    data-testid="dot-loader"
    $dotSize={dotSize}
    $loaderWidth={loaderWidth}
  >
    <div />
    <div />
    <div />
    <div />
  </StyledDotLoader>
);

DotLoader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  dotSize: PropTypes.number,
  loaderWidth: PropTypes.number
};

export default DotLoader;
