import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

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
import PinkGradientInversePlusButton from "../../atoms/Button/PinkGradientInversePlusButton";

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
  loading = false,
  topicGroupComponent,
  addonComponent,
  classes = {},
  className,
  grouping = "type",
  plusActive = false,
  plusButton = false,
  plusProps = {},
  onPlusClick
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

  const renderTopicGroup = (widget, index) => (
    <StyledListItem key={`${index}:${widget.title}`}>
      <TopicGroup
        className={classnames("widget", "topic-group", {
          [classes.widget]: classes.widget,
          [classes.topicGroup]: classes.topicGroup,
          [classes.activeWidget]:
            widget.active || widgets.indexOf(widget) === activeIndex
        })}
        as={topicGroupComponent}
        to={widget.to}
        icon_url={widget.icon_url}
        title={widget.title}
        onClick={e => filterClickHandler(e, widget)}
        active={widget.active || widgets.indexOf(widget) === activeIndex}
        type={widget.type}
        widget={widget}
      />
    </StyledListItem>
  );

  const renderAddOn = (widget, index) => (
    <StyledListItem key={`${index}:${widget.title}`}>
      <Addon
        className={classnames("widget", "add-on", {
          [classes.widget]: classes.widget,
          [classes.addOn]: classes.addOn,
          [classes.activeWidget]:
            widget.active || widgets.indexOf(widget) === activeIndex
        })}
        as={addonComponent}
        icon_url={widget.icon_url}
        href={widget.url}
        title={widget.title}
        type={widget.type}
      />
    </StyledListItem>
  );

  const renderPlus = widget => (
    <StyledListItem key={widget.title}>
      <PinkGradientInversePlusButton
        className={classnames("widget", "plus", {
          [classes.widget]: classes.widget,
          [classes.plus]: classes.plus,
          [classes.activeWidget]:
            widget.active || widgets.indexOf(widget) === activeIndex
        })}
        onClick={e => filterClickHandler(e, widget)}
      />
    </StyledListItem>
  );

  const renderWidget = (...args) => {
    const [widget] = args;

    switch (widget.type) {
      case "add_on":
        return renderAddOn(...args);

      case "topic_group":
        return renderTopicGroup(...args);

      case "plus":
        return renderPlus(...args);

      default:
        throw new Error(`Invalid widget type: ${widget.type}`);
    }
  };

  const renderGroups = (widgets = [], grouping = "") => {
    switch (grouping) {
      case "hearted":
        return [
          widgets
            .filter(widget => widget.type === "topic_group" && widget.hearted)
            .map(renderTopicGroup),
          widgets
            .filter(widget => widget.type === "add_on" && widget.hearted)
            .map(renderAddOn),
          widgets
            .filter(widget => widget.type === "topic_group" && !widget.hearted)
            .map(renderTopicGroup),
          widgets
            .filter(widget => widget.type === "add_on" && !widget.hearted)
            .map(renderAddOn)
        ].filter(group => group.length > 0);

      case "type":
        return [
          widgets
            .filter(widget => widget.type === "topic_group")
            .map(renderTopicGroup),
          widgets.filter(widget => widget.type === "add_on").map(renderAddOn)
        ].filter(group => group.length > 0);

      case "grouped":
        return widgets.reduce((groups, widget, index) => {
          if (
            index === 0 ||
            widget.dam_toolbar_grouping !==
              widgets[index - 1].dam_toolbar_grouping
          ) {
            groups.push([]);
          }
          const currentGroup = groups[groups.length - 1];
          if (widget.type === "topic_group") {
            currentGroup.push(renderWidget(widget));
          } else {
            currentGroup.push(renderTopicGroup(widget));
          }
          return groups;
        }, []);

      default:
        return [widgets.map(renderWidget)].filter(value => value.length > 0);
    }
  };

  const isGrouped = widgets.every(item => Array.isArray(item));
  const groups = isGrouped
    ? widgets.map(items => renderGroups(items))
    : renderGroups(widgets, grouping);

  return (
    <StyledWidgetsWrapper
      $direction={direction}
      className={classnames("widgets", classes.wrapper, className)}
    >
      <StyledUnorderedList $direction={direction}>
        {loading &&
          [...Array(10)].map((_, index) => (
            <WidgetPlaceholder
              key={index}
              data-testid={`widget-placeholder-${index}`}
            />
          ))}
        {groups.map((group, index, arr) => (
          <React.Fragment key={index}>
            {group}
            {index !== arr.length - 1 && <StyledHR $direction={direction} />}
            {index === arr.length - 1 && plusButton && (
              <StyledListItem
                key={`${index}-plus`}
                className="widgets-plus-wrapper"
              >
                <PinkGradientInversePlusButton
                  onClick={onPlusClick}
                  className={classnames("widgets-plus", plusProps.className)}
                  data-testid="widgets-plus"
                  $active={plusActive}
                  {...plusProps}
                />
              </StyledListItem>
            )}
          </React.Fragment>
        ))}
        {groups.length === 0 && plusButton && (
          <StyledListItem key="plus" className="widgets-plus-wrapper">
            <PinkGradientInversePlusButton
              onClick={onPlusClick}
              className={classnames("widgets-plus", plusProps.className)}
              data-testid="widgets-plus"
              $active={plusActive}
              {...plusProps}
            />
          </StyledListItem>
        )}
      </StyledUnorderedList>
    </StyledWidgetsWrapper>
  );
};

WidgetsBar.propTypes = {
  widgets: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape(WidgetProps)),
    PropTypes.arrayOf(PropTypes.array)
  ]).isRequired,
  onFilterClick: PropTypes.func,
  activeWidget: PropTypes.number,
  direction: PropTypes.oneOf(["column", "row"]),
  loading: PropTypes.bool,
  topicGroupComponent: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string
  ]),
  addonComponent: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string
  ]),
  classes: PropTypes.shape({
    wrapper: PropTypes.string,
    widget: PropTypes.string,
    activeWidget: PropTypes.string,
    topicGroup: PropTypes.string,
    addOn: PropTypes.string
  }),
  className: PropTypes.string,
  grouping: PropTypes.oneOf(["none", "type", "hearted", "grouped"]),
  plusActive: PropTypes.bool,
  plusButton: PropTypes.bool,
  plusProps: PropTypes.object,
  onPlusClick: PropTypes.func
};

WidgetsBar.defaultProps = {
  classes: {
    activeWidget: "widget--active"
  }
};

export default WidgetsBar;
