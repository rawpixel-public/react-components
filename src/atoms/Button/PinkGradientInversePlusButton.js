import styled from "styled-components";
import { ifProp, switchProp } from "styled-tools";
import PropTypes from "prop-types";

import plus from "../../icons/plus-circle.svg";
import plus44 from "../../icons/plus-circle-44px.svg";
import pinkPlus from "../../icons/pinkgradient-plus-inverse.svg";

const sizeCases = {
  xsmall: "12px",
  small: "16px",
  medium: "25px",
  large: "32px",
  xlarge: "40px"
};

const iconCases = {
  light: plus,
  normal: plus44
};

const StyledButton = styled.button`
  padding: 0;
  cursor: pointer;
  white-space: nowrap;
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  text-decoration: none;
  box-shadow: none;
  line-height: 1;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
  background: transparent;

  &:after {
    content: "";
    display: inline-block;
    width: ${switchProp("size", sizeCases)};
    height: ${switchProp("size", sizeCases)};
    background-image: url(${switchProp("iconThickness", iconCases)}),
      url(${pinkPlus});
    background-size: ${ifProp("active", "0, contain", "contain, 0")};
    background-position: 50%, 50%;
    background-repeat: no-repeat, no-repeat;
  }

  &:hover:after {
    background-size: 0, contain;
  }
`;

StyledButton.propTypes = {
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge"]),
  iconThickness: PropTypes.oneOf(["light", "normal"])
};

StyledButton.defaultProps = {
  size: "medium",
  iconThickness: "normal"
};

export default StyledButton;
