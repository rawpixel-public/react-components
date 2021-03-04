import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import filterAllowedProps from "filter-react-props";

import Heading from "../../atoms/Heading";

import { StyledList, StyledListItem } from "./StyledFilterButtonGroup";

const Title = styled(Heading)`
  font-size: 14px;
`;

const ButtonGroupList = ({
  children,
  title,
  itemsPerRow = 2,
  headingLevel = 3,
  flexGrow = false,
  alignSelf,
  ...props
}) => (
  <div {...filterAllowedProps(props)}>
    {title && <Title level={headingLevel}>{title}</Title>}
    <StyledList>
      {React.Children.toArray(children).map((element, index, arr) => {
        const itemSpan =
          index + 1 < arr.length || arr.length % itemsPerRow === 0
            ? 1
            : (index + 1) % itemsPerRow;
        return (
          <StyledListItem
            key={index}
            itemsPerRow={itemsPerRow}
            itemsCount={arr.length}
            itemSpan={itemSpan}
            $flexGrow={flexGrow}
            $alignSelf={alignSelf}
          >
            {element}
          </StyledListItem>
        );
      })}
    </StyledList>
  </div>
);

ButtonGroupList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  itemsPerRow: PropTypes.number,
  headingLevel: PropTypes.number,
  flexGrow: PropTypes.bool,
  alignSelf: PropTypes.string
};

export default ButtonGroupList;
