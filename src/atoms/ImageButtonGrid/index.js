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
  children,
  viewable = 9,
  defaultHeight = 240,
  defaultWidth = 240,
  columns = 3
}) => {
  const [height, setHeight] = React.useState(defaultHeight);
  const ContainerRef = React.useRef();

  React.useEffect(() => {
    const element = ContainerRef.current;
    const offsetHeight = element.offsetHeight;

    // Set container to exact height to hide scrollbar tracks.
    if (Children.count(children).length <= viewable) {
      setHeight(offsetHeight);
    }
  }, [children, viewable]);

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
      style={{ height, width: defaultWidth }}
      hideTracksWhenNotNeeded
      renderThumbVertical={props => <StyledScrollbar {...props} />}
      autoHide
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
  children: PropTypes.node,
  viewable: PropTypes.number,
  defaultHeight: PropTypes.number,
  defaultWidth: PropTypes.number,
  columns: PropTypes.number
};

export default ImageButtonGrid;
