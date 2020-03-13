import React from "react";
import PropTypes from "prop-types";
import ImageButtonGrid from "../../atoms/ImageButtonGrid";
import LoadingPlaceholder from "../../atoms/LoadingPlaceholder";
import Topic from "./Topic";

const TopicsPlaceholder = ({ count = 12 }) => {
  return [...Array(count)].map((_, index) => (
    <div
      style={{ display: "flex", flexDirection: "column", margin: "5px 0" }}
      data-testid={`topics-placeholder-${index}`}
      key={index}
    >
      <LoadingPlaceholder
        width="60px"
        height="50px"
        style={{ marginBottom: "5px" }}
      />
      <LoadingPlaceholder width="60px" height="20px" borderRadius="none" />
    </div>
  ));
};

TopicsPlaceholder.propTypes = {
  count: PropTypes.number
};

const TopicsGrid = ({
  topics,
  onTopicClick,
  isTagMode = false,
  loading = false,
  viewable = 12,
  defaultHeight = 320
}) => {
  const handleTopicClick = (e, topic) => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, topic);
    }
  };

  return (
    <ImageButtonGrid viewable={viewable} defaultHeight={defaultHeight}>
      {loading && <TopicsPlaceholder count={viewable} />}
      {!loading &&
        topics.map(topic => (
          <Topic
            icon={topic.icon}
            id={topic.id}
            name={topic.name}
            key={topic.id}
            isTagMode={isTagMode}
            isLoading={topic.isLoading}
            isTagged={topic.isTagged}
            onTopicClick={onTopicClick ? e => handleTopicClick(e, topic) : null}
            topic={topic}
            to={topic.to}
            data-testid={topic.id}
          />
        ))}
    </ImageButtonGrid>
  );
};

TopicsGrid.propTypes = {
  topics: PropTypes.array,
  onTopicClick: PropTypes.func,
  isTagMode: PropTypes.bool,
  loading: PropTypes.bool,
  viewable: PropTypes.number,
  defaultHeight: PropTypes.number
};

export default TopicsGrid;
