import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

import {
  StyledImageButton,
  StyledImgWrapper,
  StyledImageButtonTitle,
  StyledIcon
} from "./StyledImageButton";

import DotLoader from "../Loader/DotLoader";

const ImageButton = ({
  active = false,
  icon,
  title,
  isLoading = false,
  onClick,
  to,
  ...props
}) => (
  <StyledImageButton
    active={active ? true : undefined}
    as={to ? Link : "button"}
    onClick={onClick}
    disabled={(isLoading && "disabled") || props.disabled}
    isLoading={isLoading ? true : undefined}
    to={to}
    {...props}
  >
    <StyledImgWrapper className="img-wrapper">
      {isLoading && (
        <DotLoader className="loader" loaderWidth={60} dotSize={10} />
      )}
      <StyledIcon imgSrc={icon} />
    </StyledImgWrapper>
    <StyledImageButtonTitle>{title}</StyledImageButtonTitle>
  </StyledImageButton>
);

ImageButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.any,
  to: PropTypes.string
};

export default ImageButton;
