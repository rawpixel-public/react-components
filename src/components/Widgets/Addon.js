import React from "react";

import { StyledAnchor, StyledText } from "./StyledWidgets";
import WidgetIcon from "./WidgetIcon";
import WidgetProps from "./WidgetProps";

const WidgetAddon = ({ title, filter_icon, href }) => (
  <StyledAnchor href={href}>
    <WidgetIcon href={filter_icon} />
    <StyledText>{title}</StyledText>
  </StyledAnchor>
);

WidgetAddon.propTypes = WidgetProps;
WidgetAddon.displayName = "WidgetAddon";

export default WidgetAddon;
