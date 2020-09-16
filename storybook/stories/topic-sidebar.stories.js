import React from "react";
import styled from "styled-components";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import {
  Button,
  LikesButton,
  ExclusiveButton,
  HorizontalRule,
  ImageButton,
  ImageButtonGrid,
  SizeButton,
  WidgetsBar,
  TopicsGrid,
  ButtonGroupList,
  Categories,
  ButtonGroupPlaceholder,
  useTopicsApi,
  useTopicWidgetsApi
} from "@rawpixel-public/react-components";

import useTopicWidgetSettingsActiveState from "../hooks/useTopicWidgetSettingsActiveState";
import { Link } from "react-router";

const StyledSidebar = styled.div`
  background: ${props => (props.isDAM ? "#FFF" : "#F9F9F9")};
  border-radius: 0.25em;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  width: 290px;

  .content {
    width: 200px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .size-button-group ul {
    align-items: flex-start;
  }
`;

const SidebarHorizontalRule = () => (
  <HorizontalRule
    style={{ width: "190px", marginTop: "5px", marginBottom: "15px" }}
  />
);

const FilterButtonGroup = ({ title, filters, onFilterClick }) => (
  <ButtonGroupList title={title}>
    {filters.map(filter => (
      <Button
        as={filter.to ? Link : filter.href ? "a" : "button"}
        active={filter.active}
        disabled={filter.disabled}
        onClick={e => onFilterClick && onFilterClick(e, filter)}
        to={filter.to}
      >
        {filter.name}
      </Button>
    ))}
  </ButtonGroupList>
);

const ButtonComponents = {
  $exclusive: ExclusiveButton,
  $likes: LikesButton
};

const FilterButtonGroupMain = ({
  filters = [],
  onFilterClick,
  itemsPerRow = 2
}) => {
  const published = filters.filter(filter => filter.published);
  const rowSize = published.length > 1 ? itemsPerRow : 1;

  return (
    <ButtonGroupList itemsPerRow={rowSize}>
      {published.map((filter, index) => {
        const Component = ButtonComponents[filter.tag] || Button;
        return (
          <Component
            key={index}
            as={filter.to ? Link : filter.href ? "a" : "button"}
            active={filter.active}
            disabled={filter.disabled}
            onClick={e => onFilterClick && onFilterClick(e, filter)}
            to={filter.to}
          >
            {filter.name}
          </Component>
        );
      })}
    </ButtonGroupList>
  );
};

const ExampleSidebar = ({ isTeam, isWebsiteCatalog }) => {
  const target = isTeam ? "team" : "website";
  const catalog = isTeam
    ? isWebsiteCatalog
      ? "website_content"
      : "team"
    : false;
  const { loading, widgets } = useTopicWidgetsApi({ target, catalog });

  const [activeFilter, setActiveFilter] = React.useState(0);
  const [live, setLive] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [displayScore, setDisplayScore] = React.useState(false);
  const [tagMode, setTagMode] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState();
  const activeWidget = !!widgets.length && widgets[activeFilter];
  const categories = activeWidget ? activeWidget.subCategories : [];

  const { topics, loading: topics_loading } = useTopicsApi({
    widget: activeWidget ? activeWidget.id : null
  });

  const {
    activeFilters,
    resetActiveFilters
  } = useTopicWidgetSettingsActiveState();

  const handleFilterClick = (e, filter) => {
    setActiveFilter(widgets.indexOf(filter));
  };

  return (
    <StyledSidebar isDAM={isTeam}>
      <div className="content">
        {isTeam && (
          <>
            <ButtonGroupList>
              <Button>Details</Button>
              <Button active>Topics</Button>
            </ButtonGroupList>
            {isWebsiteCatalog ? (
              <ButtonGroupList itemsPerRow={3}>
                <Button size="small">Boards</Button>
                <Button
                  active={tagMode}
                  size="small"
                  onClick={() => setTagMode(!tagMode)}
                >
                  Tag
                </Button>
                <Button
                  size="small"
                  active={displayScore}
                  onClick={() => setDisplayScore(!displayScore)}
                >
                  Scores
                </Button>
              </ButtonGroupList>
            ) : (
              <ButtonGroupList>
                <Button onClick={() => setTagMode(!tagMode)} active={tagMode}>
                  Tag
                </Button>
                <Button>Add crown</Button>
              </ButtonGroupList>
            )}
            {displayScore && (
              <>
                <ButtonGroupList>
                  <Button>leaves</Button>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "5px 0",
                      color: "#bbb"
                    }}
                  >
                    {700 + score} ({score})
                  </div>
                </ButtonGroupList>
                <ButtonGroupList>
                  <Button onClick={() => setScore(score + 50)}>+50</Button>
                  <Button onClick={() => setScore(score - 50)}>-50</Button>
                </ButtonGroupList>
              </>
            )}
            <SidebarHorizontalRule />
          </>
        )}
        <Categories
          title={activeWidget.title}
          categories={categories}
          onCategoryClick={(e, category) =>
            setActiveCategory(
              category !== activeCategory ? category : undefined
            )
          }
          showClear={!isTeam && activeFilters.length > 0}
          onClearClick={() => {
            setActiveCategory(undefined);
            resetActiveFilters();
          }}
          activeCategory={activeCategory}
          loading={loading}
        />
        <TopicsGrid
          topics={topics}
          onTopicClick={action("topic clicked")}
          isTagMode={isTeam && tagMode}
          loading={topics_loading}
          viewable={12}
          defaultHeight={330}
          defaultWidth={205}
        />
        {isTeam && (
          <>
            <SidebarHorizontalRule />
            <ButtonGroupList>
              <Button active={live} onClick={() => setLive(!live)}>
                Live
              </Button>
              <Button active={!live} onClick={() => setLive(!live)}>
                Unpublished
              </Button>
            </ButtonGroupList>
          </>
        )}
        <SidebarHorizontalRule />
      </div>

      <div>
        <WidgetsBar
          widgets={widgets}
          onFilterClick={handleFilterClick}
          activeWidget={activeFilter}
          loading={loading}
        />
      </div>
    </StyledSidebar>
  );
};

export const team = () => {
  return <ExampleSidebar isTeam />;
};

export const website = () => {
  return <ExampleSidebar isTeam={false} />;
};

export const teamWebsite = () => {
  return <ExampleSidebar isTeam isWebsiteCatalog />;
};

export default {
  title: "Topics/Sidebar",
  includeStories: [],
  decorators: [withKnobs]
};
