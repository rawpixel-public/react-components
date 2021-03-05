import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Button from "../../atoms/Button";
import ExpandButton from "./ExpandButton";
import Wrapper from "./Wrapper";

const SubTopics = ({
  subtopics = [],
  selected = [],
  displayed = 6,
  expandable = true,
  onClick,
  ...props
}) => {
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => setExpanded(false), [subtopics, expandable]);

  const handleClick = val => e => onClick(e, val);

  const canExpand = expandable && subtopics.length > displayed;

  if (subtopics.length === 0) {
    return null;
  }

  return (
    <Wrapper {...props}>
      <ul>
        {subtopics
          .slice(0, expanded ? subtopics.length : displayed)
          .map((value, index) => (
            <li key={`${index}:${value.name}`}>
              <Button
                className={classnames({ active: selected.includes(value) })}
                active={selected.includes(value)}
                size="xsmall"
                onClick={onClick && handleClick(value)}
              >
                {value.name}
              </Button>
            </li>
          ))}
        {canExpand && !expanded && (
          <li className="expand">
            <ExpandButton onClick={() => setExpanded(true)}>
              Show more
            </ExpandButton>
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

SubTopics.propTypes = {
  displayed: PropTypes.number.isRequired,
  subtopics: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  selected: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  expandable: PropTypes.bool,
  onClick: PropTypes.func
};

export default SubTopics;
