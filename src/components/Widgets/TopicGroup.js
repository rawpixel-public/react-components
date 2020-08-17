import React from "react";

import { StyledButton, StyledText } from "./StyledWidgets";
import WidgetIcon from "./WidgetIcon";
import WidgetProps from "./WidgetProps";

const WidgetTopicGroup = ({
  as,
  to,
  title,
  icon_url,
  onClick,
  active = false,
  href,
  ...props
}) => (
  <StyledButton
    as={as}
    onClick={onClick}
    active={active ? true : undefined}
    to={to}
    href={href}
    {...props}
  >
    <WidgetIcon className="widget-icon" href={icon_url} active={active} />
    {title && (
      <StyledText className="widget-label" active={active}>
        {title}
      </StyledText>
    )}
  </StyledButton>
);

WidgetTopicGroup.propTypes = WidgetProps;
WidgetTopicGroup.displayName = "WidgetTopicGroup";

export default WidgetTopicGroup;
