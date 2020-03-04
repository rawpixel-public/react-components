import React from "react";
import PropTypes from "prop-types";
import { StyledSizeButton, StyledBlock, StyledTitle } from "./StyledSizeButton";

const SizeButton = ({
  as,
  className,
  height,
  width,
  title,
  onClick,
  active,
  disabled
}) => (
  <StyledSizeButton
    as={as}
    className={className}
    active={active}
    disabled={disabled}
    onClick={onClick}
  >
    <StyledBlock style={{ height: `${height}px`, width: `${width}px` }} />
    <StyledTitle>{title}</StyledTitle>
  </StyledSizeButton>
);

SizeButton.propTypes = {
  as: PropTypes.any,
  className: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  title: PropTypes.node,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool
};

export default SizeButton;
