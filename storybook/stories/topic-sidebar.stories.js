import React from "react";
import styled from "styled-components";
import { withKnobs } from "@storybook/addon-knobs";
import {
  Button,
  ExclusiveButton,
  LikesButton,
  LogoButton,
  Heading,
  HorizontalRule,
  WidgetsBar,
  SubTopics,
  TopicsGrid,
  ButtonGroupList,
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
  padding: 0;
  width: 290px;

  .content {
    width: 200px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .size-button-group ul {
    align-items: flex-start;
  }

  .side {
    background: #ebebeb;
  }
`;

const SidebarHorizontalRule = () => (
  <HorizontalRule
    style={{ width: "190px", marginTop: "5px", marginBottom: "15px" }}
  />
);

const ButtonComponents = {
  $exclusive: ExclusiveButton,
  $likes: LikesButton,
  $rawpixelcc0: LogoButton
};

const FilterButtonGroup = ({ title, filters, onFilterClick, tags = [] }) => (
  <ButtonGroupList title={title} alignSelf="center">
    {filters
      .filter(f => f.published)
      .map((filter, index) => {
        const Component = ButtonComponents[filter.tag] || Button;
        return (
          <Component
            key={`${index}:${filter.name}`}
            as={filter.to ? Link : filter.href ? "a" : "button"}
            active={tags.includes(filter.tag)}
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

const TopicsFooter = () => (
  <div
    style={{ padding: "5px 0 0 0", display: "flex", justifyContent: "center" }}
  >
    <Button
      as="a"
      size="small"
      style={{ width: "120px" }}
      href="https://www.rawpixel.com/themes/topics"
    >
      All topics
    </Button>
  </div>
);

const ExampleSidebar = ({ isTeam, isWebsiteCatalog }) => {
  const target = isTeam ? "team" : "website";
  const catalog = isTeam
    ? isWebsiteCatalog
      ? "website_content"
      : "team"
    : false;
  const { loading, widgets } = useTopicWidgetsApi(
    { target, catalog },
    {
      baseUrl: "http://local.rawpixel-preview.com:8084",
      includeCustom: !isTeam
    }
  );

  const [activeFilter, setActiveFilter] = React.useState(0);
  const [activeTopics, setActiveTopics] = React.useState([]);
  const [live, setLive] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [displayScore, setDisplayScore] = React.useState(false);
  const [tagMode, setTagMode] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState([]);
  const activeWidget = !!widgets.length && widgets[activeFilter];
  const categories = activeWidget ? activeWidget.subCategories : [];
  const [tags, setTags] = React.useState([]);

  const { topics, loading: topics_loading } = useTopicsApi({
    widget: activeWidget
      ? typeof activeWidget.id === "number" && activeWidget.id
      : null,
    heartFilter:
      (activeWidget && activeWidget.id === "my_filters") || !activeWidget,
    trending: activeWidget && activeWidget.id === "trending",
    entityType: activeWidget && activeWidget.id === "themes" ? "widget" : "",
    target
  });

  const {
    activeFilters,
    resetActiveFilters
  } = useTopicWidgetSettingsActiveState();

  const handleFilterClick = (e, filter) => {
    setActiveFilter(widgets.indexOf(filter));
    if (filter.type === "topic_group") {
      setActiveTopics([]);
    }
  };

  const handleTopicClick = (e, topic) => {
    if (topic.entity_type === "widget") {
      setActiveFilter(widgets.indexOf(widgets.find(w => w.id === topic.id)));
      setActiveTopics([]);
    } else if (activeTopics.includes(topic)) {
      setActiveTopics(activeTopics.filter(t => t !== topic));
    } else {
      setActiveTopics([...activeTopics, topic]);
    }
  };

  const handleFilterButtonClick = (e, { tag }) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const { websiteFilters = {}, damFilters = {} } = activeWidget || {};
  const catalogFilters = damFilters[catalog] || {};
  const filterGroups =
    target === "website"
      ? websiteFilters.filterGroups || []
      : catalogFilters.filterGroups || [];

  const sidebarWidgets = widgets.filter(w => {
    if (w.type === "add_on") {
      return false;
    }

    return true;
  });

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
        <Heading level={3}>
          {activeWidget ? activeWidget.title : "My Topics"}
        </Heading>
        <SubTopics
          displayed={5}
          selected={activeCategory}
          subtopics={categories}
          onClick={(e, category) => {
            if (activeCategory.includes(category)) {
              setActiveCategory([]);
            } else {
              setActiveCategory([category]);
            }
          }}
        />
        <TopicsGrid
          activeTopics={activeTopics}
          topics={topics}
          onTopicClick={handleTopicClick}
          isTagMode={isTeam && tagMode}
          loading={topics_loading}
          viewable={12}
          defaultHeight={330}
          defaultWidth={205}
          footer={<TopicsFooter />}
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
        {filterGroups.map((group, index) => (
          <React.Fragment key={index}>
            <FilterButtonGroup
              filters={group.filters}
              onFilterClick={handleFilterButtonClick}
              tags={tags}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="side">
        <WidgetsBar
          widgets={sidebarWidgets}
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
