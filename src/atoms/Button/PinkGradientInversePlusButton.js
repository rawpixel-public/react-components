import styled from "styled-components";
import { switchProp } from "styled-tools";
import PropTypes from "prop-types";

import plus from "../../icons/pinkgradient-plus-inverse.svg";

const sizeCases = {
  xsmall: "12px",
  small: "16px",
  medium: "25px",
  large: "32px",
  xlarge: "40px"
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
    background-image: url(${plus});
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
  }

  &:hover:after {
    filter: brightness(120%);
  }
`;

StyledButton.propTypes = {
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge"])
};

StyledButton.defaultProps = {
  size: "medium"
};

export default StyledButton;
