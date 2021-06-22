import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Icon from "../../atoms/Icon";
import MaskImage from "../../atoms/MaskImage";
import {
  StyledTopicButton,
  StyledTitle,
  StyledIcon,
  StyledIconWrapper,
  StyledTitleWrapper
} from "./StyledTopic";
import useHyphenation from "./useHyphenation";

const TopicIcon = ({ className, icon, name = "", iconStyle }) => (
  <StyledIconWrapper
    className={classnames("img-wrapper", className)}
    data-testid={`topic-icon:${name.replace(/\W/gi, "").toLowerCase()}`}
  >
    <MaskImage
      $src={icon}
      className="mask"
      $height="30px"
      $width="30px"
      $iconStyle={iconStyle}
    />
  </StyledIconWrapper>
);

TopicIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  iconStyle: PropTypes.string
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
  topic = { tag: null, dam_team_tag: null, field_flag_count: null },
  groupIcon,
  onHyphenation,
  ...props
}) => {
  const [TitleRef, lines] = useHyphenation(
    groupIcon,
    name,
    active,
    onHyphenation
  );

  const handleTopicClick = e => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, topic);
    }
  };

  return (
    <StyledTopicButton
      $active={active}
      onClick={handleTopicClick}
      disabled={isLoading && "disabled"}
      isTagMode={isTagMode ? true : undefined}
      isTagged={isTagged ? true : undefined}
      isLoading={isLoading ? true : undefined}
      to={to}
      icon={icon}
      data-website-tag={topic.tag}
      data-dam-tag={topic.dam_team_tag}
      data-fav-count={topic.field_flag_count}
      {...props}
    >
      {isLoading ? (
        <Icon loading={isLoading} icon={icon} className="img-wrapper" />
      ) : (
        <TopicIcon icon={icon} name={name} iconStyle={props.iconStyle} />
      )}
      <StyledTitleWrapper>
        {groupIcon && <StyledIcon $url={groupIcon} />}
        <StyledTitle
          className={classnames("topic-title", { active })}
          $active={active}
          ref={TitleRef}
          $isHyphenated={lines.hyphenated}
          $isMulti={lines.multi}
          $hasIcon={groupIcon}
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
    dam_team_tag: PropTypes.string,
    field_flag_count: PropTypes.number
  }),
  to: PropTypes.string,
  groupIcon: PropTypes.string,
  active: PropTypes.bool,
  onHyphenation: PropTypes.func,
  iconStyle: PropTypes.string
};

export default Topic;
