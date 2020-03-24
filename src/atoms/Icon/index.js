import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { prop } from "styled-tools";
import { palette } from "../../utils/cssVars";
import DotLoader from "../Loader/DotLoader";

export const StyledImgWrapper = styled.div`
  position: relative;
  height: 50px;
  width: 65px;
  border-radius: 0.25em;

  .loader {
    position: absolute;
    top: 20px;
    left: 2px;
  }
`;

export const StyledIcon = styled.div`
  display: block;
  height: 40px;
  width: 40px;
  vertical-align: top;
  mask: url(${prop("imgSrc")}) no-repeat center;
  mask-size: contain;
  background: ${palette.white};
  margin: 5px auto;
`;

const Icon = ({ loading, icon, className }) => (
  <StyledImgWrapper className={className}>
    {loading && <DotLoader className="loader" loaderWidth={60} dotSize={10} />}
    <StyledIcon imgSrc={icon} />
  </StyledImgWrapper>
);

Icon.propTypes = {
  loading: PropTypes.bool,
  icon: PropTypes.string,
  className: PropTypes.string
};

export default Icon;
