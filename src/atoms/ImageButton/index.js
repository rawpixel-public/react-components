import React from "react";
import PropTypes from "prop-types";

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
  ...props
}) => (
  <StyledImageButton
    active={active}
    onClick={onClick}
    disabled={(isLoading && "disabled") || props.disabled}
    isLoading={isLoading}
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
  disabled: PropTypes.any
};

export default ImageButton;
