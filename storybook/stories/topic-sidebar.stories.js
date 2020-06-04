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
  useTopicWidgetCategories,
  useTopicWidgetsApi,
  useTopicWidgetSettings
} from "@rawpixel-public/react-components";

import useTopicWidgetSettingsActiveState from "../hooks/useTopicWidgetSettingsActiveState";
import { Link } from "react-router";

const StyledSidebar = styled.div`
  background: ${props => (props.isDAM ? "#FFF" : "#F9F9F9")};
  border-radius: 0.25em;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  width: 300px;

  .content {
    width: 210px;
    margin-left: 10px;
  }

  .size-button-group ul {
    align-items: flex-start;
  }
`;

const SidebarHorizontalRule = () => (
  <HorizontalRule
    style={{ width: "210px", marginTop: "5px", marginBottom: "15px" }}
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
  const activeWidget = !!widgets.length && widgets[activeFilter];
  const { categories, setActiveCategory } = useTopicWidgetCategories(
    activeWidget
  );
  const { topics, loading: topics_loading } = useTopicsApi({
    widget: activeWidget ? activeWidget.id : null
  });
  const site = isTeam
    ? isWebsiteCatalog
      ? "dam-website"
      : "dam-team"
    : "website";

  const { main, fileTypes, filters, secondaryFilters } = useTopicWidgetSettings(
    site,
    activeWidget
  );

  const {
    activeFilters,
    setActiveFilters,
    isFilterActiveMapper,
    resetActiveFilters
  } = useTopicWidgetSettingsActiveState();

  const handleFilterClick = (e, filter) => {
    setActiveFilter(widgets.indexOf(filter));
  };

  const handleFilterGroupButtonClick = (e, filter) => setActiveFilters(filter);

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
          onCategoryClick={(e, category) => setActiveCategory(category)}
          showClear={!isTeam && activeFilters.length > 0}
          onClearClick={() => resetActiveFilters()}
          loading={loading}
        />
        <TopicsGrid
          topics={topics}
          onTopicClick={action("topic clicked")}
          isTagMode={isTeam && tagMode}
          loading={topics_loading}
          viewable={12}
          defaultHeight={330}
          defaultWidth={225}
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
        {loading && (
          <>
            <ButtonGroupPlaceholder />
            <SidebarHorizontalRule />
          </>
        )}
        {main && !!main.filter(i => i.published).length && (
          <>
            <FilterButtonGroupMain
              filters={main.map(isFilterActiveMapper)}
              onFilterClick={handleFilterGroupButtonClick}
            />
            <SidebarHorizontalRule />
          </>
        )}
        {loading && (
          <>
            <ButtonGroupPlaceholder hasTitle numberOfItems={5} />
            <SidebarHorizontalRule />
          </>
        )}
        {fileTypes && !!fileTypes.filter(i => i.published).length && (
          <>
            <FilterButtonGroup
              title="File types"
              filters={fileTypes.map(isFilterActiveMapper)}
              onFilterClick={handleFilterGroupButtonClick}
            />
            <SidebarHorizontalRule />
          </>
        )}
        {loading && (
          <>
            <ButtonGroupPlaceholder numberOfItems={5} />
            <SidebarHorizontalRule />
          </>
        )}
        {filters && !!filters.filter(i => i.published).length && (
          <>
            <FilterButtonGroup
              filters={filters.map(isFilterActiveMapper)}
              onFilterClick={handleFilterGroupButtonClick}
            />
            <SidebarHorizontalRule />
          </>
        )}
        {isTeam &&
          secondaryFilters &&
          !!secondaryFilters.filter(i => i.published).length && (
            <>
              <ImageButtonGrid
                viewable={
                  secondaryFilters.length < 9 ? secondaryFilters.length : 9
                }
                defaultWidth={225}
              >
                {secondaryFilters
                  .map(isFilterActiveMapper)
                  .map((filter, index) => (
                    <ImageButton
                      key={index}
                      icon={filter.icon_url}
                      title={filter.name}
                      onClick={e => handleFilterGroupButtonClick(e, filter)}
                      active={filter.active}
                    />
                  ))}
              </ImageButtonGrid>
              <SidebarHorizontalRule />
            </>
          )}
        {!isTeam && (
          <>
            <ButtonGroupList title="Sizes" className="size-button-group">
              <SizeButton title="Portrait" height={40} width={30} />
              <SizeButton title="Landscape" height={30} width={40} />
              <SizeButton title="Social" height={40} width={40} />
              <SizeButton title="Banner 2:1" height={20} width={40} />
              <SizeButton title="Pinterest 2:3" height={45} width={30} />
              <SizeButton title="Landscape 16:9" height={27} width={48} />
              <SizeButton title="Story 9:16" height={48} width={27} />
              <SizeButton title="Banner 3:1" height={15} width={45} />
              <SizeButton title="Banner 5:7" height={40} width={30} />
            </ButtonGroupList>
          </>
        )}
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
