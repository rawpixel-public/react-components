import React from "react";
import PropTypes from "prop-types";

import { StyledLoadingPlaceholder } from "./StyledLoadingPlaceholder";

const LoadingPlaceholder = ({
  className,
  width,
  height,
  background,
  borderRadius,
  ...props
}) => (
  <StyledLoadingPlaceholder
    className={className}
    widthValue={width}
    heightValue={height}
    backgroundValue={background}
    borderRadiusValue={borderRadius}
    {...props}
  />
);

LoadingPlaceholder.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  background: PropTypes.string,
  borderRadius: PropTypes.string
};

export default LoadingPlaceholder;
