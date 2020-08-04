import React, { Children } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";

import {
  StyledImageButtonGridContainer,
  StyledScrollbar,
  StyledResizable
} from "./StyledImageButtonGrid";

const RESIZE_HANDLE_HEIGHT = 7;

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
  resizable = true,
  itemWidth = "60px",
  gridProps = {},
  scrollbarProps = {},
  resizableProps = {},
  ...props
}) => {
  const [height, setHeight] = React.useState({
    defaultHeight,
    maxHeight: null,
    minHeight: defaultHeight,
    resizing: false,
    scrolling: false
  });
  const ScrollbarRef = React.useRef();
  const ContainerRef = React.useRef();
  const childrenArray = Children.toArray(children).filter(Boolean);
  const childCount = childrenArray.length;

  React.useEffect(() => {
    const element = ContainerRef.current;
    const offsetHeight = element.offsetHeight;

    if (childCount > viewable) {
      const itemElements = Array.from(element.childNodes);
      const rows = chunk(itemElements, columns);
      const visibleRows = rows.slice(0, Math.round(viewable / columns));
      const visibleRowHeights = visibleRows.map(row =>
        row.reduce(
          (acc, cur) => (cur.offsetHeight > acc ? cur.offsetHeight : acc),
          0
        )
      );
      const rowMargin = 10;
      const visibleHeight =
        visibleRowHeights.reduce((acc, cur) => acc + cur + rowMargin, 0) +
        rowMargin;

      setHeight({
        ...height,
        minHeight: visibleHeight,
        defaultHeight: visibleHeight,
        maxHeight: resizable
          ? RESIZE_HANDLE_HEIGHT + offsetHeight
          : offsetHeight
      });
    } else {
      setHeight({
        ...height,
        defaultHeight: offsetHeight,
        maxHeight: offsetHeight,
        minHeight: offsetHeight
      });
    }
  }, [children, viewable]);

  const renderView = props =>
    childCount <= viewable ||
    height.resizing ||
    height.defaultHeight === height.maxHeight ? (
      <div />
    ) : (
      <div {...props} />
    );

  const onResize = (event, { size }) => {
    setHeight({ ...height, defaultHeight: size.height });
  };

  const onScroll = () => {
    const scrollbars = ScrollbarRef.current;
    const values = scrollbars.getValues();

    if (values.top === 0 && height.scrolling) {
      setHeight({ ...height, scrolling: false });
    }

    if (values.top !== 0 && !height.scrolling) {
      setHeight({ ...height, scrolling: true });
    }
  };

  return (
    <StyledResizable
      axis={resizable && !height.scrolling ? "y" : "none"}
      width={defaultWidth}
      height={height.defaultHeight}
      minConstraints={[defaultWidth, height.minHeight]}
      maxConstraints={[defaultWidth, height.maxHeight]}
      resizeHandles={["s"]}
      onResize={onResize}
      onResizeStart={() => setHeight({ ...height, resizing: true })}
      onResizeStop={() => setHeight({ ...height, resizing: false })}
      {...resizableProps}
    >
      <Scrollbars
        className={className}
        style={{
          height: height.defaultHeight,
          width: defaultWidth,
          ...props.style
        }}
        hideTracksWhenNotNeeded
        renderThumbVertical={props => <StyledScrollbar {...props} />}
        renderView={renderView}
        autoHide
        autoHeight={
          props.autoHeight !== undefined
            ? props.autoHeight
            : childCount <= viewable
        }
        autoHeightMax={
          props.autoHeightMax !== undefined
            ? props.autoHeightMax
            : height.defaultHeight
        }
        onScrollStart={onScroll}
        onScrollStop={onScroll}
        ref={ScrollbarRef}
        {...scrollbarProps}
      >
        <StyledImageButtonGridContainer
          ref={ContainerRef}
          columns={columns}
          itemWidth={itemWidth}
          {...gridProps}
        >
          {children}
        </StyledImageButtonGridContainer>
      </Scrollbars>
    </StyledResizable>
  );
};

ImageButtonGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  viewable: PropTypes.number,
  defaultHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["auto"])
  ]),
  defaultWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["auto"])
  ]),
  columns: PropTypes.number,
  style: PropTypes.object,
  autoHeight: PropTypes.bool,
  autoHeightMax: PropTypes.number,
  resizable: PropTypes.bool,
  itemWidth: PropTypes.string,
  gridProps: PropTypes.object,
  scrollbarProps: PropTypes.object,
  resizableProps: PropTypes.object
};

export default ImageButtonGrid;
