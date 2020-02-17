import React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./StyledButton";

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

Button.propTypes = {
  as: PropTypes.oneOf(["a", "button", "input"]),
  children: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
