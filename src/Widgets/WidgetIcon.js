import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSVG = styled.svg`
  height: 40px;
  width: 40px;
  margin: auto;

  image {
    height: 40px;
    width: 40px;
  }
`;

const WidgetIcon = ({ href }) => (
  <StyledSVG>
    <image xlinkHref={href} />
  </StyledSVG>
);

WidgetIcon.propTypes = {
  href: PropTypes.string.isRequired
};

export default WidgetIcon;
