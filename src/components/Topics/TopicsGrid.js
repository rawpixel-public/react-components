import React from "react";
import PropTypes from "prop-types";
import ImageButtonGrid from "../../atoms/ImageButtonGrid";

import Topic from "./Topic";

const TopicsGrid = ({ topics, onTopicClick, isDAM = false }) => {
  const handleTopicClick = (e, topic) => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, topic);
    }
  };

  return (
    <ImageButtonGrid>
      {topics.map(topic => (
        <Topic
          icon={topic.icon}
          id={topic.id}
          title={topic.title}
          key={topic.id}
          isDAM={isDAM}
          isLoading={topic.isLoading}
          isTagged={topic.isTagged}
          onTopicClick={e => handleTopicClick(e, topic)}
        />
      ))}
    </ImageButtonGrid>
  );
};

TopicsGrid.propTypes = {
  topics: PropTypes.array,
  onTopicClick: PropTypes.func,
  isDAM: PropTypes.bool
};

export default TopicsGrid;
