import React from "react";
import { Link } from "react-router";

import { StyledButton, StyledText } from "./StyledWidgets";
import WidgetIcon from "./WidgetIcon";
import WidgetProps from "./WidgetProps";

const WidgetTopicGroup = ({
  to,
  title,
  filter_icon,
  onClick,
  active = false,
  ...props
}) => (
  <StyledButton
    as={to ? Link : "button"}
    onClick={onClick}
    role="button"
    active={active ? true : undefined}
    {...props}
  >
    <WidgetIcon href={filter_icon} active={active} />
    <StyledText>{title}</StyledText>
  </StyledButton>
);

WidgetTopicGroup.propTypes = WidgetProps;
WidgetTopicGroup.displayName = "WidgetTopicGroup";

export default WidgetTopicGroup;
