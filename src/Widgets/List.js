import React from "react";
import PropTypes from "prop-types";
import WidgetAddon from "./Addon";
import WidgetFilter from "./Filter";
import {
  StyledHR,
  StyledWidgetsWrapper,
  StyledUnorderedList,
  StyledListItem
} from "./StyledWidgets";

const WidgetsList = ({ widgets, onFilterClick, activeWidget }) => {
  const [activeIndex, setActiveIndex] = React.useState(activeWidget);
  const published = widgets.filter(widget => widget.isPublished);

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

  const filters = published
    .filter(widget => widget.type === "filter")
    .map(widget => (
      <StyledListItem key={widget.title}>
        <WidgetFilter
          icon={widget.icon}
          title={widget.title}
          onClick={e => filterClickHandler(e, widget)}
          active={widgets.indexOf(widget) === activeIndex}
        />
      </StyledListItem>
    ));

  const addons = published
    .filter(widget => widget.type === "addon")
    .map(widget => (
      <StyledListItem key={widget.title}>
        <WidgetAddon
          icon={widget.icon}
          href={widget.url}
          title={widget.title}
        />
      </StyledListItem>
    ));

  return (
    !!published.length && (
      <StyledWidgetsWrapper>
        <StyledUnorderedList>
          {filters}
          {!!filters.length && !!addons.length && <StyledHR />}
          {addons}
        </StyledUnorderedList>
      </StyledWidgetsWrapper>
    )
  );
};

WidgetsList.propTypes = {
  widgets: PropTypes.array.isRequired,
  onFilterClick: PropTypes.func,
  activeWidget: PropTypes.number
};

export default WidgetsList;
