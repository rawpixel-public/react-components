import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { StyledImageButton, StyledImageButtonTitle } from "./StyledImageButton";
import Icon from "../Icon";

const ImageButton = ({
  as,
  active = false,
  children,
  href,
  icon,
  title,
  isLoading = false,
  onClick,
  to,
  ...props
}) => (
  <StyledImageButton
    active={active ? true : undefined}
    as={as}
    onClick={onClick}
    disabled={(isLoading && "disabled") || props.disabled}
    isLoading={isLoading ? true : undefined}
    to={to}
    href={href}
    {...props}
  >
    {children || (
      <Fragment>
        <Icon icon={icon} loading={isLoading} className="img-wrapper" />
        <StyledImageButtonTitle>{title}</StyledImageButtonTitle>
      </Fragment>
    )}
  </StyledImageButton>
);

ImageButton.propTypes = {
  as: PropTypes.any,
  active: PropTypes.bool,
  children: PropTypes.node,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.any,
  to: PropTypes.string
};

export default ImageButton;
