import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { ifProp, prop } from "styled-tools";

import { palette } from "../../utils/cssVars";

const StyledIcon = styled.div`
  height: 26px;
  width: 26px;
  margin: auto;
  mask: url(${prop("imgSrc")}) no-repeat center center;
  background: ${palette.topicActive};

  ${ifProp(
    "active",
    css`
      background: ${palette.topicGradient};
    `
  )};
`;

const WidgetIcon = ({ className, href, active = false }) => (
  <StyledIcon
    className={className}
    active={active ? true : undefined}
    imgSrc={href}
  />
);

WidgetIcon.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default WidgetIcon;
