import React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import {
  Button,
  Heading,
  HorizontalRule,
  ImageButton,
  ImageButtonGrid,
  SizeButton,
  WidgetsBar,
  TopicsGrid,
  Categories,
  FilterButtonGroup,
  FilterButtonGroupMain,
  FilterButtonGroupPlaceholder,
  useTopicWidgets,
  useTopicWidgetSettings
} from "@rawpixel-public/react-components";

import { topics } from "./topic-sidebar.data";
import SidebarButtonList from "../components/SidebarButtonList";

const StyledSidebar = styled.div`
  background: ${props => (props.isDAM ? "#FFF" : "#F4F4F4")};
  border-radius: 0.25em;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  width: 300px;
`;

const ExampleSidebar = ({ isTeam, isWebsiteCatalog }) => {
  const target = isTeam ? "team" : "website";
  const catalog = isTeam
    ? isWebsiteCatalog
      ? "website_content"
      : "team"
    : false;
  const { loading, widgets } = useTopicWidgets(target, catalog);

  const [topicData, setTopicData] = React.useState(topics);
  const [title, setTitle] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState(0);
  const [live, setLive] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const activeWidget = widgets.length && widgets[activeFilter];
  const categories =
    activeWidget && !!activeWidget.subCategories.length
      ? [...[{ name: "All" }], ...activeWidget.subCategories]
      : [];
  const site = isTeam ? (isTeam ? "dam-team" : "dam-website") : "website";
  const {
    main,
    fileTypes,
    filters,
    secondaryFilters,
    setMain,
    setFileTypes,
    setFilters,
    setSecondaryFilters
  } = useTopicWidgetSettings(site, activeWidget);

  React.useEffect(() => {
    if (!title && widgets.length) {
      setTitle(widgets[activeFilter].title);
    }
  }, [widgets]);

  const handleFilterClick = (e, filter) => {
    setTitle(filter.title);
    setActiveFilter(widgets.indexOf(filter));
  };

  const handleTopicClick = (e, topic) => {
    const index = topicData.indexOf(topic);
    const isTagged = !topic.isTagged;
    const loadingTopic = {
      ...topic,
      isLoading: true,
      isTagged
    };
    const updatedTopics = [...topicData];
    updatedTopics[index] = loadingTopic;
    setTopicData(updatedTopics);

    setTimeout(() => {
      const loadedTopic = {
        ...topic,
        isLoading: false,
        isTagged: !topicData[index].isTagged
      };
      const updatedTopics = [...topicData];
      updatedTopics[index] = loadedTopic;
      setTopicData(updatedTopics);
    }, 1500);
  };

  const handleFilterGroupButtonClick = (
    e,
    filter,
    filterGroup,
    setFilterGroup
  ) => {
    filter.active = !filter.active;
    const index = filterGroup.indexOf(filter);
    const updatedFilters = [...filterGroup];
    filterGroup[index] = filter;
    setFilterGroup(updatedFilters, filter);
  };

  return (
    <StyledSidebar isDAM={isTeam}>
      <div>
        {isTeam && (
          <>
            <SidebarButtonList>
              <Button>Details</Button>
              <Button active>Topics</Button>
            </SidebarButtonList>
            <SidebarButtonList itemsPerRow={3}>
              <Button size="small">Boards</Button>
              <Button size="small">Tag</Button>
              <Button size="small" active>
                Scores
              </Button>
            </SidebarButtonList>
            <SidebarButtonList>
              <Button>leaves</Button>
              <div
                style={{ textAlign: "center", padding: "5px 0", color: "#bbb" }}
              >
                {700 + score} ({score})
              </div>
            </SidebarButtonList>
            <SidebarButtonList>
              <Button onClick={() => setScore(score + 50)}>+50</Button>
              <Button onClick={() => setScore(score - 50)}>-50</Button>
            </SidebarButtonList>
            <HorizontalRule style={{ width: "200px" }} />
          </>
        )}
        <Categories
          title={title}
          categories={categories}
          onCategoryClick={action("category-click")}
          showClear={!isTeam}
          loading={loading}
        />
        <TopicsGrid
          topics={topicData}
          onTopicClick={handleTopicClick}
          isDAM={isTeam}
          loading={loading}
          viewable={isTeam ? 12 : 9}
          defaultHeight={isTeam ? 320 : 270}
        />
        {isTeam && (
          <>
            <HorizontalRule style={{ width: "200px" }} />
            <SidebarButtonList>
              <Button active={live} onClick={() => setLive(!live)}>
                Live
              </Button>
              <Button active={!live} onClick={() => setLive(!live)}>
                Unpublished
              </Button>
            </SidebarButtonList>
          </>
        )}
        <HorizontalRule style={{ width: "200px" }} />
        {loading && (
          <>
            <FilterButtonGroupPlaceholder />
            <HorizontalRule style={{ width: "200px" }} />
          </>
        )}
        {main && !!main.filter(i => i.published).length && (
          <>
            <FilterButtonGroupMain
              filters={main}
              onFilterClick={(e, filter) =>
                handleFilterGroupButtonClick(e, filter, main, setMain)
              }
            />
            <HorizontalRule style={{ width: "200px" }} />
          </>
        )}
        {loading && (
          <>
            <FilterButtonGroupPlaceholder hasTitle numberOfItems={5} />
            <HorizontalRule style={{ width: "200px" }} />
          </>
        )}
        {fileTypes && !!fileTypes.filter(i => i.published).length && (
          <>
            <FilterButtonGroup
              title="File types"
              filters={fileTypes}
              onFilterClick={(e, filter) =>
                handleFilterGroupButtonClick(e, filter, fileTypes, setFileTypes)
              }
            />
            <HorizontalRule style={{ width: "200px" }} />
          </>
        )}
        {loading && (
          <>
            <FilterButtonGroupPlaceholder numberOfItems={5} />
            <HorizontalRule style={{ width: "200px" }} />
          </>
        )}
        {filters && !!filters.filter(i => i.published).length && (
          <>
            <FilterButtonGroup
              filters={filters}
              onFilterClick={(e, filter) =>
                handleFilterGroupButtonClick(e, filter, filters, setFilters)
              }
            />
            <HorizontalRule style={{ width: "200px" }} />
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
              >
                {secondaryFilters.map((filter, index) => (
                  <ImageButton
                    key={index}
                    icon={filter.icon}
                    title={filter.name}
                    onClick={(e, filter) =>
                      handleFilterGroupButtonClick(
                        e,
                        filter,
                        secondaryFilters,
                        setSecondaryFilters
                      )
                    }
                  />
                ))}
              </ImageButtonGrid>
              <HorizontalRule style={{ width: "200px" }} />
            </>
          )}
        {!isTeam && (
          <>
            <SidebarButtonList title={<Heading level={3}>Sizes</Heading>}>
              <SizeButton title="Portrait" height={40} width={30} />
              <SizeButton title="Landscape" height={30} width={40} />
              <SizeButton title="Social" height={40} width={40} />
              <SizeButton title="Banner 2:1" height={20} width={40} />
              <SizeButton title="Pinterest 2:3" height={45} width={30} />
              <SizeButton title="Landscape 16:9" height={27} width={48} />
              <SizeButton title="Story 9:16" height={48} width={27} />
              <SizeButton title="Banner 3:1" height={15} width={45} />
              <SizeButton title="Banner 5:7" height={40} width={30} />
            </SidebarButtonList>
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
