import React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./StyledButton";

const Button = ({ children, disabled = false, size = "medium", ...props }) => (
  <StyledButton
    disabled={disabled || (!props.href && !props.onClick)}
    {...props}
    size={size}
  >
    {children}
  </StyledButton>
);

Button.propTypes = {
  active: PropTypes.bool,
  as: PropTypes.oneOf(["a", "button", "input"]),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge"])
};

export default Button;
