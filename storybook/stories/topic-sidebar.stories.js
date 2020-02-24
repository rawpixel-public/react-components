import React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import {
  Button,
  Heading,
  HorizontalRule,
  LoadingPlaceholder,
  SizeButton,
  WidgetsBar,
  TopicsGrid,
  Categories,
  FilterButtonGroup
} from "@rawpixel-public/react-components";

import { topics } from "./topic-sidebar.data";
import SidebarButtonList from "../components/SidebarButtonList";
import useTopicWidgets from "../hooks/useTopicWidgets";

const StyledSidebar = styled.div`
  background: ${props => (props.isDAM ? "#FFF" : "#F4F4F4")};
  border-radius: 0.25em;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  width: 300px;
`;

const getFilterGroups = (site, widget) => {
  const { websiteFilters = {}, damFilters = {} } = widget;
  const { main, fileTypes, filters: filtersWebsite } = websiteFilters;
  const { team = {}, website = {} } = damFilters;
  const { filters: filtersDamWeb } = website;
  const { filters: filtersDamTeam, secondaryFilters } = team;

  const getFiltersBySite = site => {
    switch (site) {
      case "dam-website":
        return filtersDamWeb;
      case "dam-team":
        return filtersDamTeam;
      case "website":
        return filtersWebsite;
    }
  };

  return {
    main,
    fileTypes,
    filters: getFiltersBySite(site),
    ...(site === "dam-team" && { secondaryFilters })
  };
};

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
  const categories = activeWidget &&
    activeWidget.subCategories.length && [
      ...[{ name: "All" }],
      ...activeWidget.subCategories
    ];
  const site = isTeam ? (isTeam ? "dam-team" : "dam-website") : "website";
  const { main, fileTypes, filters, secondaryFilters } = getFilterGroups(
    site,
    activeWidget
  );

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
          title={
            loading ? (
              <LoadingPlaceholder
                width="100px"
                height="19px"
                borderRadius="none"
              />
            ) : (
              title
            )
          }
          categories={categories}
          onCategoryClick={action("category-click")}
          showClear={!isTeam}
        />
        <TopicsGrid
          topics={topicData}
          onTopicClick={handleTopicClick}
          isDAM={isTeam}
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
        {main && !!main.filter(i => i.published).length && (
          <>
            <FilterButtonGroup
              filters={main}
              onFilterClick={action("main-filter-click")}
            />
            <HorizontalRule style={{ width: "200px" }} />
          </>
        )}
        {fileTypes && !!fileTypes.filter(i => i.published).length && (
          <>
            <FilterButtonGroup
              title="File types"
              filters={fileTypes}
              onFilterClick={action("filetypes-filter-click")}
            />
            <HorizontalRule style={{ width: "200px" }} />
          </>
        )}
        {filters && !!filters.filter(i => i.published).length && (
          <>
            <FilterButtonGroup
              filters={filters}
              onFilterClick={action("filters-filter-click")}
            />
            <HorizontalRule style={{ width: "200px" }} />
          </>
        )}
        {isTeam &&
          secondaryFilters &&
          !!secondaryFilters.filter(i => i.published).length && (
            <>
              <FilterButtonGroup
                filters={secondaryFilters}
                onFilterClick={action("secondary-filters-filter-click")}
              />
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
