import React from "react";
import PropTypes from "prop-types";
import { StyledHeading } from "./StyledHeading";

const Heading = ({ children, level = 1, ...props }) => (
  <StyledHeading as={`h${level}`} {...props}>
    {children}
  </StyledHeading>
);

Heading.propTypes = {
  children: PropTypes.node,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

export default Heading;
