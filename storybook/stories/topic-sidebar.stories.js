import React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import {
  WidgetsBar,
  TopicsGrid,
  Categories
} from "@rawpixel-public/react-components";
import { widgets, topics, categories } from "./topic-sidebar.data";

const StyledSidebar = styled.div`
  background: ${props => (props.isDAM ? "#FFF" : "#F4F4F4")};
  display: flex;
  flex-direction: row;
  width: 280px;
`;

const ExampleSidebar = ({ isDAM }) => {
  const [topicData, setTopicData] = React.useState(topics);
  const [title, setTitle] = React.useState(widgets[0].title);
  const [activeFilter, setActiveFilter] = React.useState(0);

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
    <StyledSidebar isDAM={isDAM}>
      <div>
        <Categories
          title={title}
          categories={categories}
          onCategoryClick={action("category-click")}
        />
        <TopicsGrid
          topics={topicData}
          onTopicClick={handleTopicClick}
          isDAM={isDAM}
        />
      </div>
      <div>
        <WidgetsBar
          widgets={widgets}
          onFilterClick={handleFilterClick}
          activeWidget={activeFilter}
        />
      </div>
    </StyledSidebar>
  );
};

export const dam = () => {
  return <ExampleSidebar isDAM />;
};

export const website = () => {
  return <ExampleSidebar isDAM={false} />;
};

export default {
  title: "Topics/Sidebar",
  includeStories: [],
  decorators: [withKnobs]
};
