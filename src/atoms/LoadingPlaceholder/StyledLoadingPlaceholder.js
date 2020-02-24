import styled from "styled-components";
import { prop } from "styled-tools";

import { palette } from "../../utils/cssVars";

export const StyledLoadingPlaceholder = styled.div`
  background: ${prop("backgroundValue", palette.grayLighter)};
  border-radius: ${prop("borderRadiusValue", "4px")};
  width: ${prop("widthValue", "100px")};
  height: ${prop("heightValue", "100px")};
  opacity: 0.125;
  animation: fading 1250ms infinite;

  @keyframes fading {
    0% {
      opacity: 0.125;
    }

    50% {
      opacity: 0.25;
    }

    100% {
      opacity: 0.125;
    }
  }
`;
