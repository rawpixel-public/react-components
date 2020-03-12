import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { ifProp, prop } from "styled-tools";

import { palette } from "../../utils/cssVars";

const StyledIcon = styled.div`
  height: 30px;
  width: 40px;
  margin: auto;
  vertical-align: top;
  mask: url(${prop("imgSrc")}) no-repeat center;
  background: ${palette.grayDark};
  transition: background linear 250ms;

  ${ifProp(
    "active",
    css`
      background: linear-gradient(to left, ${palette.pink}, ${palette.blue});
    `
  )};
`;

const WidgetIcon = ({ href, active = false }) => (
  <StyledIcon active={active ? true : undefined} imgSrc={href} />
);

WidgetIcon.propTypes = {
  href: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default WidgetIcon;
