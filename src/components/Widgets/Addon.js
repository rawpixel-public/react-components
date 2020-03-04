import React from "react";

import { StyledButton, StyledText } from "./StyledWidgets";
import WidgetIcon from "./WidgetIcon";
import WidgetProps from "./WidgetProps";

const WidgetAddon = ({ title, filter_icon, href, ...props }) => (
  <StyledButton as="a" href={href} {...props}>
    <WidgetIcon href={filter_icon} />
    <StyledText>{title}</StyledText>
  </StyledButton>
);

WidgetAddon.propTypes = WidgetProps;
WidgetAddon.displayName = "WidgetAddon";

export default WidgetAddon;
