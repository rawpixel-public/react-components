import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { ifProp, prop, theme } from "styled-tools";

import { palette } from "../../utils/cssVars";

const MaskImage = styled.div.attrs(props => ({
  style: {
    height: props.$height,
    width: props.$width,
    mask: `url(${props.$src}) no-repeat center center`,
    webkitMask: `url(${props.$src}) no-repeat center center`
  }
}))`
  margin: auto;
  background: ${prop(
    "$background",
    theme("palette.maskImage.background", palette.fuscous)
  )};

  ${ifProp(
    "$active",
    css`
      background: ${prop(
        "$activeBackground",
        theme("palette.maskImage.activeBackground", palette.blueGradient)
      )};
    `
  )};
`;

MaskImage.defaultProps = {
  $active: false,
  $height: "26px",
  $width: "26px"
};

MaskImage.propTypes = {
  className: PropTypes.string,
  $src: PropTypes.string.isRequired,
  $active: PropTypes.bool,
  $height: PropTypes.string,
  $width: PropTypes.string
};

export default MaskImage;
