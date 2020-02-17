import PropTypes from "prop-types";
import React from "react";

import { StyledAnchor, StyledText } from "./StyledWidgets";
import WidgetIcon from "./WidgetIcon";

const WidgetAddon = ({ title, icon, href }) => (
  <StyledAnchor href={href}>
    <WidgetIcon href={icon} />
    <StyledText>{title}</StyledText>
  </StyledAnchor>
);

WidgetAddon.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

WidgetAddon.displayName = "WidgetAddon";

export default WidgetAddon;
