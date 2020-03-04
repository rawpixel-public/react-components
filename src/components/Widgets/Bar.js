import React from "react";
import PropTypes from "prop-types";

import LoadingPlaceholder from "../../atoms/LoadingPlaceholder";
import Addon from "./Addon";
import TopicGroup from "./TopicGroup";
import {
  StyledHR,
  StyledWidgetsWrapper,
  StyledUnorderedList,
  StyledListItem
} from "./StyledWidgets";
import WidgetProps from "./WidgetProps";

const WidgetPlaceholder = props => (
  <div
    style={{ display: "flex", flexDirection: "column", margin: "3px" }}
    {...props}
  >
    <LoadingPlaceholder width="40px" height="30px" borderRadius="none" />
    <LoadingPlaceholder
      width="40px"
      height="10px"
      borderRadius="none"
      style={{ margin: "3px 0" }}
    />
  </div>
);

const WidgetsBar = ({
  widgets,
  onFilterClick,
  activeWidget,
  direction = "column",
  loading = false
}) => {
  const [activeIndex, setActiveIndex] = React.useState(activeWidget);

  if (activeWidget !== undefined && activeWidget !== activeIndex) {
    setActiveIndex(activeWidget);
  }

  const filterClickHandler = (e, widget) => {
    if (activeWidget === undefined) {
      setActiveIndex(widgets.indexOf(widget));
    }
    if (typeof onFilterClick === "function") {
      onFilterClick(e, widget);
    }
  };

  const filters = widgets
    .filter(widget => widget.type === "topic_group")
    .map(widget => (
      <StyledListItem key={widget.title}>
        <TopicGroup
          to={widget.to}
          filter_icon={widget.filter_icon}
          title={widget.title}
          onClick={e => filterClickHandler(e, widget)}
          active={widget.active || widgets.indexOf(widget) === activeIndex}
          type={widget.type}
        />
      </StyledListItem>
    ));

  const addons = widgets
    .filter(widget => widget.type === "add_on")
    .map(widget => (
      <StyledListItem key={widget.title}>
        <Addon
          filter_icon={widget.filter_icon}
          href={widget.url}
          title={widget.title}
          type={widget.type}
        />
      </StyledListItem>
    ));

  return (
    <StyledWidgetsWrapper direction={direction}>
      <StyledUnorderedList direction={direction}>
        {loading &&
          [...Array(10)].map((_, index) => (
            <WidgetPlaceholder
              key={index}
              data-testid={`widget-placeholder-${index}`}
            />
          ))}
        {filters}
        {!!filters.length && !!addons.length && (
          <StyledHR direction={direction} />
        )}
        {addons}
      </StyledUnorderedList>
    </StyledWidgetsWrapper>
  );
};

WidgetsBar.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.shape(WidgetProps)).isRequired,
  onFilterClick: PropTypes.func,
  activeWidget: PropTypes.number,
  direction: PropTypes.oneOf(["column", "row"]),
  loading: PropTypes.bool
};

export default WidgetsBar;
