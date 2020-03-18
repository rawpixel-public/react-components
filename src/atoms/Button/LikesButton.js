import React from "react";
import Button from "./index";
import { StyledIcon } from "./StyledButton";
import heartSvg from "../../icons/heart-o.svg";
import { palette } from "../../utils/cssVars";

const LikesButton = props => (
  <Button {...props}>
    <StyledIcon
      imgSrc={heartSvg}
      background={`linear-gradient(to left, ${palette.pink}, ${palette.blue})`}
    />
    {` Likes`}
  </Button>
);

export default LikesButton;
