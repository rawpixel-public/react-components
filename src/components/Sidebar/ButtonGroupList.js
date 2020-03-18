import React from "react";
import PropTypes from "prop-types";

import Heading from "../../atoms/Heading";

import { StyledList, StyledListItem } from "./StyledFilterButtonGroup";

const ButtonGroupList = ({
  children,
  title,
  itemsPerRow = 2,
  headingLevel = 3,
  ...props
}) => (
  <div {...props}>
    {title && <Heading level={headingLevel}>{title}</Heading>}
    <StyledList>
      {React.Children.toArray(children).map((element, index) => (
        <StyledListItem key={index} itemsPerRow={itemsPerRow}>
          {element}
        </StyledListItem>
      ))}
    </StyledList>
  </div>
);

ButtonGroupList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  itemsPerRow: PropTypes.number,
  headingLevel: PropTypes.number
};

export default ButtonGroupList;
