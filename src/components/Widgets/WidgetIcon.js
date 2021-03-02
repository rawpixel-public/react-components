import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { ifProp, prop } from "styled-tools";

import { palette } from "../../utils/cssVars";

const WidgetIcon = styled.div`
  height: 26px;
  width: 26px;
  margin: auto;
  mask: url(${prop("$src")}) no-repeat center center;
  background: ${palette.topicActive};

  ${ifProp(
    "$active",
    css`
      background: ${palette.topicGradient};
    `
  )};
`;

WidgetIcon.defaultProps = {
  $active: false
};

WidgetIcon.propTypes = {
  className: PropTypes.string,
  $src: PropTypes.string.isRequired,
  $active: PropTypes.bool
};

export default WidgetIcon;
