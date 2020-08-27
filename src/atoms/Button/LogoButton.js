import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Button from "./index";
import { StyledIcon } from "./StyledButton";
import { palette } from "../../utils/cssVars";
import logoSvg from "../../icons/rawpixel-logo.svg";

const LogoButton = ({ className, children, showLabel = true, ...props }) => (
  <Button className={classnames(className, "logo-button")} {...props}>
    <StyledIcon
      className="logo-icon"
      imgSrc={logoSvg}
      background={palette.grayDark}
    />
    {showLabel && children && (
      <span className="label logo-label">
        {children.replace(/rawpixel/gi, "").trim()}
      </span>
    )}
  </Button>
);

LogoButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  showLabel: PropTypes.bool
};

export default LogoButton;
