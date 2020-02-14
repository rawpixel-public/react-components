import React from "react";
import PropTypes from "prop-types";

import {
  StyledTopicButton,
  StyledImgWrapper,
  StyledTopicTitle
} from "./StyledTopic";

import DotLoader from "../Loader/DotLoader";

const Topic = ({
  id,
  icon,
  title,
  isDAM = false,
  isLoading = false,
  isTagged = false,
  onTopicClick
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
      isDAM={isDAM}
      isTagged={isTagged}
      isLoading={isLoading}
    >
      <StyledImgWrapper className="img-wrapper">
        {isLoading && (
          <DotLoader className="loader" loaderWidth={60} dotSize={10} />
        )}
        <svg>
          <image xlinkHref={icon} />
        </svg>
      </StyledImgWrapper>

      <StyledTopicTitle>{title}</StyledTopicTitle>
    </StyledTopicButton>
  );
};

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isDAM: PropTypes.bool,
  isLoading: PropTypes.bool,
  isTagged: PropTypes.bool,
  onTopicClick: PropTypes.func
};

export default Topic;
