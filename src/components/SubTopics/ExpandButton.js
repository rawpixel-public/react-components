import styled from "styled-components";

import Button from "../../atoms/Button";
import Plus from "../../icons/plus.svg";
import { palette } from "../../utils/cssVars";

const ExpandButton = styled(Button).attrs({ size: "xsmall" })`
  border-radius: 10px;
  width: 20px;
  height: 20px;
  line-height: 1;
  position: relative;
  text-indent: -9999px;

  &:before {
    content: "";
    background: ${palette.gray};
    display: block;
    width: 11px;
    height: 11px;
    mask: url(${Plus});
    position: absolute;
    left: 4px;
    top: 4px;
  }
`;

export default ExpandButton;
