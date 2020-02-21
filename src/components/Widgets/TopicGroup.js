import PropTypes from "prop-types";
import React from "react";

import { StyledButton, StyledText } from "./StyledWidgets";
import WidgetIcon from "./WidgetIcon";

const WidgetTopicGroup = ({ title, filter_icon, onClick, active = false }) => (
  <StyledButton onClick={onClick} role="button" active={active}>
    <WidgetIcon href={filter_icon} active={active} />
    <StyledText>{title}</StyledText>
  </StyledButton>
);

WidgetTopicGroup.propTypes = {
  title: PropTypes.string.isRequired,
  filter_icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool
};

WidgetTopicGroup.displayName = "WidgetTopicGroup";

export default WidgetTopicGroup;
