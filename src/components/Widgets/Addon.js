import React from "react";

import { StyledButton, StyledText } from "./StyledWidgets";
import WidgetIcon from "./WidgetIcon";
import WidgetProps from "./WidgetProps";

const WidgetAddon = ({ as, title, icon_url, href, ...props }) => (
  <StyledButton as={as || "a"} href={href} {...props}>
    <WidgetIcon className="widget-icon" $src={icon_url} />
    <StyledText className="widget-label">{title}</StyledText>
  </StyledButton>
);

WidgetAddon.propTypes = WidgetProps;
WidgetAddon.displayName = "WidgetAddon";

export default WidgetAddon;
