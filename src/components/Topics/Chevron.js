import React from "react";
import PropTypes from "prop-types";
import { palette } from "../../utils/cssVars";

const Chevron = ({
  className,
  fill = palette.grayDarkest,
  stroke = palette.grayDarkest,
  strokeWidth = 64
}) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    className={className}
  >
    <path
      d="M509.75,852.72A35.91,35.91,0,0,1,485,842.85L27,409.26A36,36,0,1,1,76.56,357L509.66,767l437.7-417.15A36,36,0,1,1,997.06,402L534.6,842.77A35.94,35.94,0,0,1,509.75,852.72Z"
      fill={fill}
      strokeWidth={strokeWidth}
      stroke={stroke}
    />
  </svg>
);

Chevron.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number
};

export default Chevron;
