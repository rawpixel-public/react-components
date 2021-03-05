import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { Button, Label } from "./Widget";
import MaskImage from "../../atoms/MaskImage";

const Widget = ({
  as,
  to,
  title,
  icon_url,
  onClick,
  active = false,
  href,
  widget = { tag: null, dam_team_tag: null, field_flag_count: null },
  className,
  ...props
}) => (
  <Button
    as={as}
    onClick={onClick}
    $active={active}
    to={to}
    href={href}
    data-website-tag={widget.tag}
    data-dam-tag={widget.dam_team_tag}
    data-fav-count={widget.field_flag_count}
    className={classnames("widget", widget.type, widget.tag, className)}
    {...props}
  >
    <MaskImage
      className={classnames("widget-icon", { active })}
      $src={icon_url}
      $active={active}
    />
    {title && (
      <Label
        className={classnames("widget-label", { active })}
        $active={active}
      >
        {title}
      </Label>
    )}
  </Button>
);

Widget.propTypes = {
  as: PropTypes.any,
  to: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon_url: PropTypes.string.isRequired,
  href: PropTypes.string,
  type: PropTypes.oneOf(["topic_group", "add_on"]).isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  widget: PropTypes.shape({}),
  className: PropTypes.string
};

export default Widget;
