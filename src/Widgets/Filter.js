import PropTypes from "prop-types";
import React from "react";

import { StyledButton, StyledText } from "./StyledWidgets";
import WidgetIcon from "./WidgetIcon";

const WidgetFilter = ({ title, icon, onClick }) => (
  <StyledButton onClick={onClick} role="button">
    <WidgetIcon href={icon} />
    <StyledText>{title}</StyledText>
  </StyledButton>
);

WidgetFilter.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

WidgetFilter.displayName = "WidgetFilter";

export default WidgetFilter;
