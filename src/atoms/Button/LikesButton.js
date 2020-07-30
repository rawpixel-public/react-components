import React from "react";
import PropTypes from "prop-types";

import Button from "./index";
import { StyledIcon } from "./StyledButton";
import heartSvg from "../../icons/heart-o.svg";
import { palette } from "../../utils/cssVars";

const LikesButton = ({ children, ...props }) => (
  <Button {...props}>
    <StyledIcon
      imgSrc={heartSvg}
      background={`linear-gradient(to left, ${palette.pink}, ${palette.blue})`}
    />
    {children && <span className="label">{children}</span>}
  </Button>
);

LikesButton.propTypes = {
  children: PropTypes.node
};

export default LikesButton;
