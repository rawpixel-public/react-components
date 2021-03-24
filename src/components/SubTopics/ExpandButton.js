import styled from "styled-components";
import { theme } from "styled-tools";

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
    background: ${theme("palette.subtopics.color", palette.grayDarkest)};
    display: block;
    width: 10px;
    height: 10px;
    mask: url(${Plus});
    position: absolute;
    left: 4px;
    top: 4px;
  }
  &:hover:before {
    background: ${theme(
      "palette.subtopics.hoverColor",
      palette.topicIconColor
    )};
  }
`;

export default ExpandButton;
