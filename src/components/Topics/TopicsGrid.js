import React from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";

import { StyledTopicsGrid } from "./StyledTopicsGrid";
import Topic from "./Topic";

// 3 rows of topics' height.
const defaultHeight = 240;

const TopicsGrid = ({ topics, onTopicClick, isDAM = false }) => {
  const [height, setHeight] = React.useState(defaultHeight);
  const topicsGridRef = React.useRef();

  const handleTopicClick = (e, topic) => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, topic);
    }
  };

  React.useEffect(() => {
    const element = topicsGridRef.current;
    const offsetHeight = element.offsetHeight;

    // Set container to exact height to hide scrollbar tracks.
    if (topics.length <= 9) {
      setHeight(offsetHeight);
    }
  }, [topics]);

  return (
    <Scrollbars style={{ height, width: 225 }} hideTracksWhenNotNeeded>
      <StyledTopicsGrid ref={topicsGridRef}>
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
      </StyledTopicsGrid>
    </Scrollbars>
  );
};

TopicsGrid.propTypes = {
  topics: PropTypes.array,
  onTopicClick: PropTypes.func,
  isDAM: PropTypes.bool
};

export default TopicsGrid;
