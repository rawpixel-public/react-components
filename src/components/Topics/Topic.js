import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Icon from "../../atoms/Icon";
import {
  StyledTopicButton,
  StyledTitle,
  StyledIcon,
  StyledIconWrapper,
  StyledTitleWrapper,
  Mask
} from "./StyledTopic";

const TopicIcon = ({ className, icon, name = "" }) => (
  <StyledIconWrapper
    className={classnames("img-wrapper", className)}
    data-testid={`topic-icon:${name.replace(/\W/gi, "").toLowerCase()}`}
  >
    <Mask className="mask" url={icon} />
  </StyledIconWrapper>
);

TopicIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string
};

const Topic = ({
  active,
  icon = "",
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
  const [lines, setLines] = React.useState({ hyphenated: false, multi: false });
  const TitleRef = React.useRef();

  const handleTopicClick = e => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, topic);
    }
  };

  React.useEffect(() => {
    if (!name || !("createRange" in document)) {
      return;
    }

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
      setLines({ hyphenated: true, multi: true });
    } else if (words.length === 1 && titleElement.clientHeight > LINE_HEIGHT) {
      setLines({ hyphenated: true, multi: true });
    } else {
      setLines({
        hyphenated: false,
        multi: titleElement.clientHeight > LINE_HEIGHT
      });
    }
  }, [groupIcon, name]);

  return (
    <StyledTopicButton
      active={active ? true : undefined}
      onClick={handleTopicClick}
      disabled={isLoading && "disabled"}
      isTagMode={isTagMode ? true : undefined}
      isTagged={isTagged ? true : undefined}
      isLoading={isLoading ? true : undefined}
      to={to}
      icon={icon}
      {...props}
    >
      {isLoading ? (
        <Icon loading={isLoading} icon={icon} className="img-wrapper" />
      ) : (
        <TopicIcon icon={icon} name={name} />
      )}
      <StyledTitleWrapper>
        {groupIcon && <StyledIcon icon={groupIcon} />}
        <StyledTitle
          className={classnames("topic-title", { active })}
          ref={TitleRef}
          isHyphenated={lines.hyphenated}
          isMulti={lines.multi}
          hasIcon={groupIcon}
        >
          {name}
        </StyledTitle>
      </StyledTitleWrapper>
    </StyledTopicButton>
  );
};

Topic.propTypes = {
  id: PropTypes.any.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  isTagMode: PropTypes.bool,
  isLoading: PropTypes.bool,
  isTagged: PropTypes.bool,
  onTopicClick: PropTypes.func,
  topic: PropTypes.shape({
    name: PropTypes.string,
    tag: PropTypes.string,
    dam_team_tag: PropTypes.string
  }),
  to: PropTypes.string,
  groupIcon: PropTypes.string,
  active: PropTypes.bool
};

export default Topic;
