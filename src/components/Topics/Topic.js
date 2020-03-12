import React from "react";
import PropTypes from "prop-types";

import { StyledTopicButton } from "./StyledTopic";

const Topic = ({
  id,
  icon,
  title,
  isTagMode = false,
  isLoading = false,
  isTagged = false,
  onTopicClick,
  to,
  ...props
}) => {
  const handleTopicClick = e => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, { id });
    }
  };

  return (
    <StyledTopicButton
      onClick={handleTopicClick}
      disabled={isLoading && "disabled"}
      isTagMode={isTagMode ? true : undefined}
      isTagged={isTagged ? true : undefined}
      isLoading={isLoading ? true : undefined}
      title={title}
      icon={icon}
      to={to}
      {...props}
    />
  );
};

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isTagMode: PropTypes.bool,
  isLoading: PropTypes.bool,
  isTagged: PropTypes.bool,
  onTopicClick: PropTypes.func,
  to: PropTypes.string
};

export default Topic;
