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

const Sidebar = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  width: 280px;
`;

export const dam = () => {
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
    <Sidebar>
      <div>
        <Categories
          title={title}
          categories={categories}
          onCategoryClick={action("category-click")}
        />
        <TopicsGrid topics={topicData} onTopicClick={handleTopicClick} isDAM />
      </div>
      <div>
        <WidgetsBar
          widgets={widgets}
          onFilterClick={handleFilterClick}
          activeWidget={activeFilter}
        />
      </div>
    </Sidebar>
  );
};

export const website = () => {};

export default {
  title: "Topics/Sidebar",
  includeStories: [],
  decorators: [withKnobs]
};
