import React from "react";
import PropTypes from "prop-types";

import Icon from "../../atoms/Icon";
import { StyledTopicButton, StyledTitle, StyledIcon } from "./StyledTopic";

const Topic = ({
  icon,
  name,
  isTagMode = false,
  isLoading = false,
  isTagged = false,
  onTopicClick,
  to,
  topic,
  groupIcon,
  ...props
}) => {
  const [isHyphenated, setIsHyphenated] = React.useState(false);
  const TitleRef = React.useRef();

  const handleTopicClick = e => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, topic);
    }
  };

  React.useEffect(() => {
    const LINE_HEIGHT = 15;
    const titleElement = TitleRef.current;
    const textNode = Array.from(titleElement.childNodes).find(
      e => e.nodeName === "#text"
    );
    const text = name;

    // Check if any words' bounding rect spans more than one line.
    const words = text.split(" ");
    const wordSpansLine = !!words
      .map(word => {
        const range = document.createRange();
        const start = text.indexOf(word);
        const end = start + word.length;
        range.setStart(textNode, start);
        range.setEnd(textNode, end);
        return range.getBoundingClientRect().height > LINE_HEIGHT;
      })
      .filter(Boolean).length;

    // Apply hyphenated css if a word spans across lines.
    if (wordSpansLine) {
      setIsHyphenated(true);
    } else if (words.length === 1 && titleElement.clientHeight > LINE_HEIGHT) {
      setIsHyphenated(true);
    } else {
      setIsHyphenated(false);
    }
  }, [groupIcon, name]);

  return (
    <StyledTopicButton
      onClick={handleTopicClick}
      disabled={isLoading && "disabled"}
      isTagMode={isTagMode ? true : undefined}
      isTagged={isTagged ? true : undefined}
      isLoading={isLoading ? true : undefined}
      to={to}
      icon={icon}
      title={name}
      {...props}
    >
      <Icon loading={isLoading} icon={icon} className="img-wrapper" />
      <StyledTitle ref={TitleRef} isHyphenated={isHyphenated}>
        {groupIcon && <StyledIcon icon={groupIcon} />}
        {name}
      </StyledTitle>
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
  to: PropTypes.string,
  groupIcon: PropTypes.string
};

export default Topic;
