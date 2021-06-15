import React from "react";
import PropTypes from "prop-types";
import ImageButtonGrid from "../../atoms/ImageButtonGrid";
import Topic from "./Topic";

const TopicsGrid = ({
  className,
  topics,
  onTopicClick,
  isTagMode = false,
  viewable = 12,
  defaultHeight = 320,
  defaultWidth = 210,
  style,
  activeTopics = [],
  header,
  footer
}) => {
  const gridRef = React.useRef();

  const handleTopicClick = (e, topic) => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, topic);
    }
  };

  const handleHyphenation = (el, { hyphenated }) => {
    if (hyphenated) {
      gridRef.current.recalculateHeight();
    }
  };

  return (
    <ImageButtonGrid
      className={className}
      viewable={viewable}
      defaultHeight={defaultHeight}
      defaultWidth={defaultWidth}
      style={style}
      ref={gridRef}
      header={header}
      footer={footer}
    >
      {topics.map((topic, index) => (
        <Topic
          active={activeTopics.includes(topic)}
          icon={topic.icon_url}
          id={topic.id}
          name={topic.title_short || topic.title_filter || topic.title}
          key={`${index}:${topic.id}:${topic.tag}`}
          isTagMode={isTagMode}
          isLoading={topic.isLoading}
          isTagged={topic.isTagged}
          onTopicClick={onTopicClick ? e => handleTopicClick(e, topic) : null}
          topic={topic}
          to={topic.to}
          data-testid={topic.id}
          groupIcon={topic.groupIcon}
          onHyphenation={handleHyphenation}
        />
      ))}
    </ImageButtonGrid>
  );
};

TopicsGrid.propTypes = {
  className: PropTypes.string,
  topics: PropTypes.array,
  onTopicClick: PropTypes.func,
  isTagMode: PropTypes.bool,
  viewable: PropTypes.number,
  defaultHeight: PropTypes.number,
  defaultWidth: PropTypes.number,
  style: PropTypes.object,
  activeTopics: PropTypes.array,
  header: PropTypes.node,
  footer: PropTypes.node
};

export default TopicsGrid;
