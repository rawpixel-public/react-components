import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";

const StyledSVG = styled.svg`
  height: 30px;
  width: 40px;
  margin: auto;

  image {
    height: 30px;
    width: 40px;
    transition: filter linear 250ms;
    ${ifProp(
      "active",
      css`
        // SVG props (e.g. fill, stroke) cannot be accessed when loaded by URL
        // so styling is done via CSS filters.
        filter: invert(50%) sepia(100%) saturate(2500%) hue-rotate(240deg)
          brightness(110%) contrast(120%);
        transition: filter linear 250ms;
      `
    )}
  }
`;

const WidgetIcon = ({ href, active = false }) => (
  <StyledSVG active={active}>
    <image xlinkHref={href} />
  </StyledSVG>
);

WidgetIcon.propTypes = {
  href: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default WidgetIcon;
