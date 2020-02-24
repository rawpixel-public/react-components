import React from "react";
import PropTypes from "prop-types";
import Addon from "./Addon";
import TopicGroup from "./TopicGroup";
import {
  StyledHR,
  StyledWidgetsWrapper,
  StyledUnorderedList,
  StyledListItem
} from "./StyledWidgets";

const WidgetsBar = ({
  widgets,
  onFilterClick,
  activeWidget,
  direction = "column"
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
          filter_icon={widget.filter_icon}
          title={widget.title}
          onClick={e => filterClickHandler(e, widget)}
          active={widgets.indexOf(widget) === activeIndex}
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
        {filters}
        {!!filters.length && !!addons.length && (
          <StyledHR direction={direction} />
        )}
        {addons}
      </StyledUnorderedList>
    </StyledWidgetsWrapper>
  );
};

export const WidgetProps = {
  title: PropTypes.string.isRequired,
  filter_icon: PropTypes.string.isRequired,
  href: PropTypes.string,
  type: PropTypes.oneOf(["topic_group", "add_on"]).isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool
};

WidgetsBar.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.shape(WidgetProps)).isRequired,
  onFilterClick: PropTypes.func,
  activeWidget: PropTypes.number,
  direction: PropTypes.oneOf(["column", "row"])
};

export default WidgetsBar;