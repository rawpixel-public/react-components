import React, { Children } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";

import {
  StyledImageButtonGridContainer,
  StyledScrollbar,
  StyledRow,
  Spacer
} from "./StyledImageButtonGrid";

const chunk = (array, size) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

const ImageButtonGrid = ({
  className,
  children,
  viewable = 12,
  defaultHeight = 320,
  defaultWidth = 240,
  columns = 3,
  ...props
}) => {
  const [height, setHeight] = React.useState(defaultHeight);
  const ContainerRef = React.useRef();
  const childCount = Children.count(children);

  React.useEffect(() => {
    const element = ContainerRef.current;
    const offsetHeight = element.offsetHeight;

    if (childCount > viewable) {
      const rowElements = Array.from(element.childNodes);
      const visibleRowElements = rowElements.slice(0, viewable / columns);
      const rowMargin = 10;
      const visibleHeight = visibleRowElements.reduce(
        (value, element) => value + element.offsetHeight + rowMargin,
        0
      );
      setHeight(visibleHeight);
    } else {
      setHeight(offsetHeight);
    }
  }, [childCount, viewable]);

  const rows = chunk(Children.toArray(children), columns).map(row => {
    if (row.length === columns) {
      return row;
    }
    const spacers = [...Array(columns - row.length)].map((_, key) => (
      <Spacer key={key} />
    ));
    return [...row, ...spacers];
  });

  return (
    <Scrollbars
      className={className}
      style={{ height, width: defaultWidth, ...props.style }}
      hideTracksWhenNotNeeded
      renderThumbVertical={props => <StyledScrollbar {...props} />}
      autoHide
      autoHeight={childCount <= viewable}
    >
      <StyledImageButtonGridContainer ref={ContainerRef} columns={columns}>
        {rows.map((row, index) => (
          <StyledRow columns={columns} key={index}>
            {row}
          </StyledRow>
        ))}
      </StyledImageButtonGridContainer>
    </Scrollbars>
  );
};

ImageButtonGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  viewable: PropTypes.number,
  defaultHeight: PropTypes.number,
  defaultWidth: PropTypes.number,
  columns: PropTypes.number,
  style: PropTypes.object
};

export default ImageButtonGrid;
