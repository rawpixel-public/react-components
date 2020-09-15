import styled from "styled-components";
import { switchProp } from "styled-tools";

import { fontFamily } from "../../utils/cssVars";

// todo: consolidate website and DAM palette.
const darkGray = "#4b4b4c";

export const StyledHeading = styled.h1`
  color: ${darkGray};
  font-family: ${fontFamily.base};
  font-weight: normal;
  font-size: ${switchProp("as", { h1: "32px", h2: "24px", h3: "18px" })};
  margin: 0.5em 0;
  padding: 0;
`;
