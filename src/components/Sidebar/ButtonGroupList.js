import React from "react";
import PropTypes from "prop-types";

import Heading from "../../atoms/Heading";

import {
  StyledList,
  StyledListItem,
  StyledWrapper
} from "./StyledFilterButtonGroup";

const ButtonGroupList = ({
  children,
  title,
  itemsPerRow = 2,
  headingLevel = 3,
  ...props
}) => (
  <StyledWrapper {...props}>
    {title && <Heading level={headingLevel}>{title}</Heading>}
    <StyledList>
      {React.Children.toArray(children).map((element, index) => (
        <StyledListItem key={index} itemsPerRow={itemsPerRow}>
          {element}
        </StyledListItem>
      ))}
    </StyledList>
  </StyledWrapper>
);

ButtonGroupList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  itemsPerRow: PropTypes.number,
  headingLevel: PropTypes.number
};

export default ButtonGroupList;
