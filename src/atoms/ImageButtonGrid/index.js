import React, { Children } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";

import {
  StyledImageButtonGridContainer,
  StyledScrollbar
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

const useGridHeight = (
  children,
  viewable,
  defaultHeight,
  columns,
  header,
  footer
) => {
  const [height, setHeight] = React.useState({
    defaultHeight,
    maxHeight: null,
    minHeight: defaultHeight,
    resizing: false,
    scrolling: false
  });

  const containerRef = React.useRef();
  const headerRef = React.useRef();
  const footerRef = React.useRef();
  const gridRef = React.useRef();
  const childrenArray = Children.toArray(children).filter(Boolean);
  const childCount = childrenArray.length;

  const recalculateHeight = () => {
    const headerElement = headerRef.current;
    const footerElement = footerRef.current;
    const gridElement = gridRef.current;
    const offsetHeight = gridElement ? gridElement.offsetHeight : 0;
    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
    const footerHeight = footerElement ? footerElement.offsetHeight : 0;

    let update;

    if (childCount > viewable && gridElement) {
      const itemElements = Array.from(gridElement.childNodes);
      const rows = chunk(itemElements, columns);
      const visibleRows = rows.slice(0, Math.round(viewable / columns));
      const visibleRowHeights = visibleRows.map(row =>
        row.reduce(
          (acc, cur) => Math.max(acc, cur.getBoundingClientRect().height),
          0
        )
      );
      const rowMargin = 10;
      const visibleHeight = visibleRowHeights.reduce(
        (acc, cur) => acc + cur + rowMargin,
        headerHeight
      );

      update = {
        ...height,
        minHeight: visibleHeight,
        defaultHeight: visibleHeight,
        maxHeight: offsetHeight + headerHeight + footerHeight
      };
    } else {
      update = {
        ...height,
        defaultHeight: offsetHeight + headerHeight + footerHeight,
        maxHeight: offsetHeight + headerHeight + footerHeight,
        minHeight: offsetHeight + headerHeight + footerHeight
      };
    }

    const isEqual =
      Object.keys(update).filter(key => update[key] === height[key]).length ===
      Object.keys(height).length;

    if (update && !isEqual) {
      setHeight(update);
    }
  };

  React.useEffect(() => {
    recalculateHeight();
  }, [children, viewable, header, footer]);

  return {
    height,
    setHeight,
    containerRef,
    headerRef,
    footerRef,
    gridRef,
    recalculateHeight
  };
};

const ImageButtonGrid = React.forwardRef(
  (
    {
      className,
      children,
      viewable = 12,
      defaultHeight = 320,
      defaultWidth = 240,
      columns = 3,
      itemWidth = "60px",
      gridProps = {},
      scrollbarProps = {},
      header,
      footer,
      ...props
    },
    ref
  ) => {
    const {
      containerRef,
      headerRef,
      footerRef,
      gridRef,
      height,
      setHeight,
      recalculateHeight
    } = useGridHeight(
      children,
      viewable,
      defaultHeight,
      columns,
      header,
      footer
    );

    const ScrollbarRef = React.useRef();
    const childrenArray = Children.toArray(children).filter(Boolean);
    const childCount = childrenArray.length;

    React.useImperativeHandle(
      ref,
      () => ({
        recalculateHeight: () => setTimeout(() => recalculateHeight(), 1),
        containerElement: containerRef.current,
        headerElement: headerRef.current,
        footerElement: footerRef.current,
        gridElement: gridRef.current
      }),
      [recalculateHeight]
    );

    const renderView = props =>
      childCount <= viewable ||
      height.resizing ||
      height.defaultHeight === height.maxHeight ? (
        <div />
      ) : (
        <div {...props} />
      );

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
          ref={containerRef}
          columns={columns}
          itemWidth={itemWidth}
          {...gridProps}
        >
          {header && (
            <div className="header" ref={headerRef}>
              {header}
            </div>
          )}
          <div className="grid" ref={gridRef}>
            {children}
          </div>
          {footer && (
            <div className="footer" ref={footerRef}>
              {footer}
            </div>
          )}
        </StyledImageButtonGridContainer>
      </Scrollbars>
    );
  }
);

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
  itemWidth: PropTypes.string,
  gridProps: PropTypes.object,
  scrollbarProps: PropTypes.object,
  header: PropTypes.node,
  footer: PropTypes.node
};

ImageButtonGrid.displayName = "ImageButtonGrid";

export default ImageButtonGrid;
