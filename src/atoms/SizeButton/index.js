import React from "react";
import PropTypes from "prop-types";
import {
  StyledSizeButton,
  StyledBlock,
  StyledTitle,
  BlockWrapper
} from "./StyledSizeButton";

const SizeButton = ({
  as,
  className,
  height,
  width,
  title,
  onClick,
  active,
  disabled,
  href,
  to,
  ...props
}) => (
  <StyledSizeButton
    as={as}
    className={className}
    active={active ? true : undefined}
    disabled={disabled}
    onClick={onClick}
    href={href}
    to={to}
    {...props}
  >
    <BlockWrapper>
      <StyledBlock style={{ height: `${height}px`, width: `${width}px` }} />
    </BlockWrapper>
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
  disabled: PropTypes.bool,
  href: PropTypes.string,
  to: PropTypes.string
};

export default SizeButton;
