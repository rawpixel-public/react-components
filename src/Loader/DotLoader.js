import React from "react";
import styled from "styled-components";
import { prop } from "styled-tools";
import PropTypes from "prop-types";

import { palette } from "../utils/cssVars";

const StyledDotLoader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 13px;

  div {
    position: absolute;
    top: 0;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${prop("color", palette.white)};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  div:nth-child(4) {
    left: 56px;
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
      transform: translate(24px, 0);
    }
  }
`;

const DotLoader = ({ className, color }) => (
  <StyledDotLoader className={className} color={color} data-testid="dot-loader">
    <div />
    <div />
    <div />
    <div />
  </StyledDotLoader>
);

DotLoader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
};

export default DotLoader;
