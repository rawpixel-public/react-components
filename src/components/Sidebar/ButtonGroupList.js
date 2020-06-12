import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Heading from "../../atoms/Heading";

import {
  StyledList,
  StyledListItem,
  StyledWrapper
} from "./StyledFilterButtonGroup";

const Title = styled(Heading)`
  font-size: 14px;
`;

const ButtonGroupList = ({
  children,
  title,
  itemsPerRow = 2,
  headingLevel = 3,
  ...props
}) => (
  <StyledWrapper {...props}>
    {title && <Title level={headingLevel}>{title}</Title>}
    <StyledList>
      {React.Children.toArray(children).map((element, index, arr) => (
        <StyledListItem
          key={index}
          itemsPerRow={itemsPerRow}
          itemsCount={arr.length}
        >
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
