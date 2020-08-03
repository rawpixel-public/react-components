import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { prop } from "styled-tools";
import DotLoader from "../Loader/DotLoader";

export const StyledImgWrapper = styled.div`
  position: relative;
  height: 50px;
  width: 60px;
  border-radius: 6px;

  .loader {
    position: absolute;
    top: 20px;
    left: 2px;
  }
`;

export const StyledIcon = styled.div`
  display: block;
  height: 35px;
  width: 35px;
  background: url(${prop("imgSrc")}) no-repeat center;
  background-size: contain;
  margin: 7.5px auto;
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
