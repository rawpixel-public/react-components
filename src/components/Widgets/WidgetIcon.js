import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { ifProp, prop } from "styled-tools";

import { palette } from "../../utils/cssVars";

const StyledIcon = styled.div`
  height: 30px;
  width: 30px;
  margin: auto;
  vertical-align: center;
  mask: url(${prop("imgSrc")}) no-repeat center center;
  background: ${palette.grayMedium};

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
