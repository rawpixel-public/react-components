import React from "react";

import { StyledButton, StyledText } from "./StyledWidgets";
import WidgetIcon from "./WidgetIcon";
import { WidgetProps } from "./Bar";

const WidgetTopicGroup = ({ title, filter_icon, onClick, active = false }) => (
  <StyledButton onClick={onClick} role="button" active={active}>
    <WidgetIcon href={filter_icon} active={active} />
    <StyledText>{title}</StyledText>
  </StyledButton>
);

WidgetTopicGroup.propTypes = WidgetProps;
WidgetTopicGroup.displayName = "WidgetTopicGroup";

export default WidgetTopicGroup;
