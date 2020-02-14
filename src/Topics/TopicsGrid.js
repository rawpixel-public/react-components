import React from "react";
import PropTypes from "prop-types";

import { StyledTopicsGrid } from "./StyledTopicsGrid";
import Topic from "./Topic";

const TopicsGrid = ({ topics, onTopicClick, isDAM = false }) => {
  const handleTopicClick = (e, topic) => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, topic);
    }
  };

  return (
    <StyledTopicsGrid>
      {topics.map(topic => (
        <Topic
          icon={topic.icon}
          id={topic.id}
          title={topic.title}
          key={topic.id}
          isDAM={isDAM}
          isLoading={topic.isLoading}
          topic={topic.isTagged}
          onTopicClick={e => handleTopicClick(e, topic)}
        />
      ))}
    </StyledTopicsGrid>
  );
};

TopicsGrid.propTypes = {
  topics: PropTypes.array,
  onTopicClick: PropTypes.func,
  isDAM: PropTypes.bool
};

export default TopicsGrid;
