import React from "react";
import PropTypes from "prop-types";

import Icon from "../../atoms/Icon";
import { StyledTopicButton, StyledTitle } from "./StyledTopic";

const Topic = ({
  icon,
  name,
  isTagMode = false,
  isLoading = false,
  isTagged = false,
  onTopicClick,
  to,
  topic,
  ...props
}) => {
  const handleTopicClick = e => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, topic);
    }
  };

  return (
    <StyledTopicButton
      onClick={handleTopicClick}
      disabled={isLoading && "disabled"}
      isTagMode={isTagMode ? true : undefined}
      isTagged={isTagged ? true : undefined}
      isLoading={isLoading ? true : undefined}
      to={to}
      {...props}
      icon={icon}
      title={name}
    >
      <Icon loading={isLoading} icon={icon} className="img-wrapper" />
      <StyledTitle>{name}</StyledTitle>
    </StyledTopicButton>
  );
};

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isTagMode: PropTypes.bool,
  isLoading: PropTypes.bool,
  isTagged: PropTypes.bool,
  onTopicClick: PropTypes.func,
  topic: PropTypes.shape({
    name: PropTypes.string,
    tag: PropTypes.string,
    dam_tam_tag: PropTypes.string
  }),
  to: PropTypes.string
};

export default Topic;
