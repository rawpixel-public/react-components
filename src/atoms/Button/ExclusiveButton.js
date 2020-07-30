import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Button from "./index";
import { StyledIcon } from "./StyledButton";
import { palette } from "../../utils/cssVars";
import crownSvg from "../../icons/crown.svg";

const ExclusiveButton = ({
  className,
  children,
  showLabel = false,
  ...props
}) => (
  <Button className={classnames(className, "exclusive-button")} {...props}>
    <StyledIcon
      className="exclusive-icon"
      imgSrc={crownSvg}
      background={palette.gold}
    />
    {showLabel && children && (
      <span className="label exclusive-label">{children}</span>
    )}
  </Button>
);

ExclusiveButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  showLabel: PropTypes.bool
};

export default ExclusiveButton;
