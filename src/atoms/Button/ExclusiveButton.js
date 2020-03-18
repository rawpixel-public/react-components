import React from "react";
import Button from "./index";
import { StyledIcon } from "./StyledButton";
import { palette } from "../../utils/cssVars";
import crownSvg from "../../icons/crown.svg";

const ExclusiveButton = props => (
  <Button {...props} style={{ padding: "6px 0", minHeight: "34px" }}>
    <StyledIcon
      imgSrc={crownSvg}
      background={palette.gold}
      style={{ height: "20px", width: "20px" }}
    />
  </Button>
);

export default ExclusiveButton;
